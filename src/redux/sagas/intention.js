import { call, put, takeEvery } from "redux-saga/effects";
import { responseIntention } from "../actions/intention";
import { callIntention } from "../apis/intention";
import { INTENT_DETECTION } from "../actions/constants";

function* callSagaIntention(action) {
  try {
    const response = yield call(callIntention, action.data);
    yield put(responseIntention(response));
  } catch (error) {
    console.log(error);
  }
}

export function* watchSagaIntention() {
  yield takeEvery(INTENT_DETECTION, callSagaIntention);
}
