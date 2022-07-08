import { gql } from '@apollo/client'
import { Logo, Navigation } from 'components'
import { Menu } from 'components/menu'
import { query, Route } from 'lib'
import { MeQuery } from 'lib/generated'
import type { GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'

const meQuery = gql`
  query Me {
    me {
      id
    }
  }
`

const LogoSection = () => (
  <div className="text-center text-6xl">
    <Logo />
  </div>
)

const Auth = () => (
  <div className="mt-8 flex justify-center gap-8">
    <Link
      href={{
        pathname: Route.Login,
      }}
      className="border border-gray-50 px-4 py-2 text-xl"
    >
      Log in
    </Link>
    <Link
      href={{
        pathname: Route.Signup,
      }}
      className="border border-gray-50 px-4 py-2 text-xl"
    >
      Sign up
    </Link>
  </div>
)

const Home: NextPage = () => {
  return (
    <>
      <Navigation left={<Menu />} />
      <main className="pt-20">
        <LogoSection />
        <Auth />
      </main>
    </>
  )
}

export default Home

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // Check if the user is authenticated, if so, send them to their workouts
    await query<MeQuery>(ctx, meQuery)
    return {
      redirect: {
        permanent: false,
        destination: Route.Workouts,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      props: {},
    }
  }
}
