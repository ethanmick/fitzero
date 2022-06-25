import { gql } from '@apollo/client'
import { query } from 'lib'
import { ListExercisesQuery } from 'lib/generated'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'

const ListExercises = gql`
  query ListExercises {
    exercises {
      id
      name
      logs {
        eventDate
      }
      createdAt
    }
  }
`

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const NewWorkoutPage: NextPage<Props> = ({ exercises }: Props) => {
  console.log('We did it', exercises)
  return (
    <div>
      <h1>Create Workout</h1>
      <ul>
        {exercises.map((e) => (
          <li key={e.id}>{e.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default NewWorkoutPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data } = await query<ListExercisesQuery>(ctx, ListExercises)
  return {
    props: {
      exercises: data.exercises,
    },
  }
}
