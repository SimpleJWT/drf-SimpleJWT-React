import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { UserContext } from '../../contexts/userContext.js'
import { loginUser, logoutUser } from '../../api/auth.js'

// Hook to get query params.
// this could be refactored to somewhere else for future contributors.
function useQueryParams () {
  return new URLSearchParams(useLocation().search);
}

function Login() {
  const queryParams = useQueryParams();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const {user, setUser, isUserLoggedIn} = useContext(UserContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorDisplay, setErrorDisplay] = useState("")

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    if (!isValidForm()){
      return
    }
    loginUser(username, password).then((data)=>{
      setUser({username: username})
      history.push(getRouteAfterLogin());
    }).catch((error)=> {
      setErrorDisplay()
    })
  }

  const getRouteAfterLogin = () => {
    let route = queryParams.get("next")
    if (route === null) {
      route = "/";
    }
    return route
  }

  const isValidForm = () => {
    setErrorDisplay("")
    if (username === "" || password === ""){
      setErrorDisplay("username and password can't be empty. try user: test, password: test")
      return false;
    }
    return true;
  }

  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    logoutUser()
    setUser(null);
  }

  return <div>
    <Form onSubmit={onLoginFormSubmit} method="POST">
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={(event)=>{setUsername(event.target.value)}}
          type="text"
          id="username"
          name="username"/>
      </Form.Group>
      <br/>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(event)=>{setPassword(event.target.value)}}
          type="text"
          id="password"
          name="password"/>
      </Form.Group>
      <Button type="submit">login</Button>
      <p style={{color: 'red'}}>{errorDisplay}</p>
    </Form>
  </div>
}

export default Login;
