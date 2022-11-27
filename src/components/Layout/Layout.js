import React, { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation email={props.email} onLogout={props.onLogout} isAuthenticated={props.isAuthenticated}/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
