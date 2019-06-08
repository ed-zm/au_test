import React, { Component } from 'react'
import moment from 'moment'
import { graphql, compose } from 'react-apollo'
import { AutoForm, TextField, SubmitField, ErrorsField } from 'uniforms-antd'
import { Col, Row, List, Typography, Button } from 'antd'
import TimePicker from './components/TimePicker'
import formSchema from '../shared/schemas/formSchema/index'
import createPost from '../graphql/mutations/createPost'
import deletePost from '../graphql/mutations/deletePost'
import posts from '../graphql/queries/posts'

class Home extends Component {
  onDelete = id => {
    const { deletePost } = this.props
    deletePost({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deletePost: {
          __typename: 'Post',
          id
        }
      },
      update: (proxy, { data: { deletePost } }) => {
        const data = proxy.readQuery({ query: posts })
        const newPosts = data.posts.filter(post => post.id !== deletePost.id)
        proxy.writeQuery({ query: posts, data: { posts: newPosts }})        
      }
    })
  }

  onSubmit = async ({ text, timePicker: [ startTime, endTime] }) => {
    const { createPost } = this.props
    console.log(`
      Text: ${text}
      Start Time: ${moment(startTime).format('HH:mm:ss')}
      End Time: ${moment(endTime).format('HH:mm:ss')}
    `)
    await createPost({
      variables: {
        text,
        startTime,
        endTime
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createPost: {
          __typename: 'Post',
          id: '-1',
          text,
          startTime,
          endTime
        }
      },
      update: (proxy, { data: { createPost } }) => {
        const data = proxy.readQuery({ query: posts })
        const newPosts = data.posts.slice()
        newPosts.push(createPost)
        proxy.writeQuery({ query: posts, data: { posts: newPosts }})        
      }
    }).then(console.log)
  }

  render() {
    const { posts } = this.props
    const disabledTime = {
      disabledHours: () => [0,1,2,3,4,5,6,7,8,9,10,11]
    }
    return(
      <div style = {{ height: '100vh' }}>
        <Row align = 'middle' justify = 'center' type = 'flex'>
          <Col xs = { 32 } sm = { 16 } md = { 8 } lg = { 8 } xl = { 8 } xxl = { 8 }>
            <AutoForm schema = { formSchema } onSubmit = {this.onSubmit } showInlineError>
              <TextField required name = 'text'/>
              <TimePicker placeholder = {['Start Time', 'End Time']} name = 'timePicker' disabledTime = {() => disabledTime } required/>
              <ErrorsField name = 'error'/>
              <SubmitField />
            </AutoForm>
          </Col>
        </Row>
        <Row align = 'middle' justify = 'center' type = 'flex'>
          <Col xs = { 32 } sm = { 16 } md = { 8 } lg = { 8 } xl = { 8 } xxl = { 8 }>
            <List
              header={ <h2> Posts </h2> }
              bordered
              dataSource={posts.posts || []}
              renderItem={post => (
                <List.Item>
                  <Typography.Text mark>
                    { post.text }
                  </Typography.Text>
                  {` (${moment(post.startTime).format('HH:mm')} - ${moment(post.endTime).format('HH:mm')})`}
                  <Button type = 'danger' onClick = { () => this.onDelete(post.id) }> Delete </Button>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default compose(
  graphql(createPost, {
  name: 'createPost'
  }),
  graphql(deletePost, {
    name: 'deletePost'
    }),
  graphql(posts, {
    name: 'posts',
    options: {
      fetchPolicy: 'cache-and-network'
    }
  }),
)(Home)