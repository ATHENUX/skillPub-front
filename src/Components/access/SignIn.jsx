import { useState } from "react";
import { useHistory } from "react-router-dom";

//material ui
import {
  Typography,
  TextField,
  Button,
  Hidden,
  Snackbar,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useAccessStyle } from "Assets/Styles/accessStyles";
import useCustomStyles from "Assets/Styles/CustomStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
  const [values, setValues] = useState(false);
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const classes = useAccessStyle();
  const customStyles = useCustomStyles();
  const history = useHistory();
  const { t } = useTranslation();

  console.log(errors?.password);

  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      setIsLoading(true);
      const res = await axios.post("/signIn", { email, password });
      setIsLoading(false);
      const { success } = res.data;
      if (success) {
        localStorage.setItem("session", res.data.token);
        history.push("/");
        return;
      } else {
        if (res.data.message === "Email not found") {
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

  const handleChange = (prop) => (event) => {
    setValues(values);
  };

  const handleClickShowPassword = () => {
    setValues(!values);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          <Social />
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
          <FormControl className={classes.formStylePassword} size="small" variant="outlined">
            <InputLabel error={Boolean(errors?.password)} htmlFor="outlined-adornment-password">
              {t("password")}
            </InputLabel>
            <OutlinedInput
              className={classes.passwordInput}
              id="outlined-adornment-password"
              type={values ? "text" : "password"}
              name="password"
              onChange={handleChange("password")}
              labelWidth={70}
              error={Boolean(errors?.password)}
              endAdornment={
                <InputAdornment position="end" size="small">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputRef={register({
                required: { value: true, message: t("password.message.error.input.required") },
                minLength: { value: 6, message: t("password.message.error.input.short") },
              })}
            />
          </FormControl>
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
