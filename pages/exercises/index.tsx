import { PageTitle } from 'components'
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
import { ExercisesQuery } from 'lib/generated'
import { gql } from '@apollo/client'
import { useState } from 'react'

const exercisesPageQueryDocument = gql`
  query Exercises {
    exercises {
      id
      name
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

  return (
    <Main>
      <Header right={<Menu />}>
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
