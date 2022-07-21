import { Back, PageTitle } from 'components'
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
import {
  CreateExerciseMutation,
  CreateExerciseMutationVariables,
  ExercisesQuery,
  ExerciseType,
} from 'lib/generated'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import router from 'next/router'

const exercisesPageQueryDocument = gql`
  query Exercises {
    exercises {
      id
      name
    }
  }
`

const createExerciseMutation = gql`
  mutation CreateExercise($exercise: CreateExerciseInput!) {
    createExercise(exercise: $exercise) {
      id
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
      className="block py-8"
    >
      {name}
    </Link>
  </li>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const ExercisesPage: NextPage<Props> = ({ exercises }: Props) => {
  const [filteredExercises, setFilteredExercises] = useState(exercises)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = exercises.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
    setFilteredExercises(filtered)
  }

  const [createExercise] = useMutation<
    CreateExerciseMutation,
    CreateExerciseMutationVariables
  >(createExerciseMutation)

  const onCreateExercise = async (exerciseName: string) => {
    try {
      const { data } = await createExercise({
        variables: {
          exercise: {
            name: exerciseName.trim(),
            type: ExerciseType.Strength,
          },
        },
      })
      router.push({
        pathname: Route.Exercise,
        query: {
          exerciseId: data?.createExercise.id,
        },
      })
    } catch {
      alert('Failed to create exercise!')
    }
  }

  return (
    <Main>
      <Header left={<Back href={Route.Home} />} right={<Menu />}>
        <PageTitle>Exercises</PageTitle>
      </Header>
      <input
        className="block w-full border-gray-300 bg-neutral-800 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-xl"
        type="text"
        name="search"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {filteredExercises.length == 0 && (
        <button
          className="w-full border border-neutral-300 py-8"
          onClick={() => onCreateExercise(searchQuery)}
        >
          Create &quot;{searchQuery.trim()}&quot;
        </button>
      )}
      <ul className="divide-y">
        {filteredExercises.map((exercise) => (
          <ExerciseItem key={exercise.id} {...exercise} />
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
