import { gql } from '@apollo/client'
import { Route } from 'lib'
import { NextPage } from 'next'
import Link from 'next/link'

// const ListWorkoutsQuery = gql``

const WorkoutsPage: NextPage = () => {
  return (
    <div>
      <h1>Workouts</h1>
      <Link href={Route.WorkoutsNew}>
        <a>Add</a>
      </Link>
    </div>
  )
}

export default WorkoutsPage
