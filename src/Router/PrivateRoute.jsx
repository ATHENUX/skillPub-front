import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const auth = localStorage.getItem("session");

  if (auth) {
    return <Route {...props} />;
  }
  return <Redirect to="/access" />;
};

export default PrivateRoute;
