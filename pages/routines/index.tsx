import { gql } from '@apollo/client'
import { MenuAlt3Icon } from '@heroicons/react/outline'
import { Header, PageTitle } from 'components'
import { Main } from 'components/layout'
import { Menu } from 'components/menu'
import { Route } from 'lib'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

type Routine = {
  id: string
  name: string
}

const RoutineItem = ({ id, name }: Routine) => (
  <li>
    <Link
      href={{
        pathname: Route.Routine,
        query: {
          routineId: id,
        },
      }}
    >
      <a className="block py-8">{name}</a>
    </Link>
  </li>
)

const MobileMenu = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <MenuAlt3Icon className="h-5 w-5" />
      </button>
    </>
  )
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const RoutinesPage: NextPage<Props> = ({ routines }: Props) => {
  return (
    <Main>
      <Header right={<Menu />}>
        <PageTitle>Routines</PageTitle>
      </Header>
      <ul className="divide-y">
        {routines.map((r) => (
          <RoutineItem key={r.id} {...r} />
        ))}
      </ul>
    </Main>
  )
}

export default RoutinesPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      routines: [
        {
          id: uuid(),
          name: 'Shortcut To Size',
        },
        {
          id: uuid(),
          name: 'Ronnie Coleman',
        },
        {
          id: uuid(),
          name: 'Big Man on Campus',
        },
      ],
    },
  }
}
