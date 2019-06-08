import React, { Component } from 'react'
import moment from 'moment'
import { graphql } from 'react-apollo'
import { AutoForm, TextField, SubmitField, ErrorsField } from 'uniforms-antd'
import { Col, Row } from 'antd'
import TimePicker from './components/TimePicker'
import formSchema from '../shared/schemas/formSchema/index'
import createPost from '../graphql/mutations/createPost'

class Home extends Component {
  onSubmit = async ({ text, timePicker: [ startTime, endTime] }) => {
    const { createPost } = this.props
    console.log(`
      Text: ${text}
      Start Time: ${moment(startTime).format('HH:mm:ss')}
      End Time: ${moment(endTime).format('HH:mm:ss')}
    `)
    await createPost({ variables: {
      text,
      startTime,
      endTime
    }}).then(console.log)
  }

  render() {
    const disabledTime = {
      disabledHours: () => [0,1,2,3,4,5,6,7,8,9,10,11]
    }
    return(
      <Row align = 'middle' justify = 'center' type = 'flex'>
        <Col xs = { 32 } sm = { 16 } md = { 8 } lg = { 8 } xl = { 8 } xxl = { 8 }>
          <div style = {{ height: '100vh' }}>
            <AutoForm schema = { formSchema } onSubmit = {this.onSubmit } showInlineError>
              <TextField required name = 'text'/>
              <TimePicker placeholder = {['Start Time', 'End Time']} name = 'timePicker' disabledTime = {() => disabledTime } required/>
              <ErrorsField name = 'error'/>
              <SubmitField />
            </AutoForm>
          </div>
        </Col>
      </Row>
    )
  }
}

export default graphql(createPost, {
  name: 'createPost'
})(Home)