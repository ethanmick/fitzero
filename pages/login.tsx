import { MailIcon } from '@heroicons/react/outline'
import { Logo } from 'components'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { workerData } from 'worker_threads'

type FormData = {
  email: string
}

type AwaitProps = {
  email: string
  onUndo: () => void
}

const AwaitConfirmation = ({ email, onUndo }: AwaitProps) => {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <h1 className="text-center text-4xl">Waiting for Confirmation</h1>
      <h2 className="text-lg">
        Please do not close this window until opening the email link.
      </h2>
      <p>
        We just sent an email to <span className="font-bold">{email}</span> (
        <button className="underline" onClick={onUndo}>
          undo
        </button>
        ). Please click the link in the email to login.
      </p>
    </div>
  )
}

type LoginFormProps = {
  onSuccess: (email: string) => void
}

/**
 * Login form owns the login process up until the user successfully submits a
 * valid email. Once we send the magic link we switch awaiting for confirmation.
 */
const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async ({ email }: FormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/login?redirect_to=${window.location.origin}`,
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
        Login to <Logo />
      </h1>
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
          <span className="text-center w-full">Login with Email</span>
        </button>
      </form>
    </>
  )
}

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSend = (email: string) => {
    setEmail(email)
    setSent(true)
  }

  const undo = () => setSent(false)

  return (
    <main className="mt-20 md:mt-64 flex flex-col items-center gap-12">
      {sent ? (
        <AwaitConfirmation email={email} onUndo={undo} />
      ) : (
        <LoginForm onSuccess={onSend} />
      )}
    </main>
  )
}

export default Login
