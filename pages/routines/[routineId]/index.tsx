import { Back, PageTitle } from 'components'
import { v4 as uuid } from 'uuid'
import { Main } from 'components/layout'
import { randomUUID } from 'crypto'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Link from 'next/link'
import { Route } from 'lib'
import { Header } from 'components/header'
import { Menu } from 'components/menu'

type Workout = {
  routineId: string
  id: string
  name: string
}

const WorkoutItem = ({ id, name, routineId }: Workout) => (
  <li>
    <Link
      href={{
        pathname: Route.RoutineWorkout,
        query: {
          routineId,
          workoutId: id,
        },
      }}
    >
      <a className="block py-8">{name}</a>
    </Link>
  </li>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const RoutinePage: NextPage<Props> = ({ routine }: Props) => {
  return (
    <Main>
      <Header left={<Back href={Route.Routines} />} right={<Menu />}>
        <PageTitle>{routine.name}</PageTitle>
      </Header>
      <ul className="divide-y">
        {routine.workouts.map((r) => (
          <WorkoutItem key={r.id} {...r} routineId={routine.id} />
        ))}
      </ul>
    </Main>
  )
}

export default RoutinePage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const props = {
    routine: {
      id: uuid(),
      name: 'Shortcut To Size',
      workouts: [
        {
          id: uuid(),
          name: 'Week 1: Chest, Triceps, Calves',
        },
        {
          id: uuid(),
          name: 'Week 1: Back, Biceps, Abs',
        },
        {
          id: uuid(),
          name: 'Week 1: Shoulders, Traps, Calves',
        },
        {
          id: uuid(),
          name: 'Week 1: Legs, Abs',
        },
        {
          id: uuid(),
          name: 'Week 2: Chest, Triceps, Calves',
        },
        {
          id: uuid(),
          name: 'Week 2: Back, Biceps, Abs',
        },
        {
          id: uuid(),
          name: 'Week 2: Shoulders, Traps, Calves',
        },
        {
          id: uuid(),
          name: 'Week 2: Legs, Abs',
        },
      ],
    },
  }
  return {
    props,
  }
}
