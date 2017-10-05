// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title'
  },
  {
    label: 'Subject Line',
    name: 'subject'
  },
  {
    label: 'Email Body',
    name: 'body'
  },
  {
    label: 'Recipient List',
    name: 'emails'
  }
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
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

  if (!values.title) {
    errors.title = 'You must provide a title';
  }
  return errors;
}
export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
