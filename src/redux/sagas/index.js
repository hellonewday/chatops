import { all } from "redux-saga/effects";
import {
  watchSagaLogin,
  watchSagaRegister,
  watchSagaRetrieveUser,
} from "./accounts";
import { watchSagaCorrection } from "./correction";
import { watchSagaIntention } from "./intention";
export default function* rootSagas() {
  yield all([
    watchSagaLogin(),
    watchSagaRegister(),
    watchSagaCorrection(),
    watchSagaIntention(),
    watchSagaRetrieveUser(),
  ]);
}
