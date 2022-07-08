import { MailIcon } from '@heroicons/react/outline'
import { Back, Logo, Navigation } from 'components'
import { ErrorAlert } from 'components/alert'
import { Route } from 'lib'
import { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
}

type AwaitProps = {
  email: string
  onUndo: () => void
}

const AwaitConfirmation = ({ email, onUndo }: AwaitProps) => {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <h1 className="text-center text-4xl">Waiting for Confirmation</h1>
      <h2 className="text-lg">
        Please do not close this window until opening the email link.
      </h2>
      <p>
        We just sent an email to <span className="font-bold">{email}</span>{' '}
        <span className="break">
          <button className="underline" onClick={onUndo}>
            (undo)
          </button>
        </span>
        . Please click the link in the email to log in.
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
        Log in to <Logo />
      </h1>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      <form
        className="flex w-full flex-col items-center gap-8 md:w-[300px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('email')}
          required
          autoFocus
          className="w-full border bg-gray-700"
          placeholder="Email Address"
          type="email"
        />
        <button
          className="inline-flex w-full items-center border px-4 py-2 font-medium"
          type="submit"
        >
          <MailIcon className=" -ml-1 mr-2 h-5 w-5" />
          <span className="w-full text-center">Log in with Email</span>
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
    <>
      <Navigation left={<Back href={Route.Root} />} />
      <main className="mt-20 flex flex-col items-center gap-12 px-4 md:mt-64 md:px-0">
        {sent ? (
          <AwaitConfirmation email={email} onUndo={undo} />
        ) : (
          <LoginForm onSuccess={onSend} />
        )}
      </main>
    </>
  )
}

export default Login
