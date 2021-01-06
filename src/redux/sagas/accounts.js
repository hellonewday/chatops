import { call, put, takeLatest } from "redux-saga/effects";
import { responseRegister, responseLogin } from "../actions/accounts";
import { LOGIN_USER, REGISTER_USER } from "../actions/constants";
import { callLogin, callRegister } from "../apis/accounts";

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

export function* watchSagaRegister() {
  yield takeLatest(REGISTER_USER, callSagaRegister);
}

export function* watchSagaLogin() {
  yield takeLatest(LOGIN_USER, callSagaLogin);
}
