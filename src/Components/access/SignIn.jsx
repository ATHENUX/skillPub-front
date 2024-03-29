import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserData } from "Redux/Reducers/User";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

//material-UI
import {
  Typography,
  TextField,
  Button,
  Hidden,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useAccessStyle } from "Assets/Styles/accessStyles";
import useCustomStyles from "Assets/Styles/CustomStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//components
import Social from "./Social";
import RecoverPassword from "./RecoverPassword";
import SnackBar from "Components/SnackBar";
import BackdropSpinner from "Components/spinner/BackdropSpinner";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

//hooks
import getUser from "helpers/getUser";

const SignIn = ({ changeAccess, getUserData }) => {
  const initialSnackBarProps = {
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  };
  const [values, setValues] = useState(false);
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
      const res = await axios.post("/api/signIn", { email, password });
      setIsLoading(false);
      const { success, token, message } = res.data;
      if (success) {
        localStorage.setItem("session", token);
        await getUser(getUserData);
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

  const handleClickShowPassword = () => {
    setValues(!values);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            type={values ? "text" : "password"}
            name="password"
            label={t("password")}
            variant="outlined"
            size="small"
            error={Boolean(errors?.password)}
            inputRef={register({
              required: { value: true, message: t("password.message.error.input.required") },
              minLength: { value: 6, message: t("password.message.error.input.short") },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" size="small">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                  >
                    {values ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className={customStyles.messageInput}>{errors?.password?.message}</div>

          <RecoverPassword />

          <Button type="submit" variant="contained" color="primary" className={classes.Button}>
            {t("log.in")}
          </Button>
        </form>
      </div>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
      <BackdropSpinner isLoading={isLoading} />
    </>
  );
};

const mapDispatchToProps = {
  getUserData,
};

export default connect(null, mapDispatchToProps)(SignIn);
