import React from 'react';

import AuthForm from '../components/Auth/AuthForm';

const AuthPage = (props) => {
  return <AuthForm onLogin={props.onLogin}/>;
};

export default AuthPage;
