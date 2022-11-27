import React from 'react';

import './UserProfile.css';

const UserProfile = (props) => {
  return (
    <section className='profile'>
      <h1 style={{color:"#38015c"}}>Welcome</h1>
      <h2>{props.email}</h2>
    </section>
  );
};

export default UserProfile;
