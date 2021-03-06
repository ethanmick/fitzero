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
import { ExercisePageQuery, ExerciseQuery } from 'lib/generated'
import { gql } from '@apollo/client'
import Link from 'next/link'
import { PencilIcon } from '@heroicons/react/outline'

const exercisePageQueryDocument = gql`
  query ExercisePage($exerciseId: ID!) {
    exercise(id: $exerciseId) {
      id
      name
      canEdit
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

type ExerciseLog = {
  id: string
  eventDate: string
  totalSets: number
  minReps: number
  maxReps: number
  avgWeight: number
}

const ExerciseLogItem = ({
  id,
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
        className="block py-8"
      >
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
      </Link>
    </li>
  )
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const ExercisePage: NextPage<Props> = ({ exercise }: Props) => {
  return (
    <Main>
      <Header left={<Back href={Route.Exercises} />} right={<Menu />}>
        <PageTitle>
          <div className="flex space-x-4">
            <div>{exercise.name}</div>
            {exercise.canEdit && (
              <div>
                <Link
                  href={{
                    pathname: Route.ExerciseEdit,
                    query: {
                      exerciseId: exercise.id,
                    },
                  }}
                  className="block py-2"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </PageTitle>
      </Header>
      <button className="w-full border border-neutral-300">
        <Link
          href={{
            pathname: Route.ExerciseLogNew,
            query: {
              exerciseId: exercise.id,
            },
          }}
          className="block py-8"
        >
          New Log
        </Link>
      </button>
      <ul className="divide-y">
        {exercise.logs.map((el) => (
          <ExerciseLogItem
            id={el.id}
            key={el.id}
            eventDate={el.eventDate}
            {...el.stats}
          />
        ))}
      </ul>
    </Main>
  )
}

export default ExercisePage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { exerciseId } = ctx.params as any
  const { data } = await query<ExercisePageQuery>(ctx, exercisePageQueryDocument, {
    exerciseId,
  })
  return {
    props: {
      exercise: data.exercise,
    },
  }
}
