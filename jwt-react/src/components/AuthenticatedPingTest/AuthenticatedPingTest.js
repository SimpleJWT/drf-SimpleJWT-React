import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';

import { UserContext } from '../../contexts/userContext.js'
import { ping } from '../../api/rest.js'

function AuthenticatedPingTest() {
  const [pingResult, setPingResult] = useState();
  // eslint-disable-next-line no-unused-vars
  const {user, setUser, isUserLoggedIn} = useContext(UserContext)

  const testPing = () => {
    ping()
    .then((data)=>{
      setPingResult(data.id)
    }).catch((error)=> {
      setUser(null);
    });
  }

  return (<div>
      <React.Fragment>
        <Button onClick={testPing}>Test Ping</Button>
        <p>Ping Result: {pingResult} </p>
      </React.Fragment>
    </div>
  )
}

export default AuthenticatedPingTest;
