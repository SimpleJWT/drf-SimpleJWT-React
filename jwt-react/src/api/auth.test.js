import mockAxios from 'axios'; // refer to __mocks__/axios.js

import { tokenRequest, loginUser, logoutUser, refreshToken, authRequest,
         errorInterceptor, BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from './auth.js'

window.localStorage = localStorage;

beforeEach(() => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'removeItem');
});

const ACCESS_TOKEN_VALUE = "a token";
const REFRESH_TOKEN_VALUE = "another token";

describe("loginUser", ()=> {
  const EXPECTED_DATA = {data: {"access": ACCESS_TOKEN_VALUE, "refresh": REFRESH_TOKEN_VALUE}}

  test("login request is made, and saves token", () => {
    tokenRequest.post.mockResolvedValueOnce(EXPECTED_DATA)
    const USER = "username-test";
    const PASSWORD = "password-test";

    return loginUser(USER, PASSWORD).then((data)=> {
      expect(data).toEqual(EXPECTED_DATA["data"])
      expect(mockAxios.post).toHaveBeenCalledWith('/api/token/both/',
        {"password": PASSWORD, "username": USER}
      );
      expect(window.localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, ACCESS_TOKEN_VALUE)
      expect(window.localStorage.setItem).toHaveBeenCalledWith(REFRESH_TOKEN, REFRESH_TOKEN_VALUE)
    });
  });
});

describe("refreshToken", () => {
  const EXPECTED_DATA = {"data":{"access":"another token"}}
  test("token request is made and saves token.", () => {
    //setup mocks
    tokenRequest.post.mockResolvedValueOnce(EXPECTED_DATA)
    window.localStorage.getItem.mockReturnValueOnce(REFRESH_TOKEN)

    return refreshToken().then((data)=> {
      expect(data).toEqual(EXPECTED_DATA['data'])
      expect(window.localStorage.getItem).toHaveBeenCalledWith(REFRESH_TOKEN)
      expect(tokenRequest.post).toHaveBeenCalledWith('/api/token/access/',
        {"refresh": REFRESH_TOKEN}
      );
      expect(window.localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN, ACCESS_TOKEN_VALUE)
    });
  });
});


describe("logoutUser", () => {
  test("removes Authorization and localStorage", () => {
    logoutUser();
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(REFRESH_TOKEN);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(ACCESS_TOKEN);
    expect(authRequest.defaults.headers['Authorization']).toEqual("")
  });
});

describe("errorInterceptor", () => {
  const ERROR_RESPONSE = {
    status: 401,
    statusText: "Unauthorized"
  }
  test("refreshes token", () => {
    let errorConfig = {
      url: "/api/ping/",
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: ""
      }
    }
    const EXPECTED_DATA = {"data":{"access":"another token"}};
    tokenRequest.post.mockResolvedValueOnce(EXPECTED_DATA);
    authRequest.get.mockResolvedValueOnce(EXPECTED_DATA);
    window.localStorage.getItem
      .mockReturnValueOnce(REFRESH_TOKEN_VALUE) // for refreshToken
      .mockReturnValueOnce(ACCESS_TOKEN_VALUE) // for the error interceptor

    return errorInterceptor({config: errorConfig, response: ERROR_RESPONSE})
      .finally(()=> {
        expect(tokenRequest.post).toHaveBeenCalledWith('/api/token/access/',
          {"refresh": REFRESH_TOKEN}
        );
        expect(errorConfig.headers['Authorization']).toEqual(`Bearer ${ACCESS_TOKEN_VALUE}`)
        expect(authRequest).toHaveBeenCalledWith(errorConfig)
      });
  });

  test("if the error intercept refreshToken fails, logout user", () => {
    const correctError = new Error("Token Failed");
    tokenRequest.post.mockRejectedValue(correctError);
    let errorConfig = {
      url: "/api/ping/",
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: ""
      }
    }
    return errorInterceptor({config: errorConfig, response: ERROR_RESPONSE})
      .catch((error)=> {
        expect(error).toEqual(correctError);
      })
      .finally(()=> {
        expect(tokenRequest.post).toHaveBeenCalledWith('/api/token/access/',
          {"refresh": REFRESH_TOKEN}
        );
        expect(errorConfig.headers['Authorization']).toEqual(``)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(REFRESH_TOKEN);
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(ACCESS_TOKEN);
        expect(authRequest.defaults.headers['Authorization']).toEqual("")
      });
  });

});
