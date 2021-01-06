import { call, put, takeEvery } from "redux-saga/effects";
import { responseCorrection } from "../actions/correction";
import { SPELL_CORRECTION } from "../actions/constants";
import { callCorrection } from "../apis/corection";

function* callSagaCorrection(action) {
  try {
    const response = yield call(callCorrection, action.data);
    yield put(responseCorrection(response));
  } catch (error) {
    console.log(error);
  }
}

export function* watchSagaCorrection() {
  yield takeEvery(SPELL_CORRECTION, callSagaCorrection);
}
