import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Route } from 'lib'

type FormData = {
  username: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (creds: FormData) => {
    console.log(creds)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(creds),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.status >= 400) {
        console.error(res)
        return
      }
      router.push({
        pathname: Route.Workouts,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
