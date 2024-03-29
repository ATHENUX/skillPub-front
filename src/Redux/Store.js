import { createStore, combineReducers } from "redux";

//reducers
import User from "./Reducers/User";
import Posts from "./Reducers/Posts";
import ThemeMode from "./Reducers/ThemeMode";
import SearchedUsers from "./Reducers/SearchedUsers";

const reducer = combineReducers({
  User,
  ThemeMode,
  Posts,
  SearchedUsers,
});

const composeEnhancers =
  process.env.NODE_ENV !== "production"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : "";

const store = createStore(reducer, composeEnhancers);

export default store;
