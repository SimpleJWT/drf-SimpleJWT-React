import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext.js'
import { ping } from '../../api/rest.js'

function AuthenticatedPingTest() {
  const [pingResult, setPingResult] = useState();
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
      {isUserLoggedIn() ?
        <React.Fragment>
          <h2>Authenticated Request Test</h2>
          <button onClick={testPing}>Test Ping</button>
          <p>Ping Result: {pingResult} </p>
        </React.Fragment>
        :
        <p>Please Login to see the ping test</p>
      }
    </div>
  )
}

export default AuthenticatedPingTest;
