import gql from 'graphql-tag'

export default gql`
  mutation($text: String!, $startTime: DateTime!, $endTime: DateTime!) {
    createPost(
      data: {
        text: $text,
        startTime: $startTime,
        endTime: $endTime
      }
    ) {
      id
      text
      startTime
      endTime
    }
  }
`