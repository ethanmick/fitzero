import { Route } from 'lib'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => (
  <div className="flex justify-center">
    <Image width={800 / 3} height={160 / 3} src="/logo.svg" alt="FitZero" />
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
      <Logo />
      <Temp />
    </main>
  )
}

export default Home
