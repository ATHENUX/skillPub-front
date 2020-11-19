import { useState } from "react";
import { useHistory } from "react-router-dom";

//material ui
import { Typography, TextField, Button, Hidden } from "@material-ui/core";
import { useAccessStyle } from "Assets/Styles/accessStyles";
import useCustomStyles from "Assets/Styles/CustomStyles";

//react-form
import { useForm } from "react-hook-form";

//components
import Social from "./Social";
import SnackBar from "./SnackBar";
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
      const res = await axios.post("/api/signUp", { email, password, firstName, lastName });
      setIsLoading(false);
      const { success, token, message } = res.data;
      if (success) {
        localStorage.setItem("session", token);
        //redirect to "create initial settings"
        return history.push("/settings");
      } else {
        if (message === "Email is already registered") {
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

  const handleopenBackDrop = (value) => {
    setIsLoading(value);
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
          <Social handleopenBackDrop={handleopenBackDrop} validateAccess="signUp" />
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

          <Button type="submit" variant="contained" color="primary" className={classes.Button}>
            {t("sign.up")}
          </Button>
        </form>
      </div>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
      <BackdropSpinner isLoading={isLoading} />
    </>
  );
};

export default SignUp;
