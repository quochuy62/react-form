import {combineReducers,createStore } from "redux"
import { studentReducer } from "./reducer/reducer";

const rootReducer = combineReducers({
  countReducer: (state = 10, action) => {
    if (action.type === "TANG_GIAM_COUNT") {
        state += action.payload;
      }
    return state;
  },
  studentReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

