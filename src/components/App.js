import React from 'react';

import Card from './Card';

class App extends React.Component {

  render() {
    const polls = this.props.initialData;
    return (
      <div className="App card-columns">
        {Object.keys(polls).map(id => <Card key={id} poll={polls[id]}/>)}
      </div>
    );
  }
}

export default App;