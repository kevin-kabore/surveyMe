import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card grey darken-4" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title orange-text"> {survey.title}</span>
            <p>E-mail Body: {survey.body}</p>
            <br />
            <p className="left">
              Last Responded:{' '}
              {new Date(survey.lastResponded).toLocaleDateString()}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a className="green-text">Yes: {survey.yes}</a>
            <a className="red-text">No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
