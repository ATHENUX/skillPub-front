import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

//components
import BackdropSpinner from "Components/spinner/BackdropSpinner";

//axios
import axios from "axiosConfig";

import { constants } from "constants/constants";

const PrivateRoute = ({ component: Component, ...options }) => {
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
        <Component />
      ) : (
        <Redirect to="/access" />
      )}
    </Route>
  );
};

export default PrivateRoute;
