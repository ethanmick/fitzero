import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Route } from 'lib'

type FormData = {
  email: string
  username: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const credentialMode = router.query['credential_mode']
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = async (creds: FormData) => {
    console.log(creds)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/login?redirect_to=${window.location.origin}`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(creds),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status >= 400) {
        console.error(res)
        return
      }
      router.push({
        pathname: Route.Routines,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!credentialMode && (
        <>
          <input
            {...register('email')}
            className="bg-gray-700 border"
            type="email"
          />
        </>
      )}
      {credentialMode && (
        <>
          <input
            {...register('username')}
            className="bg-gray-700 border"
            type="text"
          />
          <input
            {...register('password')}
            className="bg-gray-700 border"
            type="password"
          />
        </>
      )}

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
