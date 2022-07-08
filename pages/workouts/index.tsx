import { gql } from '@apollo/client'
import { Navigation } from 'components'
import { Main } from 'components/layout'
import { query, Route } from 'lib'
import { WorkoutsQuery } from 'lib/generated'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Link from 'next/link'

const workoutsQuery = gql`
  query Workouts {
    workouts {
      id
      name
    }
  }
`

const Blankslate = () => (
  <div className="bg-neutral-900">
    <h1>Workouts</h1>
    <h2>Build your workouts to make tracking them easy.</h2>
    <p></p>
    <Link href={Route.WorkoutNew}>Create Workout</Link>
  </div>
)

type WorkoutItemProps = WorkoutsQuery['workouts'][number]

const WorkoutItem = ({ id, name }: WorkoutItemProps) => (
  <li>
    <Link
      href={{
        pathname: Route.Workout,
        query: {
          workoutId: id,
        },
      }}
      className="block py-8"
    >
      {name}
    </Link>
  </li>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const WorkoutsPage: NextPage<Props> = ({ workouts }: Props) => {
  return (
    <Main>
      <Navigation>Workouts</Navigation>
      {workouts.length == 0 && <Blankslate />}
      {workouts.length > 0 && (
        <ul className="divide-y">
          {workouts.map((w) => (
            <WorkoutItem key={w.id} {...w} />
          ))}
        </ul>
      )}
    </Main>
  )
}

export default WorkoutsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data } = await query<WorkoutsQuery>(ctx, workoutsQuery)
  return {
    props: {
      workouts: data.workouts,
    },
  }
}
