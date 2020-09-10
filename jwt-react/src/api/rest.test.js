import mockAxios from 'axios'; // refer to __mocks__/axios.js

import { tokenRequest, refreshToken, authRequest,
         BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from './auth.js'
import { ping } from './rest.js'

// mockAxios.interceptors.request.use = jest.fn((callback) => {})

describe("ping", () => {
  test("tests interceptors", () => {
    const PARAMETERS = {params: {id: "PONG"}}
    authRequest.get.mockResolvedValueOnce({data: PARAMETERS['params']})

    return ping().then((data)=> {
      expect(data).toEqual(PARAMETERS['params'])
    });
  });
});
