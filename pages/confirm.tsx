import { Route } from 'lib'
import type { GetServerSidePropsContext, NextPage } from 'next'

const AuthorizePage: NextPage = () => {
  return null
}

export default AuthorizePage

type Query = {
  email: string
  token: string
}

// Do the confirm check server side and redirect to either failure or success
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { email, token } = ctx.query as Query

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROOT}/authorize?email=${email}&token=${token}`,
      {
        credentials: 'include',
      }
    )
    if (res.status === 200) {
      const cookie = res.headers.get('set-cookie')
      // This would be very unexpected
      if (!cookie) {
        throw new Error('logged in with no cookie')
      }
      // Pass along the heauth header
      ctx.res.setHeader('set-cookie', cookie)
      return {
        redirect: {
          permanent: false,
          destination: Route.Workouts,
        },
      }
    }
    if (res.status >= 400) {
      return {
        redirect: {
          permanent: false,
          destination: Route.LoginFailed,
        },
      }
    }
  } catch (err: any) {
    return {
      redirect: {
        permanent: false,
        destination: Route.LoginFailed,
      },
    }
  }
}
