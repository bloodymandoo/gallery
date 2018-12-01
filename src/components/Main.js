require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Stage from './Stage';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="content">
        <Stage></Stage>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
