import React from 'react';
import PropTypes from 'prop-types';

import Svg from './Svg';
import Vote from './Vote';

class Card extends React.Component {
  constructor(props) {
    super(props);

    const {dataPoints} = this.props;
    this.state = {dataPoints: dataPoints, notification: ''};

    this.handleClick = this.handleClick.bind(this);
    this.modifyChart = this.modifyChart.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '863713483802739',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.11'
      });
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  handleClick() {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'pollfcc.herokuapp.com',
    }, function(response){});
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
            <button className="btn btn-block btn-social btn-facebook" onClick={this.handleClick}>
              <span className="fa fa-facebook" />Share on Facebook
            </button>
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

// href="https://www.facebook.com/sharer/sharer.php?u=pollfcc.herokuapp.com"