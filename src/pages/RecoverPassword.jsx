import { useState, useEffect } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

//material-UI
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useRecoverPasswordStyle } from "Assets/Styles/recoverPasswordStyles";
import useCustomStyles from "Assets/Styles/CustomStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//components
import SnackBar from "Components/SnackBar";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

//hooks
import useSEO from "Hooks/useSEO";
import useLanguageBrowser from "Hooks/useLanguageBrowser";

const Recoverpassword = () => {
  const [snackBar, setSnackBar] = useState({
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  });
  const theme = useTheme();
  const orientation = useMediaQuery(theme.breakpoints.down("xs"));
  const { userID } = useParams();
  const [value, setValue] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const customStyles = useCustomStyles();
  const { register, handleSubmit, errors } = useForm();
  const classes = useRecoverPasswordStyle();
  const history = useHistory();
  const { t } = useTranslation();

  useSEO({ title: "forgot password", description: "Change password" });
  useLanguageBrowser();

  useEffect(() => {
    (async () => {
      const res = await axios.post("/api/validateUser", { id: userID });
      const { user } = res.data;

      if (user.state !== "recover password") {
        history.push("/access");
      }
    })();
  }, [userID, history]);

  const handleClickShowPassword = () => {
    setValue(!value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setSnackBar({ ...snackBar, show: false });
  };

  const handleChangePassword = async (data) => {
    const res = await axios.post("/api/modifyRecoverPassword", { pass: data.password, id: userID });
    const { success } = res.data;
    if (success) {
      setSnackBar({
        ...snackBar,
        message: t("successful.update"),
        severity: "success",
        show: true,
      });
      setShowBtn(true);
    } else {
      setSnackBar({
        ...snackBar,
        message: t("internal.server.error.title"),
        severity: "error",
        show: true,
      });
    }
  };

  return (
    <>
      <Grid container direction="row" alignItems="center" justify="center" className={classes.root}>
        <Grid item>
          <Paper className={classes.paper} elevation={0}>
            {showBtn ? (
              <Button variant="contained" color="primary" component={RouterLink} to="/access">
                {t("go.login")}
              </Button>
            ) : (
              <>
                <Typography variant={orientation ? "h6" : "h3"} color="textSecondary">
                  <b>{t("new.password")}</b>
                </Typography>
                <form onSubmit={handleSubmit(handleChangePassword)} className={classes.form}>
                  <div>
                    <TextField
                      type={value ? "text" : "password"}
                      name="password"
                      label={t("password")}
                      variant="outlined"
                      size="small"
                      error={Boolean(errors?.password)}
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
                              {value ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      inputRef={register({
                        required: {
                          value: true,
                          message: t("password.message.error.input.required"),
                        },
                        minLength: { value: 6, message: t("password.message.error.input.short") },
                      })}
                    />
                    <div className={customStyles.messageInput}>{errors?.password?.message}</div>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.marginTop}
                  >
                    {t("save")}
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
    </>
  );
};

export default Recoverpassword;
