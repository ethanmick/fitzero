import { gql, useMutation } from '@apollo/client'
import { FormInput, Header, Main, PageTitle } from 'components'
import { query, Route } from 'lib'
import {
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables,
  NewWorkoutPageQuery,
} from 'lib/generated'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { useRouter } from 'next/router'
import { useFieldArray, useForm } from 'react-hook-form'

const newWorkout = gql`
  query NewWorkoutPage {
    exercises {
      id
      name
    }
  }
`

const createWorkoutMutation = gql`
  mutation CreateWorkout($workout: CreateWorkoutInput!) {
    createWorkout(workout: $workout) {
      id
    }
  }
`

type FormData = {
  name: string
  exerciseIds: { id: string }[]
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const NewWorkout: NextPage<Props> = ({ exercises }) => {
  const router = useRouter()
  const { control, register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      exerciseIds: [],
    },
  })
  const { fields, append } = useFieldArray({
    control,
    name: 'exerciseIds',
  })

  const [createWorkout] = useMutation<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >(createWorkoutMutation)

  const onSubmit = async ({ name, exerciseIds }: FormData) => {
    try {
      const { data } = await createWorkout({
        variables: {
          workout: {
            name,
            exerciseIds: exerciseIds.map(({ id }) => id),
          },
        },
      })
      if (data?.createWorkout.id) {
        router.push({
          pathname: Route.Workout,
          query: {
            workoutId: data.createWorkout.id,
          },
        })
      }
    } catch (err: any) {
      console.error('Error creating workout', err)
    }
  }

  return (
    <Main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <PageTitle>New Workout</PageTitle>
        </Header>
        <FormInput {...register('name')} label="Workout Name" />
      </form>
      <ul>
        {exercises.map(({ id, name }) => (
          <li onClick={() => append({ id })} key={id}>
            {name}
          </li>
        ))}
      </ul>
    </Main>
  )
}

export default NewWorkout

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data } = await query<NewWorkoutPageQuery>(ctx, newWorkout)
  return {
    props: {
      exercises: data.exercises,
    },
  }
}
