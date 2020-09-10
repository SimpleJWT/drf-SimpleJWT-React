import axios from 'axios';

// this base url will be change based on
// if you need to point to production.
const BASE_URL = "http://localhost:8000"
const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

let tokenRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
})

const loginUser = (username, password) => {
  const loginBody = {username: username, password: password}

  return tokenRequest.post(`/api/token/both/`, loginBody)
    .then((response)=> {
      window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
      window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      return Promise.resolve(response.data);
    }).catch((error)=>{
      return Promise.reject(error);
    });
}

const refreshToken = () => {
  const refreshBody = {"refresh": window.localStorage.getItem(REFRESH_TOKEN)}
  return tokenRequest.post(`/api/token/access/`, refreshBody)
    .then((response)=> {
      window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
      return Promise.resolve(response.data);
    }).catch((error)=>{
      return Promise.reject(error);
    });
}

const isCorrectRefreshError = (status) => {
  return status === 401;
}

/*
 * authRequest
 *
 * This refreshes the request and retries the token if it is invalid.
 * This is what you use to create any requests that need the Tokens.
 * Reference: https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta
 *
 * Example:
 *     authRequest.get('/path/to/endpoint/',extraParameters)
 *        .then(response=>{
 *          // do something with successful request
 *        }).catch((error)=> {
 *          // handle any errors.
 *        });
*/
const authRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`,
      'Content-Type': 'application/json',
    }
});
authRequest.interceptors.response.use(
  (response) => response, // this is for all successful requests.
  (error) => { //handle the request
    return errorInterceptor(error)
  }
);

const errorInterceptor = (error) => {
  const originalRequest = error.config;
  const status = error.response.status;
  if (isCorrectRefreshError(status)) {
    return refreshToken().then((data)=> {
      const headerAuthorization = `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`;
      authRequest.defaults.headers['Authorization'] = headerAuthorization;
      originalRequest.headers['Authorization'] = headerAuthorization;
      return authRequest(originalRequest)
    }).catch((error)=> {
      // if token refresh fails, logout the user to avoid potential security risks.
      logoutUser();
      return Promise.reject(error)
    })
  }
  return Promise.reject(error)
}

const logoutUser = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
  authRequest.defaults.headers['Authorization'] = "";
}

export { tokenRequest, loginUser, logoutUser, refreshToken, authRequest,
         errorInterceptor, BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN }
