import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "Assets/Styles/index.css";
import App from "Router/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "Redux/Store";

//i18n
import "I18n";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
