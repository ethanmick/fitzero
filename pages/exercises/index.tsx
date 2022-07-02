import { PageTitle } from 'components'
import { Main } from 'components/layout'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Link from 'next/link'
import { query, Route } from 'lib'
import { Header } from 'components/header'
import { Menu } from 'components/menu'
import { ExercisesQuery } from 'lib/generated'
import { gql } from '@apollo/client'

const exercisesPageQueryDocument = gql`
  query Exercises {
    exercises {
      id
      name
    }
  }
`

type Exercise = {
  id: string
  name: string
}

const ExerciseItem = ({ id, name }: Exercise) => (
  <li>
    <Link
      href={{
        pathname: Route.Exercise,
        query: {
          exerciseId: id,
        },
      }}
    >
      <a className="block py-8">{name}</a>
    </Link>
  </li>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const ExercisesPage: NextPage<Props> = ({ exercises }: Props) => {
  return (
    <Main>
      <Header right={<Menu />}>
        <PageTitle>Exercises</PageTitle>
      </Header>
      <ul className="divide-y">
        {exercises.map((e) => (
          <ExerciseItem key={e.id} {...e} />
        ))}
      </ul>
    </Main>
  )
}

export default ExercisesPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data } = await query<ExercisesQuery>(ctx, exercisesPageQueryDocument)
  return {
    props: {
      exercises: data.exercises,
    },
  }
}
