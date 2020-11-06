import { useState } from "react";
import { useHistory } from "react-router-dom";

//material ui
import { Typography, TextField, Button, Hidden, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useAccessStyle } from "Assets/Styles/accessStyles";
import useCustomStyles from "Assets/Styles/CustomStyles";

//react-form
import { useForm } from "react-hook-form";

//components
import Social from "./Social";
import RecoverPassword from "./RecoverPassword";
import BackdropSpinner from "Components/spinner/BackdropSpinner";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const SignIn = ({ changeAccess }) => {
  const initialSnackBarProps = {
    show: false,
    message: "",
  };
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const classes = useAccessStyle();
  const customStyles = useCustomStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      setIsLoading(true);
      const res = await axios.post("/signIn", { email, password });
      setIsLoading(false);
      const { success, token, message } = res.data;
      if (success) {
        localStorage.setItem("session", token);
        return history.push("/");
      } else {
        if (message === "Email not found") {
          initialSnackBarProps.message = t("email.message.error");
        } else {
          initialSnackBarProps.message = t("password.message.error");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("error: =>", error);
      initialSnackBarProps.message = t("internal.server.error.title");
    }
    setSnackBar({
      ...initialSnackBarProps,
      show: true,
    });
  };

  const handleClose = () => {
    setSnackBar(initialSnackBarProps);
  };

  const handleopenBackDrop = (value) => {
    setIsLoading(value);
  };

  return (
    <>
      <div className={classes.signInContainer}>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className={`${classes.formStyle} ${!changeAccess ? classes.hideSingIn : ""}`}
        >
          <Hidden xsDown>
            <Typography variant="h3">{t("sign.in")}</Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h6">{t("sign.in")}</Typography>
          </Hidden>
          <Social handleopenBackDrop={handleopenBackDrop} validateAccess="signIn" />
          <Typography variant="caption">{t("use.accounts")}</Typography>

          <TextField
            type="email"
            name="email"
            label={t("email")}
            variant="outlined"
            size="small"
            error={Boolean(errors?.email)}
            inputRef={register({
              required: { value: true, message: t("email.message.error.input.required") },
            })}
          />
          <div className={customStyles.messageInput}>{errors?.email?.message}</div>
          <TextField
            type="password"
            name="password"
            label={t("password")}
            variant="outlined"
            size="small"
            error={Boolean(errors?.password)}
            inputRef={register({
              required: { value: true, message: t("password.message.error.input.required") },
              minLength: { value: 6, message: t("password.message.error.input.short") },
            })}
          />
          <div className={customStyles.messageInput}>{errors?.password?.message}</div>

          <RecoverPassword />

          <Button type="submit" variant="contained" color="primary" className={classes.Button}>
            {t("log.in")}
          </Button>
        </form>
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
      <BackdropSpinner isLoading={isLoading} />
    </>
  );
};

export default SignIn;
