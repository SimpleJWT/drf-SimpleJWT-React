import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";

import { UserContext } from '../contexts/userContext.js'
import AuthenticatedPingTest from '../components/AuthenticatedPingTest/AuthenticatedPingTest.js';

function AuthenticatedPing() {
  const history = useHistory();
  const {user, setUser, isUserLoggedIn} = useContext(UserContext)

  /**
   * redirectUnauthenticatedUser
   * the following redirects the user to the login page
   * if they aren't logged in.
  **/
  const redirectUnauthenticatedUser = () => {
    if (!isUserLoggedIn()) {
      history.push('/login?next=/ping');
    }
  }

  /**
   * calls redirectUnauthenticatedUser on mount and user changes.
  **/
  useEffect(()=> {
    redirectUnauthenticatedUser()
  }, [,user])


  return <div>
    <h1>AuthenticatedPing</h1>
    <AuthenticatedPingTest/>
  </div>
}

export default AuthenticatedPing;
