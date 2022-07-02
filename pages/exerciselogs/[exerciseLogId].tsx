import { Back, PageTitle } from 'components'
import { Main } from 'components/layout'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { query, Route } from 'lib'
import { Header } from 'components/header'
import { Menu } from 'components/menu'
import { ExerciseLogQuery, ExerciseQuery } from 'lib/generated'
import { gql } from '@apollo/client'
import Link from 'next/link'

const exerciseLogPageQueryDocument = gql`
  query ExerciseLog($exerciseLogId: ID!) {
    exerciseLog(id: $exerciseLogId) {
      id
      eventDate
      exercise {
        id
        name
      }
      sets {
        setNumber
        reps
        weight
      }
    }
  }
`

type ExerciseLogSet = {
  setNumber: number
  reps: number
  weight: number
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

const ExerciseLogSetItem = ({ setNumber, reps, weight }: ExerciseLogSet) => {
  return (
    <li>
      <div className="flex justify-around py-8">
        <div className="flex flex-col items-center">
          <div className="text-2xl">{ordinal(setNumber)}</div>
          <div className="text-sm font-light uppercase">SET</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">{reps}</div>
          <div className="text-sm font-light uppercase">REPS</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">{weight}</div>
          <div className="text-sm font-light uppercase">LBS</div>
        </div>
      </div>
    </li>
  )
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const ExerciseLogPage: NextPage<Props> = ({ exerciseLog }: Props) => {
  return (
    <Main>
      <Header left={<Back href={Route.ExerciseLogs} />} right={<Menu />}>
        <PageTitle>{exerciseLog.exercise.name}</PageTitle>
      </Header>
      <div className="flex py-8 justify-end">
        <div className="flex flex-col items-end">
          <div className="text-2xl">
            {new Date(exerciseLog.eventDate).toLocaleDateString()}
          </div>
          <div className="text-sm font-light uppercase">DATE</div>
        </div>
      </div>
      <ul className="divide-y">
        {exerciseLog.sets.map((s) => (
          <ExerciseLogSetItem key={s.setNumber} {...s} />
        ))}
      </ul>
      <button className="border w-full border-neutral-300">
        <Link
          href={{
            pathname: Route.ExerciseLogNew,
            query: {
              exerciseId: exerciseLog.exercise.id,
            },
          }}
          className="block py-8"
        >
          New {exerciseLog.exercise.name} Log
        </Link>
      </button>
    </Main>
  )
}

export default ExerciseLogPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { exerciseLogId } = ctx.params as any
  const { data } = await query<ExerciseLogQuery>(
    ctx,
    exerciseLogPageQueryDocument,
    {
      exerciseLogId,
    }
  )
  return {
    props: {
      exerciseLog: data.exerciseLog,
    },
  }
}
