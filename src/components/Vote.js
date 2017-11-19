import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import config from '../../config';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {option: '', notification: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({option: event.target.value, notification: null});
  }

  handleSubmit(event) {
    event.preventDefault();
    const notification = 
      <div className="alert alert-danger py-0 mt-1" role="alert">
        This choice exists!
      </div>;
    const {_id, dataPoints, modifyChart} = this.props;
    const choice_id = event.target.select.value;
    if(choice_id) {
      if(choice_id=='new') {
        const newChoice = event.target.input.value.trim().replace(/\s+/g, ' ').toLowerCase();
        if(dataPoints.find(item => item.label === newChoice)) {
          this.setState({notification: notification});
        }
        else {
          this.setState({notification: null});
          axios.post(config.apiUrl+'/newchoice/'+_id, {label: newChoice, value: 1})
            .then(resp => modifyChart(resp.data.dataPoints))
            .catch(error => console.error('Catch:', error));
        }
      }
      else {
        axios.post(config.apiUrl+'/vote/'+choice_id, {})
          .then(resp => modifyChart(resp.data.dataPoints))
          .catch(error => console.error('Catch:', error));
      }
    }
  }

  render() {
    const {dataPoints, auth} = this.props;
  
    const newSubmit = 
      <div className="input-group">
        <input type="text" className="form-control" name="input" aria-label="New choice..." 
          placeholder="New choice..." maxLength="30" required/>
        <span className="input-group-btn">
          <button type="submit" className="btn btn-primary">Vote</button>
        </span>
      </div>;

    const submit = <button type="submit" className="btn btn-primary btn-block">Vote</button>;

    return (
      <form className="Vote" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <select className="form-control" name="select" onChange={this.handleChange} required>
            <option value="">Select your choice</option>
            {dataPoints.map(item => <option key={item._id} value={item._id}>{item.label}</option>)}
            {auth && <option value="new">Add a new choice and vote for it</option>}
          </select>
        </div>
        {this.state.option=='new' ? newSubmit : submit}
        {this.state.notification}
      </form>
    );
  }
}

Vote.propTypes = {
  _id: PropTypes.string.isRequired,
  dataPoints: PropTypes.array.isRequired,
  modifyChart: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
};

export default Vote;
// m-1 btn-block value={this.state.option}
/*
            <div className="alert alert-warning alert-dismissible show" role="alert">
              Choice already exists!
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
*/