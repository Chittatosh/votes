import React from 'react';
import PropTypes from 'prop-types';

import Svg from './Svg';
import Vote from './Vote';

class Card extends React.Component {
  constructor(props) {
    super(props);

    const {dataPoints} = this.props;
    this.state = {dataPoints: dataPoints, notification: ''};

    this.modifyChart = this.modifyChart.bind(this);
  }

  modifyChart(dataPoints) {
    this.setState({dataPoints: dataPoints});
  }

  render() {
    const {_id, title, auth} = this.props;
    const dataPoints = this.state.dataPoints;
    const modifyChart = this.modifyChart;
    return (
      <div className="Card card text-white bg-dark">
        <Svg {...{_id, dataPoints}}/>
        <div className="card-body py-1">
          <h4 className="card-title">{title}</h4>
          <Vote {...{_id, dataPoints, auth, modifyChart}}/>
          {auth && 
            <a className="btn btn-block btn-social btn-facebook" 
              href="https://www.facebook.com/sharer/sharer.php?u=www.google.co.in">
              <span className="fa fa-facebook" />Share on Facebook
            </a>
          }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dataPoints: PropTypes.array.isRequired,
  auth: PropTypes.bool.isRequired
};

export default Card;
// mt-2