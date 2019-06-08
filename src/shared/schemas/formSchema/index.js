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
    timePicker: {
      __type__: Date,
      required: true,
      initialValue: [moment(), moment()],
      label: 'Time'
    }
  },
  model => {
    const error = {};
    const momentStartTime = moment(model.timePicker[0])
    const momentEndTime = moment(model.timePicker[1])

    if (!model.text) {
      error.text = 'Text is required!'
    }

    if (!model.timePicker) {
      error.timePicker = 'timePicker is required!'
    }
    
    if(momentEndTime.diff(momentStartTime) < 0) {
      error.timePicker = 'Start Time cannot be greater than End Time'
    }

    if (Object.keys(error).length) {
      throw error;
    }
  }
)

export default schema