import { Logo } from 'components'
import { Route } from 'lib'
import type { NextPage } from 'next'
import Link from 'next/link'

const LogoSection = () => (
  <div className="text-center text-6xl">
    <Logo />
  </div>
)

const Auth = () => (
  <div className="flex justify-center mt-8 gap-8">
    <Link
      href={{
        pathname: Route.Login,
      }}
      className="px-4 py-2 border border-gray-50 text-xl">
      Log in
    </Link>
    <Link
      href={{
        pathname: Route.Signup,
      }}
      className="px-4 py-2 border border-gray-50 text-xl">
      Sign up
    </Link>
  </div>
)

const Home: NextPage = () => {
  return (
    <main className="pt-20">
      <LogoSection />
      <Auth />
    </main>
  )
}

export default Home
