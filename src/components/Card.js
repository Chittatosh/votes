import React from 'react';

import Svg from './Svg';

const Card = ({poll}) => {
  const {_id, title, dataPoints} = poll;
  return (
    <div className="Card card text-white bg-dark">
      <Svg {...{_id, dataPoints}}/>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
};

export default Card;