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
  try {
    const { data } = await query<ListExercisesQuery>(ctx, ListExercises)
    return {
      props: {
        exercises: data.exercises,
      },
    }
  } catch (err: any) {
    console.log(err)
  }
  return {
    props: {
      exercises: [],
    },
  }
}
