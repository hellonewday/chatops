import {
  LOGIN_USER,
  REGISTER_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
} from "./constants";
export const requestRegister = (data) => {
  return {
    type: REGISTER_USER,
    data,
  };
};

export const responseRegister = (response) => {
  return {
    type: REGISTER_USER_SUCCESS,
    response,
  };
};

export const requestLogin = (data) => { 
  return {
    type: LOGIN_USER,
    data,
  };
};

export const responseLogin = (response) => {
  return {
    type: LOGIN_USER_SUCCESS,
    response,
  };
};
