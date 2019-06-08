import React from 'react'
import { wrapField } from 'uniforms-antd'
import { DatePicker } from 'antd'
import connectField from 'uniforms/connectField'
import filterDOMProps from 'uniforms/filterDOMProps'
import moment from 'moment'

const Range = props =>
  wrapField(
    props,
    <DatePicker.RangePicker
      showDate = { false }
      defaultValue = { [moment(), moment()] }
      mode = {['time', 'time']}
      showTime = {{
        hideDisabledOptions: true
      }}
      format = 'HH:mm'
      disabled = {props.disabled}
      id = {props.id}
      name = {props.name}
      onChange = { props.onChange }
      placeholder = {props.placeholder}
      ref = {props.inputRef}
      {...filterDOMProps(props)}
    />
  );
Range.defaultProps = {
  style: {width: '100%'}
};

export default connectField(Range, {ensureValue: false})