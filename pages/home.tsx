import { Header, Main, Menu, PageTitle } from 'components'
import { Route } from 'lib'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Main>
      <Header right={<Menu />}>
        <PageTitle>Home</PageTitle>
      </Header>
      <div className="bg-neutral-900">
        <Link
          href={{
            pathname: Route.Exercises,
          }}
          className="block py-8"
        >
          Exercises
        </Link>
      </div>
      <div className="bg-neutral-900">
        <Link
          href={{
            pathname: Route.ExerciseLogs,
          }}
          className="block py-8"
        >
          Exercise Logs
        </Link>
      </div>
      <div className="bg-neutral-900">
        <Link
          href={{
            pathname: Route.Routines,
          }}
          className="block py-8"
        >
          Routines
        </Link>
      </div>
      <div className="bg-neutral-900">
        <Link
          href={{
            pathname: Route.Workouts,
          }}
          className="block py-8"
        >
          Workouts
        </Link>
      </div>
    </Main>
  )
}

export default Home
