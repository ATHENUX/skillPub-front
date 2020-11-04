import { useState } from "react";
import { useHistory } from "react-router-dom";
//material ui
import { Typography, TextField, Button, Link, Hidden, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useAccessStyle } from "Assets/Styles/accessStyles";
import CustomStyles from "Assets/Styles/CustomStyles";

//react-form
import { useForm } from "react-hook-form";

//components
import Social from "./Social";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

//react & redux
import { connect } from "react-redux";
import { changeShowSpinner } from "Redux/Reducers/spinners";

const SignIn = ({ changeAccess, changeShowSpinner }) => {
  const initialSnackBarProps = {
    show: false,
    message: "",
  };
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const { register, handleSubmit, errors } = useForm();
  const classes = useAccessStyle();
  const customStyles = CustomStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      changeShowSpinner(true);
      const res = await axios.post("/signIn", { email, password });
      setTimeout(() => {
        changeShowSpinner(false);
      }, 3000);
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
      console.error("error: =>", error);
      initialSnackBarProps.message = t("internal.server.error.title");
    }
    setSnackBar({
      ...initialSnackBarProps,
      show: true,
    });
  };

  const handleClose = () => {
    setSnackBar({ ...initialSnackBarProps, show: false });
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
              required: { value: true, message: "email is required" },
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
              required: { value: true, message: "password is required" },
              minLength: { value: 6, message: "contreseña pequeña" },
            })}
          />
          <div className={customStyles.messageInput}>{errors?.password?.message}</div>

          <div className={classes.link}>
            <Link href="#">{t("recover.account")}</Link>
          </div>
          <Button type="submit" variant="contained" color="primary">
            {t("sign.in")}
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
    </>
  );
};

const mapDispatchToProps = {
  changeShowSpinner,
};

export default connect(null, mapDispatchToProps)(SignIn);
