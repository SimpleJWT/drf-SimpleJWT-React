import React, {useState} from 'react';
import { UserContext } from '../../contexts/userContext.js';
import './App.css';

import Login from '../Login/Login.js';
import AuthenticatedPingTest from '../AuthenticatedPingTest/AuthenticatedPingTest.js';


function App() {
  const [user, setUser] = useState(null);
  const isUserLoggedIn = () => {
    return !!user;
  }

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser, isUserLoggedIn}}>
        <h1>Sample DRF SampleJWT Repository</h1>
        <Login />
        <AuthenticatedPingTest/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
