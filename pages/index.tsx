import { Logo } from 'components'
import { Route } from 'lib'
import type { NextPage } from 'next'
import Link from 'next/link'

const LogoSection = () => (
  <div className="text-center text-6xl">
    <Logo />
  </div>
)

const Temp = () => (
  <div className="flex justify-center mt-8">
    <Link
      href={{
        pathname: Route.Login,
      }}
    >
      <a className="px-4 py-2 border border-gray-50 text-xl">Login</a>
    </Link>
  </div>
)

const Home: NextPage = () => {
  return (
    <main className="pt-20">
      <LogoSection />
      <Temp />
    </main>
  )
}

export default Home
