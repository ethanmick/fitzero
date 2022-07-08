import { gql } from '@apollo/client'
import { Back, Header, Main, Navigation, PageTitle } from 'components'
import { query, Route } from 'lib'
import { WorkoutQuery, WorkoutQueryVariables } from 'lib/generated'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Link from 'next/link'

const workoutQuery = gql`
  query Workout($id: ID!) {
    workout(id: $id) {
      id
      name
      exercises {
        id
        name
      }
    }
  }
`

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const WorkoutPage: NextPage<Props> = ({ workout }: Props) => {
  return (
    <>
      <Navigation left={<Back href={Route.Workouts} />} />
      <Main>
        <Header>
          <PageTitle>{workout.name}</PageTitle>
        </Header>
        <div>
          {workout.exercises.map(({ id, name }) => (
            <Link
              className="block"
              href={{
                pathname: Route.WorkoutExercise,
                query: {
                  workoutId: workout.id,
                  exerciseId: id,
                },
              }}
              key={id}
            >
              {name}
            </Link>
          ))}
        </div>
      </Main>
    </>
  )
}

export default WorkoutPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.workoutId as string
  const { data } = await query<WorkoutQuery, WorkoutQueryVariables>(
    ctx,
    workoutQuery,
    {
      id: id as string,
    }
  )
  return {
    props: {
      workout: data.workout,
    },
  }
}
