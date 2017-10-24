import React from 'react';

const Landing = () => {
  return (
    <div className="landing" style={{ textAlign: 'center' }}>
      <div>
        <h2>
          Introducing <span className="title">SurveyMe</span>
        </h2>
      </div>
      <div>
        <h5>The simple tool to collect feeback from your users</h5>
        <br />
        <ul>
          <li key="1">
            <a className="landing-li" href="/auth/google">
              <h5>LOGIN WITH GOOGLE</h5>
            </a>
          </li>
          <li key="2">
            <a className="landing-li" href="/auth/facebook">
              <h5>LOGIN WITH FACEBOOK</h5>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Landing;
