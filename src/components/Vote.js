import React from 'react';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'mango'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form action="api/vote/59f7606596472a3eb07322ba" method="post">{/*onSubmit={this.handleSubmit}*/}
        <div className="form-group">
          <label htmlFor="vote">Pick your favorite La Croix flavor:</label>
          <select className="form-control" id="vote" name="choice" value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default Vote;
