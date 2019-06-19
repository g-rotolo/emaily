import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.getSurveys();
  }

  renderContent() {
    return this.props.surveys
      .reverse()
      .map(survey => {
      return (
        <div key={survey._id} className="card darken-1">
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent on: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a href="#">Yes: {survey.yes}</a>
            <a href="#">No: {survey.no}</a>
          </div>
        </div>
      );
    })
  }

  render() {
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys }
}

export default connect(mapStateToProps, { getSurveys })(SurveyList);