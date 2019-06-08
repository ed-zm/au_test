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
      initialValue: [moment({ h: 12, m: 0 }), moment({ h: 12, m: 0 })],
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

    if (!model.timePicker.length) {
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