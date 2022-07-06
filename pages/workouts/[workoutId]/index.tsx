import { Header, Main, PageTitle } from 'components'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const WorkoutPage: NextPage<Props> = ({ workout }: Props) => {
  return (
    <Main>
      <Header>
        <PageTitle>{'hi'}</PageTitle>
      </Header>
    </Main>
  )
}

export default WorkoutPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // const { data } = await query<WorkoutsQuery>(ctx, workoutsQuery)
  return {
    props: {
      workout: {},
    },
  }
}
