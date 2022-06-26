import { Route } from 'lib'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="bg-neutral-900">
      <Link
        href={{
          pathname: Route.Routines,
        }}
      >
        <a>Routines</a>
      </Link>
    </div>
  )
}

export default Home
