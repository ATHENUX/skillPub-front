import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

//components
import BackdropSpinner from "Components/spinner/BackdropSpinner";

//axios
import axios from "axiosConfig";

import { constants } from "constants/constants";

const ProtectedRoute = ({ component: Component, user, ...options }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const auth = localStorage.getItem("session");
        const res = await axios.post("/api/validateAccessToken", {
          token: auth,
        });
        setIsLogged(res.data.success);
        if (res.data.status === constants.httpCodes.unauthorized) {
          localStorage.removeItem("session");
        }
        setIsLoading(false);
      } catch (error) {
        localStorage.removeItem("session");
        setIsLoading(false);
      }
    };
    validateToken();
  }, []);

  return (
    <Route {...options}>
      {isLoading ? (
        <BackdropSpinner isLoading={isLoading} />
      ) : isLogged ? (
        <div>{user.state === "missing settings" && <Component />}</div>
      ) : (
        <Redirect to="/access" />
      )}
    </Route>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps)(ProtectedRoute);
