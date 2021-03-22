import { call, put, takeLatest } from "redux-saga/effects";
import {
  responseRegister,
  responseLogin,
  responseUser,
  responseEdit,
} from "../actions/accounts";
import {
  EDIT_USER,
  LOGIN_USER,
  REGISTER_USER,
  RETRIEVE_USER,
} from "../actions/constants";
import {
  callEditUser,
  callLogin,
  callRegister,
  callUser,
} from "../apis/accounts";

function* callSagaRegister(action) {
  try {
    const response = yield call(callRegister, action.data);
    yield put(responseRegister(response));
  } catch (error) {
    console.log(error);
  }
}

function* callSagaLogin(action) {
  try {
    const response = yield call(callLogin, action.data);
    yield put(responseLogin(response));
  } catch (error) {
    console.log(error);
  }
}

function* callRetrieveUser(action) {
  try {
    const response = yield call(callUser, action.data);
    yield put(responseUser(response));
  } catch (error) {
    console.log(error);
  }
}

function* callEdit(action) {
  try {
    const response = yield call(callEditUser, action.data);
    yield put(responseEdit(response));
  } catch (error) {
    console.log(error);
  }
}

export function* watchSagaRegister() {
  yield takeLatest(REGISTER_USER, callSagaRegister);
}

export function* watchSagaLogin() {
  yield takeLatest(LOGIN_USER, callSagaLogin);
}

export function* watchSagaRetrieveUser() {
  yield takeLatest(RETRIEVE_USER, callRetrieveUser);
}

export function* watchSagaEditUser() {
  yield takeLatest(EDIT_USER, callEdit);
}
