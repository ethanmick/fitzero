import { Back, Logo, Navigation } from 'components'
import { Route } from 'lib'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AuthorizePage: NextPage = () => {
  const router = useRouter()
  const token = router?.query['token']
  const email = router?.query['email']

  useEffect(() => {
    if (!token) return
    ;(async function () {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROOT}/authorize?token=${token}&email=${email}`,
          {
            credentials: 'include',
          }
        )

        if (res.status === 200) {
          // router.push(Route.Exercises)
        }
      } catch (err: any) {
        console.error(err)
      }
    })()
  }, [router, token, email])

  return (
    <>
      <Navigation left={<Back href={Route.Root} />} />
      <main className="mt-20 flex flex-col items-center gap-12 md:mt-64">
        <h1 className="text-4xl">
          Logging in to <Logo />
        </h1>
        <div>...</div>
      </main>
    </>
  )
}

export default AuthorizePage
