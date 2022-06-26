import { randomUUID } from 'crypto'
import { v4 as uuid } from 'uuid'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { Main, PageTitle } from 'components'
import Link from 'next/link'
import { Route } from 'lib'

type Exercise = {
  routineId: string
  workoutId: string
  id: string
  name: string
}

const ExerciseItem = ({ routineId, workoutId, id, name }: Exercise) => (
  <li>
    <Link
      href={{
        pathname: Route.RoutineWorkoutExercise,
        query: {
          routineId,
          workoutId,
          exerciseId: id,
        },
      }}
    >
      <a>{name}</a>
    </Link>
  </li>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const RoutineWorkoutPage: NextPage<Props> = ({
  routine,
  workout,
  exercises,
}) => {
  return (
    <Main>
      <div className="flex items-center justify-between">
        <PageTitle>{workout.name}</PageTitle>
      </div>
      <div>{routine.name}</div>
      <div>Exercises</div>
      {
        <ul className="divide-y">
          {exercises.map((e) => (
            <ExerciseItem
              key={e.id}
              id={e.id}
              name={e.name}
              routineId={routine.id}
              workoutId={workout.id}
            />
          ))}
        </ul>
      }
    </Main>
  )
}

export default RoutineWorkoutPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const props = {
    routine: {
      id: uuid(),
      name: 'Shortcut to Size',
    },
    workout: {
      id: uuid(),
      name: 'Week 1: Chest, Triceps, Calves',
      stats: {
        duration: '30-45',
        calories: '300',
        difficulty: '4/5',
      },
    },
    exercises: [
      {
        id: uuid(),
        name: 'Bench Press',
      },
      {
        id: uuid(),
        name: 'Incline Bench Press',
      },
      {
        id: uuid(),
        name: 'Incline Dumbbell Flye',
      },
      {
        id: uuid(),
        name: 'Cable Cross Over',
      },
    ],
  }
  return {
    props,
  }
}
