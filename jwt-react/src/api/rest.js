import { authRequest } from './auth.js'

const ping = () => {
  const extraParameters = {params: {"id": "PONG" }}
  return authRequest.get('/api/ping/',extraParameters)
    .then(response=>{
      if (response === undefined) {
        throw new Error("User has not logged in yet")
      }
      return Promise.resolve(response.data)
    }).catch((error)=> {
      return Promise.reject(error)
    });
}


export { ping }
