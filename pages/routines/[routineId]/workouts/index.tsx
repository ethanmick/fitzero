import { gql } from '@apollo/client'
import { PageTitle } from 'components'
import { Main } from 'components/layout'
import { Route } from 'lib'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Link from 'next/link'
import { v4 as uuid } from 'uuid'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const WorkoutsPage: NextPage<Props> = ({}: Props) => {
  return null
}

export default WorkoutsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  }
}
