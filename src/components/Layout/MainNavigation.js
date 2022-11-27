import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = (props) => {

  const history = useHistory();

  function logoutHandler(){

    let url = 'http://localhost:8000/logout';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify({
        email:props.email,
      }),
     })
     .then((response) => response.json())
     .then((data) => {
      if(data.isAuthenticated){
        alert('Logout Unsuccessfull')
      }else{
        alert('Logout Successfull')
        props.onLogout();
        history.replace('/auth');
      }
     })
     .catch((err) => {
          alert('Logout Unsuccessfull')
          history.replace('/auth');
     });
  }

  return (
    <header className="header">
      <Link to='/'>
        <div className="logo">ParkNosis</div>
      </Link>
      <nav>
        <ul>
          {
            props.isAuthenticated && <li><Link to='/profile'>Profile</Link></li>
          }
          {
            props.isAuthenticated && <li><Link to='/previous-tests'>Previous Tests</Link></li>
          }
          {
            props.isAuthenticated && <li><button onClick={logoutHandler}>Logout</button></li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
