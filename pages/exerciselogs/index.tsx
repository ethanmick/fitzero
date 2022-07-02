import { PageTitle } from 'components'
import { Main } from 'components/layout'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Link from 'next/link'
import { query, Route } from 'lib'
import { Header } from 'components/header'
import { Menu } from 'components/menu'
import { ExerciseLogsQuery, ExercisesQuery } from 'lib/generated'
import { gql } from '@apollo/client'

const exerciseLogsPageQueryDocument = gql`
  query ExerciseLogs {
    exerciseLogs {
      id
      eventDate
      exercise {
        name
      }
      stats {
        totalSets
        minReps
        maxReps
        avgWeight
      }
    }
  }
`

type ExerciseLog = {
  id: string
  exerciseName: string
  eventDate: string
  totalSets: number
  minReps: number
  maxReps: number
  avgWeight: number
}

const ExerciseLogItem = ({
  id,
  exerciseName,
  eventDate,
  totalSets,
  minReps,
  maxReps,
  avgWeight,
}: ExerciseLog) => {
  return (
    <li>
      <Link
        href={{
          pathname: Route.ExerciseLog,
          query: {
            exerciseLogId: id,
          },
        }}
      >
        <a className="block py-8">
          <div className="flex justify-around py-8">
            {exerciseName}
          </div>
          <div className="flex justify-around py-8">
            <div className="flex flex-col items-start">
              <div className="text-2xl">
                {new Date(eventDate).toLocaleDateString()}
              </div>
              <div className="text-sm font-light uppercase">DATE</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl">{totalSets}</div>
              <div className="text-sm font-light uppercase">SETS</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl">
                {minReps}-{maxReps}
              </div>
              <div className="text-sm font-light uppercase">REPS</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl">{Math.floor(avgWeight)}</div>
              <div className="text-sm font-light uppercase">LBS</div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const ExerciseLogsPage: NextPage<Props> = ({ exerciseLogs }: Props) => {
  return (
    <Main>
      <Header right={<Menu />}>
        <PageTitle>Exercise Logs</PageTitle>
      </Header>
      <ul className="divide-y">
        {exerciseLogs.map((el) => (
          <ExerciseLogItem
            id={el.id}
            key={el.id}
            eventDate={el.eventDate}
            exerciseName={el.exercise.name}
            {...el.stats}
          />
        ))}
      </ul>
    </Main>
  )
}

export default ExerciseLogsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { data } = await query<ExerciseLogsQuery>(
    ctx,
    exerciseLogsPageQueryDocument
  )
  return {
    props: {
      exerciseLogs: data.exerciseLogs,
    },
  }
}
