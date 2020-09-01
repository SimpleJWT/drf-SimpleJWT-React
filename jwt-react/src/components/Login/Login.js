import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext.js'
import { loginUser, logoutUser } from '../../api/auth.js'



function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorDisplay, setErrorDisplay] = useState("")
  const {user, setUser, isUserLoggedIn} = useContext(UserContext)

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    if (!isValidForm()){
      return
    }
    loginUser(username, password).then((data)=>{
      setUser({username: username})
    }).catch((error)=> {
      setErrorDisplay()
    })
  }

  const isValidForm = () => {
    setErrorDisplay("")
    if (username === "" || password === ""){
      setErrorDisplay("username and password can't be empty. try user: test, password: test")
      return false;
    }
    return true;
  }

  const logout = () => {
    logoutUser()
    setUser(null);
  }

  return <div>
    {
      isUserLoggedIn() ?
      <React.Fragment>
      <h3>{user.username} is currently Logged in</h3>
        <button onClick={logout}>Logout</button>
      </React.Fragment>
      :
      <React.Fragment>
      <h2>Login</h2>
        <form onSubmit={onLoginFormSubmit} method="POST">
          <label htmlFor="username">Username</label>
          <input
            onChange={(event)=>{setUsername(event.target.value)}}
            type="text"
            id="username"
            name="username"/>
          <br/>
          <label htmlFor="password">Password</label>
          <input
            onChange={(event)=>{setPassword(event.target.value)}}
            type="text"
            id="password"
            name="password"/>
          <br/>
          <button type="submit">login</button>
          <p style={{color: 'red'}}>{errorDisplay}</p>
        </form>
      </React.Fragment>
    }
  </div>
}

export default Login;
