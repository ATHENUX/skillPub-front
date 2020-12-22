import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

//material-UI
import {
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
} from "@material-ui/core";
import { useNavbarSetting } from "Assets/Styles/navbarStyles";
import useCustomStyles from "Assets/Styles/CustomStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const Password = ({ orientation, handleOpenSnackBar }) => {
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [repeatNewPassword, setRepeatNewPassword] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm();
  const refPassword = useRef({});
  refPassword.current = watch("newPassword", "");
  const { t } = useTranslation();
  const classes = useNavbarSetting();
  const customStyles = useCustomStyles();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async (data) => {
    const res = await axios.post(
      "/api/changePassword",
      { ...data },
      { headers: { auth: localStorage.getItem("session") } }
    );

    const { success, message } = res.data;

    if (success) {
      handleOpenSnackBar({
        show: true,
        message: t("successful.update"),
        severity: "success",
      });
    } else {
      switch (message) {
        case "New password is not valid":
          handleOpenSnackBar({
            show: true,
            message: t("newPassword.invalid"),
            severity: "error",
          });
          break;
        case "The current password is incorrect":
          handleOpenSnackBar({
            show: true,
            message: t("current.password.message"),
            severity: "error",
          });
          break;
        default:
          handleOpenSnackBar({
            show: true,
            message: t("internal.server.error.title"),
            severity: "error",
          });
          break;
      }
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant={orientation ? "h6" : "h3"}>{t("password")}</Typography>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <TextField
          type={currentPassword ? "text" : "password"}
          name="currentPassword"
          label={t("current.password")}
          variant="outlined"
          size="small"
          className={classes.margin}
          error={Boolean(errors?.currentPassword)}
          inputRef={register({
            required: { value: true, message: t("password.message.error.input.required") },
            minLength: { value: 6, message: t("password.message.error.input.short") },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" size="small">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setCurrentPassword(!currentPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {currentPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={customStyles.messageInput}>{errors?.currentPassword?.message}</div>
        <Divider />

        <div className={classes.newPassword}>
          <div>
            <TextField
              type={newPassword ? "text" : "password"}
              name="newPassword"
              label={t("new.password")}
              variant="outlined"
              size="small"
              className={classes.margin}
              error={Boolean(errors?.currentPassword)}
              inputRef={register({
                required: { value: true, message: t("password.message.error.input.required") },
                minLength: { value: 6, message: t("password.message.error.input.short") },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" size="small">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setNewPassword(!newPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                    >
                      {newPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={customStyles.messageInput}>{errors?.newPassword?.message}</div>
          </div>
          <div>
            <TextField
              type={repeatNewPassword ? "text" : "password"}
              name="repeatNewPassword"
              label={t("repeat.new.password")}
              variant="outlined"
              size="small"
              className={classes.margin}
              error={Boolean(errors?.currentPassword)}
              inputRef={register({
                required: { value: true, message: t("password.message.error.input.required") },
                minLength: { value: 6, message: t("password.message.error.input.short") },
                validate: (value) => value === refPassword.current || t("repeat.password.message"),
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" size="small">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setRepeatNewPassword(!repeatNewPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                    >
                      {repeatNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={customStyles.messageInput}>{errors?.repeatNewPassword?.message}</div>
          </div>
        </div>

        <Button type="submit" variant="contained" color="primary" className={classes.margin}>
          {t("save")}
        </Button>
      </form>
    </Container>
  );
};

export default Password;
