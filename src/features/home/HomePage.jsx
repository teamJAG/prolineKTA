import React from 'react';

const HomePage = ({history}) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/logo.png"
              alt="logo"
            />
            <div className="content">Proline KTA</div>
          </h1>
          <h2>Start Tracking Keys</h2>
          <div onClick={() => history.push('/records')} className="ui huge white inverted button">
            Proceed
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        Application made by{' '}
        <a href="https://jagteam-52aa5.firebaseapp.com/" title="Team JAG">
          JAG Software Solutions
        </a>{' '}
        version 1.0
      </div>
    </div>
  );
};

export default HomePage;
