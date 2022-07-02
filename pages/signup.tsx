import { MailIcon } from '@heroicons/react/outline'
import { Logo } from 'components'
import { ErrorAlert } from 'components/alert'
import { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type SuccessProps = {
  email: string
}

const Success = ({ email }: SuccessProps) => (
    <div className="flex flex-col gap-4 max-w-md">
      <h1 className="text-center text-4xl">Successfully Registered</h1>
      <p>
        We just sent an email to <span className="font-bold">{email}</span>.
        Please click the link in the email to log in.</p>
    </div>

)

type RegisterFormProps = {
  onSuccess: (email: string) => void
}

type FormData = {
  email: string
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async ({ email }: FormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/signup`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status >= 400) {
        console.error(res)
        setError((await res.json()) || `Sorry, that didn't work.`)
        return
      }
      onSuccess(email)
    } catch (err: any) {
      setError(err?.message)
    }
  }

  return (
    <>
      <h1 className="text-4xl">
        Sign up for <Logo />
      </h1>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <form
        className="w-full px-4 md:px-0 md:w-[300px] flex flex-col items-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('email')}
          required
          autoFocus
          className="bg-gray-700 border w-full"
          placeholder="Email Address"
          type="email"
        />
        <button
          className="inline-flex items-center border font-medium px-4 py-2 w-full"
          type="submit"
        >
          <MailIcon className=" -ml-1 mr-2 w-5 h-5" />
          <span className="text-center w-full">Register with Email</span>
        </button>
      </form>
    </>
  )
}

const Register: NextPage = () => {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
  
    const onSend = (email: string) => {
      setEmail(email)
      setSent(true)
    }
  
    return (
      <main className="mt-20 md:mt-64 flex flex-col items-center gap-12">
        {sent ? (
          <Success email={email} />
        ) : (
          <RegisterForm onSuccess={onSend} />
        )}
      </main>
    )
  }
  

export default Register
