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
import { ExerciseQuery } from 'lib/generated'
import { gql } from '@apollo/client'
import Link from 'next/link'

const exercisePageQueryDocument = gql`
  query Exercise($exerciseId: ID!) {
    exercise(id: $exerciseId) {
      id
      name
    }
  }
`

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const ExercisePage: NextPage<Props> = ({ exercise }: Props) => {
  console.log(exercise.name)
  return (
    <Main>
      <Header left={<Back href={Route.Exercises} />} right={<Menu />}>
        <PageTitle>{exercise.name}</PageTitle>
      </Header>
      <button className="border w-full border-neutral-300">
        <Link
          href={{
            pathname: Route.ExerciseLogNew,
            query: {
              exerciseId: exercise.id,
            },
          }}
        >
          <a className="block py-8">New Log</a>
        </Link>
      </button>
    </Main>
  )
}

export default ExercisePage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { exerciseId } = ctx.params as any
  const { data } = await query<ExerciseQuery>(ctx, exercisePageQueryDocument, {
    exerciseId,
  })
  return {
    props: {
      exercise: data.exercise,
    },
  }
}
