import { useState } from "react";
import { useHistory } from "react-router-dom";

//material ui
import { Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useAccessStyle } from "Assets/Styles/accessStyles";

//svg
import google from "Assets/img/svg/google.svg";
import facebook from "Assets/img/svg/facebook.svg";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

//google & facebook
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Social = ({ handleopenBackDrop, validateAccess }) => {
  const initialSnackBarProps = {
    show: false,
    message: "",
  };
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const classes = useAccessStyle();
  const history = useHistory();
  const { t } = useTranslation();

  const responseGoogle = async (response) => {
    try {
      handleopenBackDrop(true);
      const res = await axios.post("/googleAccess", { tokenId: response.tokenId, validateAccess });
      handleopenBackDrop(false);
      const { success, message, token } = res.data;
      if (success) {
        if (message === "User found") {
          localStorage.setItem("session", token);
          return history.push("/");
        } else {
          //redirect to "create initial settings"
          localStorage.setItem("session", token);
          return history.push("/");
        }
      } else {
        if (message === "Email not found") {
          initialSnackBarProps.message = t("email.message.error");
        } else if (message === "Email is already registered") {
          initialSnackBarProps.message = t("email.message.error.registered");
        } else if (message === "Unverified email") {
          initialSnackBarProps.message = t("email.message.error.unverified");
        } else {
          throw new Error("internal server error");
        }
      }
    } catch (error) {
      handleopenBackDrop(false);
      initialSnackBarProps.message = t("internal.server.error.title");
      console.error(error);
    }
    setSnackBar({ ...initialSnackBarProps, show: true });
  };

  const responseErrorGoogle = (response) => {
    console.error(("errors: ", response));
  };

  const responseFacebook = async (response) => {
    if (response.status === "unknown") return;
    try {
      handleopenBackDrop(true);
      const res = await axios.post("/facebookAccess", {
        accessToken: response.accessToken,
        userId: response.userID,
        validateAccess,
      });
      handleopenBackDrop(false);
      const { success, message, token } = res.data;
      if (success) {
        if (message === "User found") {
          localStorage.setItem("session", token);
          return history.push("/");
        } else {
          //redirect to "create initial settings"
          localStorage.setItem("session", token);
          return history.push("/");
        }
      } else {
        if (message === "Email not found") {
          initialSnackBarProps.message = t("email.message.error");
        } else if (message === "Email is already registered") {
          initialSnackBarProps.message = t("email.message.error.registered");
        } else {
          throw new Error("internal server error");
        }
      }
    } catch (error) {
      handleopenBackDrop(false);
      initialSnackBarProps.message = t("internal.server.error.title");
      console.error(error);
    }
    setSnackBar({ ...initialSnackBarProps, show: true });
  };

  const handleClose = () => {
    setSnackBar(initialSnackBarProps);
  };

  return (
    <>
      <div className={classes.socialContainer}>
        <GoogleLogin
          clientId="920347174932-jom43a4j0cqa05rgjri2pvo0nrcogvhm.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              aria-label="like"
              size="small"
            >
              <img src={google} alt="google" className={classes.images} />
            </Button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        />

        <FacebookLogin
          appId="716647445609370"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} aria-label="like" size="small">
              <img src={facebook} alt="facebook" className={classes.images} />
            </Button>
          )}
        />
      </div>
      <Snackbar
        open={snackBar.show}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          {snackBar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Social;
