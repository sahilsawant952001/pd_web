import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';

import './AuthForm.css';

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const history = useHistory();

  function setEmailHandler(event){
    setEmail(event.target.value);
  }

  function setPasswordHandler(event){
    setPassword(event.target.value);
  }

  function authenticate(event){

      event.preventDefault();

      let url = 'http://localhost:8000/register';

      if(isLogin)
      {
        url = 'http://localhost:8000/login';
      }

      console.log(url)

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: JSON.stringify({
          email:email,
          password:password
        }),
       })
       .then((response) => response.json())
       .then((data) => {
          if(isLogin){
            if(data.isAuthenticated){
              props.onLogin(email);
              alert('Login Successfull!')
            }else{
              alert('Incorrect Username or Password')
            }
          }else{
            if(data.registered){
              alert('Registration Successfull! Please Login!')
              setIsLogin(true);
              history.replace('/auth');
            }else{
              alert('User Already Exists!')
            }
          }
       })
       .catch((err) => {
            console.log(err)
            alert('Login Failed!')
            history.replace('/auth');
       });
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className="auth">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={authenticate}>
        <div className="control">
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' onChange={setEmailHandler} required />
        </div>
        <div className="control">
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' onChange={setPasswordHandler} required />
        </div>
        <div className="actions">
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className="toggle"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
