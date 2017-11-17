import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Card from './Card';

const App = ({pollArr, user}) => {
  const auth = user ? true : false;
  return (
    <div className="App">
      <Navbar {...user}/>
      <div className="Column card-columns">
        {pollArr.map(poll => <Card key={poll._id} {...poll} {...{auth}}/>)}
      </div>
    </div>
  );
};

App.propTypes = {
  pollArr: PropTypes.array.isRequired,
  user: PropTypes.object
};

export default App;
// btn-social btn-twitter 
// {user ? <Navbar user={user}/> : <Navbar />}
// 