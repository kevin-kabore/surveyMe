// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title',
    noValueError: 'You must provide a title'
  },
  {
    label: 'Subject Line',
    name: 'subject',
    noValueError: 'You must provide a subject'
  },
  {
    label: 'Email Body',
    name: 'body',
    noValueError: 'You must provide an email body'
  },
  { label: 'Recipient List', name: 'emails' }
];
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          label={label}
          name={name}
          type="text"
          component={SurveyField}
        />
      );
    });
    // lodash.map(Array, instanceName callback) same as .map() but faster
    // return FIELD.map(field => {
    //   return (
    //     <Field
    //       label={field.label}
    //       name={field.name}
    //       type="text"
    //       component={SurveyField}
    //     />
    //   )
    // })
    // return (
    //   <div>
    //     <Field
    //       label="Survey Title"
    //       type="text"
    //       name="title"
    //       component={SurveyField}
    //     />
    //     <Field
    //       label="Subject Line"
    //       type="text"
    //       name="subject"
    //       component={SurveyField}
    //     />
    //     <Field
    //       label="Email Body"
    //       type="text"
    //       name="body"
    //       component={SurveyField}
    //     />
    //     <Field
    //       label="Recipient List"
    //       type="text"
    //       name="emails"
    //       component={SurveyField}
    //     />
    //   </div>
    // );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  // FILEDS.forEach()
  // destructure properties off of value
  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  // if (!values.title) {
  //   errors.title = 'You must provide a title';
  // }
  // if (!values.subject) {
  //   errors.subject = 'You must provide a subject';
  // }
  // if (!values.body) {
  //   errors.body = 'You must provide a body';
  // }
  return errors;
}
export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
