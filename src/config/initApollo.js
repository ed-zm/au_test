import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

if(!process.browser) {
  global.fetch = fetch
}

const create = () => {
  const link = new HttpLink({
    uri: 'https://thawing-ocean-56286.herokuapp.com',
    credentials: 'same-origin'
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if(graphQLErrors) {
          return graphQLErrors.map(({ message }) => console.log(message)) 
        }
        if(networkError) {
          return console.log('Please check your internet conection')
        }
        return null
      }),
      link
    ]),
    cache: new InMemoryCache({
      dataIdFromObject: o => o.id
    })
  })
}



export default () => {
  if(!process.browser) {
    return create()
  }
  if(!apolloClient) {
    apolloClient = create()
  }
  return apolloClient
}