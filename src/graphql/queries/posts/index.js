import gql from 'graphql-tag'

export default gql`
  query {
    posts {
      id
      text
      startTime
      endTime
    }
  }
`