import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <a className="nav-link" href="/auth/google">
              LOGIN WITH GOOGLE
            </a>
          </li>,
          <li key="2">
            <a className="nav-link" href="/auth/facebook">
              LOGIN WITH FACEBOOK
            </a>
          </li>
        ];
      default:
        return [
          <li key="3" style={{ margin: '0 10px' }}>
            <Payments />
          </li>,
          <li key="5" style={{ margin: '0 10px' }}>
            CREDITS: {this.props.auth.credits}
          </li>,
          <li key="4">
            <a className="nav-link" href="/api/logout">
              LOGOUT
            </a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper grey darken-4">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo nav-logo"
            style={{ margin: '0 10px' }}
          >
            SurveyMe
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
