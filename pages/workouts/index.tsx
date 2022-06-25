import { gql } from '@apollo/client'
import { PageTitle } from 'components'
import { Main } from 'components/layout'
import { Route } from 'lib'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Link from 'next/link'
import { v4 as uuid } from 'uuid'

// const ListWorkoutsQuery = gql``

type WorkoutModel = {
  id: string
  name: string
}

const Workout = ({ id, name }: WorkoutModel) => (
  <li>
    <Link
      href={{
        pathname: Route.WorkoutExercise,
        query: {
          id,
          exercise: 'id',
        },
      }}
    >
      <a className="block py-8">{name}</a>
    </Link>
  </li>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const WorkoutsPage: NextPage<Props> = ({ workouts }: Props) => {
  return (
    <Main>
      <div className="flex items-center justify-between">
        <PageTitle>Workouts</PageTitle>
        <Link href={Route.WorkoutsNew}>
          <a className="border p-2">Create New</a>
        </Link>
      </div>
      <ul className="divide-y">
        {workouts.map((w) => (
          <Workout key={w.id} {...w} />
        ))}
      </ul>
    </Main>
  )
}

export default WorkoutsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      workouts: [
        {
          id: uuid(),
          name: 'Chest & Triceps',
        },
        {
          id: uuid(),
          name: 'Back & Biceps',
        },
        {
          id: uuid(),
          name: 'Legs',
        },
        {
          id: uuid(),
          name: 'Shoulders',
        },
      ],
    },
  }
}
