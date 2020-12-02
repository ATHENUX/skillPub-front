import { useEffect, useState } from "react";

//constants
import { constants } from "constants/constants";

//axios
import axios from "axiosConfig";

export const useValidateAuth = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const validateToken = async () => {
      try {
        const auth = localStorage.getItem("session");
        const res = await axios.post("/api/validateAccessToken", {
          token: auth,
        });
        if (res.data.status === constants.httpCodes.unauthorized) {
          localStorage.removeItem("session");
        }
        setIsLogged(res.data.success);
      } catch (error) {
        localStorage.removeItem("session");
        console.log(error);
      }
    };
    validateToken();
  }, []);
  return isLogged;
};
