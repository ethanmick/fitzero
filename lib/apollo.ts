import { ApolloClient, DocumentNode, InMemoryCache } from '@apollo/client'
import { getCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'

const uri = `${process.env.NEXT_PUBLIC_API_ROOT}/query`

const apolloClient = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  credentials: 'include',
})
export default apolloClient

export const query = async <Query = any, Variables = any>(
  ctx: GetServerSidePropsContext,
  query: DocumentNode,
  variables?: Variables
) => {
  const token = getCookie('token', ctx) as string
  console.log('Token', token)
  const apolloClient = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
      Cookie: `token=${token}`,
      Authorization: token,
    },
  })

  return apolloClient.query<Query, Variables>({ query, variables })
}
