import { Back } from 'components'
import { Main } from 'components/layout'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { query, Route } from 'lib'
import { Header } from 'components/header'
import { Menu } from 'components/menu'
import {
  ExerciseQuery,
  UpdateExerciseMutation,
  UpdateExerciseMutationVariables,
} from 'lib/generated'
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import router from 'next/router'
import { useEffect, useRef } from 'react'

const exerciseEditPageQueryDocument = gql`
  query ExerciseEditPageQuery($exerciseId: ID!) {
    exercise(id: $exerciseId) {
      id
      name
    }
  }
`

const exerciseEditPageMutation = gql`
  mutation UpdateExercise($exercise: UpdateExerciseInput!) {
    updateExercise(exercise: $exercise) {
      id
    }
  }
`

type FormData = {
  id: string
  name: string
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const ExerciseEditPage: NextPage<Props> = ({ exercise }: Props) => {
  const [updateExercise] = useMutation<
    UpdateExerciseMutation,
    UpdateExerciseMutationVariables
  >(exerciseEditPageMutation)

  const { handleSubmit, register, setFocus } = useForm<FormData>({
    defaultValues: {
      id: exercise.id,
      name: exercise.name,
    },
  })

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  const onSubmit = async (form: FormData) => {
    try {
      const { data } = await updateExercise({
        variables: {
          exercise: {
            id: form.id,
            name: form.name,
          },
        },
      })
      router.push({
        pathname: Route.Exercise,
        query: {
          exerciseId: data?.updateExercise.id,
        },
      })
    } catch {
      alert('Failed to update exercise!')
    }
  }

  return (
    <Main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          left={
            <Back
              href={{
                pathname: Route.Exercise,
                query: {
                  exerciseId: exercise.id,
                },
              }}
            />
          }
          right={<Menu />}
        >
          <input
            {...register('name')}
            autoComplete="off"
            className="block w-full border-gray-300 bg-neutral-800 text-3xl font-semibold shadow-sm focus:border-amber-500 focus:ring-amber-500"
            type="text"
          />
        </Header>
        <button className="w-full border border-neutral-300 py-4" type="submit">
          Save
        </button>
      </form>
    </Main>
  )
}

export default ExerciseEditPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { exerciseId } = ctx.params as any
  const { data } = await query<ExerciseQuery>(
    ctx,
    exerciseEditPageQueryDocument,
    {
      exerciseId,
    }
  )
  return {
    props: {
      exercise: data.exercise,
    },
  }
}
