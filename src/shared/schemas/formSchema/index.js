import CustomSchema from '../../../utils/CustomSchema'
import moment from 'moment'

const schema = new CustomSchema(
  {
    text: {
      __type__: String,
      required: true,
      initialValue: '',
      label: 'Some Text'
    },
    startTime: {
      __type__: Date,
      required: true,
      initialValue: new Date(),
      label: 'Start Time'
    },
    endTime: {
      __type__: Date,
      required: true,
      initialValue: new Date(),
      label: 'End Time'
    }
  },
  model => {
    const error = {};
    const momentStartTime = moment(model.startTime)
    const momentEndTime = moment(model.endTime)

    if (!model.text) {
      error.text = 'Text is required!'
    }

    if (!model.startTime) {
      error.startTime = 'Start Time is required'
    }

    if (!model.endTime) {
      error.endTime = 'End Time is required'
    }
    if(momentEndTime.diff(momentStartTime) < 0) {
      error.Time = 'Start Time cannot be greater than End Time'
      error.endTime = 'End Time cannot be less than Start Time'
    }

    if (Object.keys(error).length) {
      throw error;
    }
  }
)

export default schema