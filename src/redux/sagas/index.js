import { all } from "redux-saga/effects";
import { watchSagaLogin, watchSagaRegister } from "./accounts";
import { watchSagaCorrection } from "./correction";
import { watchSagaIntention } from "./intention";
export default function* rootSagas() {
  yield all([
    watchSagaLogin(),
    watchSagaRegister(),
    watchSagaCorrection(),
    watchSagaIntention(),
  ]);
}
