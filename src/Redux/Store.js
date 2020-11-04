import { createStore, combineReducers } from "redux";

//reducers
import User from "./Reducers/User";
import ThemeMode from "./Reducers/ThemeMode";
import Spinner from "./Reducers/spinners";

const reducer = combineReducers({
  User,
  ThemeMode,
  Spinner,
});

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, composeEnhancers);

export default store;
