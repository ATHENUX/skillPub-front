import { useState } from "react";
import { useHistory } from "react-router-dom";

//material ui
import {
  Typography,
  TextField,
  Button,
  Hidden,
  Snackbar,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
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
import BackdropSpinner from "Components/spinner/BackdropSpinner";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const SignUp = ({ changeAccess }) => {
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

  const handleSignUp = async (data) => {
    const { email, password, firstName, lastName } = data;
    try {
      setIsLoading(true);
      const res = await axios.post("/signUp", { email, password, firstName, lastName });
      setIsLoading(false);
      const { success } = res.data;
      if (success) {
        localStorage.setItem("session", res.data.token);
        //redirect to "create initial settings"
        history.push("/");
        return;
      } else {
        if (res.data.message === "Email is already registered") {
          initialSnackBarProps.message = t("email.message.error.registered");
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
      <div className={`${classes.signUpContainer} ${!changeAccess ? classes.showSingUp : ""}`}>
        <form onSubmit={handleSubmit(handleSignUp)} className={classes.formStyle}>
          <Hidden xsDown>
            <Typography variant="h4">{t("create.account")}</Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h6">{t("create.account")}</Typography>
          </Hidden>
          <Social />
          <span>{t("use.account.register")}</span>
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
            name="firstName"
            label={t("first.name")}
            variant="outlined"
            size="small"
            error={Boolean(errors?.firstName)}
            inputRef={register({
              required: { value: true, message: t("first.name.error.input.required") },
            })}
          />
          <div className={customStyles.messageInput}>{errors?.firstName?.message}</div>

          <TextField
            name="lastName"
            label={t("last.name")}
            variant="outlined"
            size="small"
            error={Boolean(errors?.lastName)}
            inputRef={register({
              required: { value: true, message: t("last.name.error.input.required") },
            })}
          />
          <div className={customStyles.messageInput}>{errors?.lastName?.message}</div>
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

          <Button type="submit" variant="contained" color="primary" className={classes.Button}>
            {t("sign.up")}
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

export default SignUp;
