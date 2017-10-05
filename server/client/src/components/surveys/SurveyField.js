// SurveyField contains logic to render a single label and input for
import React from 'react';

// input = props.input, label = props.label coming from Field on SurveyForm as props
// {...input} same as all: onBlur={input.onBlur} onChange={input.onChange} etc...
// means pass all properties on input
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  );
};
