import { Back, Navigation } from 'components'
import { Route } from 'lib'
import { NextPage } from 'next'

const AuthenticationFailed: NextPage = () => {
  return (
    <>
      <Navigation left={<Back href={Route.Root} />} />
      <main className="mt-20 flex flex-col items-center gap-12 px-4 md:mt-64 md:px-0">
        <h1 className="text-4xl">Authentication Failed</h1>
        <p>
          It looks like you may have clicked on an invalid email verification
          link.
          <br /> Please close this window and try authenticating again.
        </p>
      </main>
    </>
  )
}

export default AuthenticationFailed
