import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import PreviousTests from './pages/PreviousTests';
import PreviousTest from './pages/PreviousTest';
import StyledDemo from './components/ImageCropper/Cropper';
import NotFound from './pages/NotFount';


function App() {

  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
      const isAuth = localStorage.getItem('isAuthenticated');
      if(isAuth === 'true'){
        console.log("yes it is working")
        setIsAuthenticated(true);
        setEmail(localStorage.getItem('email'));
        history.replace("/");
      }
  },[])

  function onLogin(email){
    setIsAuthenticated(true);
    setEmail(email)
    localStorage.setItem('isAuthenticated',true);
    localStorage.setItem('email',email);
    history.replace('/');
  }

  function onLogout(){
    setIsAuthenticated(false);
    setEmail(null)
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('email');
    history.replace('/auth');
  }

  return (
    <Layout onLogout={onLogout} email={email} isAuthenticated={isAuthenticated}>
      <Switch>
        <Route path='/' exact>
          {isAuthenticated && <StyledDemo/>}
          {!isAuthenticated && <Redirect to='/auth'/>}
        </Route>
        <Route path='/auth' exact>
          {!isAuthenticated && <AuthPage onLogin={onLogin}/>}
        </Route>
        <Route path='/profile' exact>
          {isAuthenticated && <UserProfile email={email}/>}
          {!isAuthenticated && <Redirect to='/auth'/>}
        </Route>
        <Route path='/previous-tests' exact>
          {isAuthenticated && <PreviousTests/>}
          {!isAuthenticated && <Redirect to='/auth'/>}
        </Route>
        <Route path='/previous-tests/:testId' exact>
          {isAuthenticated && <PreviousTest/>}
          {!isAuthenticated && <Redirect to='/auth'/>}
        </Route>
        <Route path='*'>
          <NotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
