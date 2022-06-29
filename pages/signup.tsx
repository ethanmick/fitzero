import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Route } from 'lib'

type FormData = {
  email: string
}

const Signup: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (creds: FormData) => {
    console.log(creds)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/signup?redirect_to=${window.location.host}`,
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
      alert("Look for your log in link in your inbox!")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        className="bg-gray-700 border"
        type="email"
      />
      <button type="submit">Signup</button>
    </form>
  )
}

export default Signup
