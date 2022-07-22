import { Back, Main } from 'components'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import { query, Route } from 'lib'
import {
  CreateExerciseLogMutation,
  CreateExerciseLogMutationVariables,
  ExerciseQuery,
  Unit,
} from 'lib/generated'
import { gql, useMutation } from '@apollo/client'
import { TrashIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import router from 'next/router'
import { useForm } from 'react-hook-form'

const fetchExerciseQuery = gql`
  query ExerciseForNewExerciseLog($exerciseId: ID!) {
    exercise(id: $exerciseId) {
      id
      name
      logs {
        id
        eventDate
        stats {
          totalSets
          minReps
          maxReps
          avgWeight
        }
      }
    }
  }
`

const createExerciseLogMutation = gql`
  mutation CreateExerciseLog($exerciseLog: CreateExerciseLogInput) {
    createExerciseLog(exerciseLog: $exerciseLog) {
      id
    }
  }
`

type FormData = {
  eventDate: Date
}

type ExerciseLog = {
  eventDate: string
  totalSets: number
  minReps: number
  maxReps: number
  avgWeight: number
}

type ExerciseLogSet = {
  id: string
  reps: string
  weight: string
}

const ordinal = (n: number) => {
  const ordinalRules = new Intl.PluralRules('en', {
    type: 'ordinal',
  })
  const suffixes: any = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
  }
  const suffix = suffixes[ordinalRules.select(n)]
  return n + suffix
}

const repsText = (min: number, max: number) => {
  return min == max ? String(min) : String(min) + '-' + String(max)
}

type SetsProps = {
  previousLogStats: ExerciseLog
  sets: ExerciseLogSet[]
  onRemove: (r: ExerciseLogSet) => void
  onChange: (r: ExerciseLogSet) => void
  onAdd: () => void
}

const Sets = ({
  previousLogStats,
  sets,
  onRemove,
  onAdd,
  onChange,
}: SetsProps) => {
  return (
    <div className="bg-neutral-900 px-4 shadow">
      <h2 className="py-8 text-2xl">Sets</h2>
      <h3>Previous</h3>
      <div className="flex justify-around py-8">
        <div className="flex flex-col items-start">
          <div className="text-2xl">
            {new Date(previousLogStats?.eventDate).toLocaleDateString()}
          </div>
          <div className="text-sm font-light uppercase">Date</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">{previousLogStats?.totalSets}</div>
          <div className="text-sm font-light uppercase">Sets</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">
            {repsText(previousLogStats?.minReps, previousLogStats?.maxReps)}
          </div>
          <div className="text-sm font-light uppercase">Reps</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">{previousLogStats?.avgWeight}</div>
          <div className="text-sm font-light uppercase">lbs</div>
        </div>
      </div>
      <ul>
        <li className="grid grid-cols-10 gap-8">
          <div>Set</div>
          <div className="col-span-4">Reps</div>
          <div className="col-span-4">Weight</div>
        </li>
        {sets.map((s, i) => (
          <li key={s.id} className="grid grid-cols-10 items-center gap-8 py-8">
            <div className="ordinal">{ordinal(i + 1)}</div>
            <div className="relative col-span-4 mt-1 rounded-md shadow-sm">
              <input
                autoComplete="off"
                type="number"
                pattern="\d*"
                value={s.reps}
                onChange={(e) =>
                  onChange({
                    ...s,
                    reps: e.target.value,
                  })
                }
                onFocus={(e) => {
                  e.target.select()
                }}
                placeholder={'0'}
                className="block w-full border-gray-300 bg-neutral-800 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
            </div>
            <div className="relative col-span-4 mt-1 rounded-md">
              <input
                autoComplete="off"
                inputMode="decimal"
                type="number"
                value={s.weight}
                placeholder={'0'}
                onChange={(e) =>
                  onChange({
                    ...s,
                    weight: e.target.value,
                  })
                }
                onFocus={(e) => {
                  e.target.select()
                }}
                className="block w-full border-gray-300 bg-neutral-800 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  lbs
                </span>
              </div>
            </div>
            <div>
              <button onClick={() => onRemove(s)}>
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
        <div className="pb-12">
          <button
            className="w-full border border-neutral-300 py-4"
            onClick={onAdd}
            type="button"
          >
            Another Set
          </button>
        </div>
      </ul>
    </div>
  )
}

type NameProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

const Name = ({ children, ...rest }: NameProps) => (
  <div className="px-4 py-12">
    <h1 className="py-4 text-3xl font-semibold">{children}</h1>
    {/* <h2>{DateTime.now().minus({ week: 1 }).toRelative()}</h2> */}
  </div>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const CreateExerciseLogPage: NextPage<Props> = ({ exercise }: Props) => {
  const { handleSubmit } = useForm<FormData>({
    defaultValues: {
      eventDate: new Date(),
    },
  })

  const [sets, setSets] = useState<ExerciseLogSet[]>([
    {
      id: uuid(),
      reps: '',
      weight: '',
    },
  ])

  const removeSet = (remove: ExerciseLogSet) => {
    setSets((sets) => {
      return sets.filter((s) => s.id !== remove.id)
    })
  }

  const addSet = () => {
    setSets((sets) => {
      const prev = sets[sets.length - 1]
      return [
        ...sets,
        {
          id: uuid(),
          reps: prev?.reps || '',
          weight: prev?.weight || '',
        },
      ]
    })
  }

  const onChange = (up: ExerciseLogSet) => {
    setSets((sets) => {
      const i = sets.findIndex((s) => s.id === up.id)
      sets[i] = { ...up }
      return [...sets]
    })
  }

  const [createExerciseLog] = useMutation<
    CreateExerciseLogMutation,
    CreateExerciseLogMutationVariables
  >(createExerciseLogMutation)

  const onSubmit = async (form: FormData) => {
    try {
      const { data } = await createExerciseLog({
        variables: {
          exerciseLog: {
            exercise: exercise.id,
            eventDate: form.eventDate,
            sets: sets.map((set) => ({
              reps: parseInt(set.reps),
              weight: parseFloat(set.weight),
              unit: Unit.Pound,
            })),
          },
        },
      })
      router.push({
        pathname: Route.ExerciseLog,
        query: {
          exerciseLogId: data?.createExerciseLog.id,
        },
      })
    } catch {
      alert('Failed to create log!')
    }
  }

  return (
    <div className="bg-neutral-900">
      <Head>
        <title>FitZer0</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#171717" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Main className="pb-safe pt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
          <Name>{exercise.name}</Name>
          <Sets
            previousLogStats={{
              eventDate: exercise.logs[0]?.eventDate,
              ...exercise.logs[0]?.stats,
            }}
            sets={sets}
            onRemove={removeSet}
            onAdd={addSet}
            onChange={onChange}
          />
          <div className="px-4">
            <button
              className="w-full border border-neutral-300 py-4"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </Main>
    </div>
  )
}

export default CreateExerciseLogPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { exerciseId } = ctx.query as any
  const { data } = await query<ExerciseQuery>(ctx, fetchExerciseQuery, {
    exerciseId,
  })
  return {
    props: {
      exercise: data.exercise,
    },
  }
}
