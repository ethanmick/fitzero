import { ArrowLeftIcon, MinusIcon } from '@heroicons/react/outline'
import { Route } from 'lib'
import { DateTime } from 'luxon'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

type ExerciseLogSet = {
  id: string
  reps: string
  weight: string
}

const exercise = {
  name: 'Bench Press',
  final: 'Drop Set',
  previous: [
    {
      reps: 8,
      weight: 70,
    },
    {
      reps: 8,
      weight: 70,
    },
    {
      reps: 8,
      weight: 70,
    },
    {
      reps: 8,
      weight: 70,
    },
  ],
  current: [
    {
      reps: '6-8',
      weight: 80,
    },
  ],
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

type SetsProps = {
  sets: ExerciseLogSet[]
  onRemove: (r: ExerciseLogSet) => void
  onChange: (r: ExerciseLogSet) => void
  onAdd: () => void
}

const Sets = ({ sets, onRemove, onAdd, onChange }: SetsProps) => {
  return (
    <div className="bg-neutral-900 px-4 shadow">
      <h2 className="text-2xl py-8">Sets</h2>
      <h3>Previous</h3>
      <div className="flex justify-around py-8">
        <div className="flex flex-col items-start">
          <div className="text-2xl">4</div>
          <div className="text-sm font-light uppercase">Sets</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">8</div>
          <div className="text-sm font-light uppercase">Reps</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">50</div>
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
          <li key={s.id} className="grid grid-cols-10 gap-8 py-8 items-center">
            <div className="ordinal">{ordinal(i + 1)}</div>
            <div className="mt-1 relative rounded-md shadow-sm col-span-4">
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
                placeholder={'0'}
                className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 bg-neutral-800"
              />
            </div>
            <div className="mt-1 relative rounded-md col-span-4">
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
                className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 bg-neutral-800"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  lbs
                </span>
              </div>
            </div>
            <div>
              <button onClick={() => onRemove(s)}>
                <MinusIcon className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
        <div className="pb-12">
          <button
            className="border w-full py-4 border-neutral-300"
            onClick={onAdd}
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
    <h1 className="py-4 font-semibold text-3xl">{children}</h1>
    <h2>{DateTime.now().minus({ week: 1 }).toRelative()}</h2>
  </div>
)

const Home: NextPage = () => {
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

  return (
    <div className="bg-neutral-900">
      <Link
        href={{
          pathname: Route.Routines,
        }}
      >
        <a>Routines</a>
      </Link>
    </div>
  )
}

export default Home
