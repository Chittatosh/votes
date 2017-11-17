import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.hydrate(
  <App pollArr={window.pollArr} user={window.user} />,
  document.getElementById('root')
);
