import React from 'react';
import PropTypes from 'prop-types';

import NewPoll from './NewPoll';

const Navbar = ({displayName}) => {
  
  /*const searchBox = 
    <div className="input-group m-1">
      <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..."/>
      <span className="input-group-btn">
        <button className="btn btn-secondary" type="button">Go!</button>
      </span>
    </div>;*/

  const loggedIn = 
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="btn-group btn-block m-1">
        <button type="button" className="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          New Poll
        </button>
        <div className="dropdown-menu">
          <NewPoll/>
        </div>
      </div>
      <a className="btn btn-block btn-success m-1" href="#">My Polls</a>
      <a className="btn btn-block btn-social btn-facebook m-1" href='/logout'>
        <span className="fa fa-facebook"></span>Logout {displayName}
      </a>
      {/*searchBox*/}
    </div>;

  const loggedOut = 
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <a className="btn btn-block btn-social btn-facebook m-1" href="/login/facebook">
        <span className="fa fa-facebook"></span>Sign in to create new polls or choices
      </a>
      {/*searchBox*/}
    </div>;

  return (
    <nav className="Navbar navbar navbar-expand-md navbar-dark bg-dark mb-3">
      <a className="navbar-brand" href="#">FCC Voting App</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {displayName ? loggedIn : loggedOut}
    </nav>
  );
};

Navbar.propTypes = {
  displayName: PropTypes.string
};

export default Navbar;

// light dark sticky-top 
/*
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Separated link</a>
            </div>

          <span className="navbar-text">
            Hello, {displayName}
          </span>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">New Poll</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Polls</a>
            </li>
          </ul>
          {displayName ? 'Logout' : 'Sign in with Facebook'}
        <span className="navbar-text">
          Sign in to create new polls and choices
        </span>

        <li className="nav-item" id="facebook">
        </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li>
          <form className="form-inline my-2 my-lg-0 w-25">
            <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>





              <form className="px-4 py-3">
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input"/>
                    Remember me
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
              </form>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">New around here? Sign up</a>
              <a className="dropdown-item" href="#">Forgot password?</a>
 */