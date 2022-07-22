import { Back, PageTitle } from 'components'
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
import {
  DeleteExerciseLogMutation,
  DeleteExerciseLogMutationVariables,
  ExerciseLogsQuery,
} from 'lib/generated'
import { gql, useMutation } from '@apollo/client'
import { TrashIcon } from '@heroicons/react/outline'
import router from 'next/router'

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

const exerciseLogsPageDeleteMutation = gql`
  mutation DeleteExerciseLog($id: ID!) {
    deleteExerciseLog(id: $id)
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

type ExerciseLogItemProps = {
  exerciseLog: ExerciseLog
  onRemove: (id: string) => void
}

const ExerciseLogItem = ({ exerciseLog, onRemove }: ExerciseLogItemProps) => {
  return (
    <li>
      <Link
        href={{
          pathname: Route.ExerciseLog,
          query: {
            exerciseLogId: exerciseLog.id,
          },
        }}
        className="block py-8"
      >
        <div className="flex justify-around py-8">
          {exerciseLog.exerciseName}
        </div>
        <div className="flex justify-around py-8">
          <div className="flex flex-col items-start">
            <div className="text-2xl">
              {new Date(exerciseLog.eventDate).toLocaleDateString()}
            </div>
            <div className="text-sm font-light uppercase">DATE</div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-2xl">{exerciseLog.totalSets}</div>
            <div className="text-sm font-light uppercase">SETS</div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-2xl">
              {exerciseLog.minReps}-{exerciseLog.maxReps}
            </div>
            <div className="text-sm font-light uppercase">REPS</div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-2xl">{Math.floor(exerciseLog.avgWeight)}</div>
            <div className="text-sm font-light uppercase">LBS</div>
          </div>
          <div>
            <button onClick={() => onRemove(exerciseLog.id)}>
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </li>
  )
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const ExerciseLogsPage: NextPage<Props> = ({ exerciseLogs }: Props) => {
  const [deleteExerciseLog] = useMutation<
    DeleteExerciseLogMutation,
    DeleteExerciseLogMutationVariables
  >(exerciseLogsPageDeleteMutation)

  const onRemove = async (id: string) => {
    try {
      const { data } = await deleteExerciseLog({
        variables: {
          id,
        },
      })
      router.push({
        pathname: Route.ExerciseLogs,
      })
    } catch {
      alert('Failed to delete log!')
    }
  }

  return (
    <Main>
      <Header left={<Back href={Route.Home} />} right={<Menu />}>
        <PageTitle>Exercise Logs</PageTitle>
      </Header>
      <ul className="divide-y">
        {exerciseLogs.map((el) => (
          <ExerciseLogItem
            key={el.id}
            exerciseLog={{
              id: el.id,
              eventDate: el.eventDate,
              exerciseName: el.exercise.name,
              ...el.stats,
            }}
            onRemove={onRemove}
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
