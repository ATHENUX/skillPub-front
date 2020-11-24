import { useState } from "react";

//material ui
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  InputAdornment,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useSettingsStyles } from "Assets/Styles/settingsStyles";
import useCustomStyles from "Assets/Styles/CustomStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import DateFnsUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

//react-form
import { useForm } from "react-hook-form";

//i18n
import { useTranslation } from "react-i18next";

const StepperuserData = ({
  saveUserData,
  gender,
  handleChangeGender,
  checked,
  handleGeolocationChecked,
  selectedDate,
  setSelectedDate,
}) => {
  const theme = useTheme();
  const orientation = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useSettingsStyles();
  const customStyles = useCustomStyles();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card elevation={0}>
      <CardContent className={classes.cardContent}>
        <div>
          <Typography>{t("enter.data")}</Typography>
          <Divider />
        </div>
        <form onSubmit={handleSubmit(saveUserData)} className={classes.formStyle}>
          <TextField
            type={showPassword ? "text" : "password"}
            name="password"
            label={t("password")}
            variant="outlined"
            size="small"
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputRef={register({
              required: { value: true, message: t("password.message.error.input.required") },
              minLength: { value: 6, message: t("password.message.error.input.short") },
            })}
          />
          <div className={customStyles.messageInput}>{errors?.password?.message}</div>

          <TextField
            type="number"
            name="phone"
            label={t("phone")}
            variant="outlined"
            size="small"
            inputRef={register}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              orientation={orientation ? "portrait" : "landscape"}
              variant="inline"
              name="dateOfBirth"
              label={t("birth.date")}
              format="DD-MM-YYYY"
              maxDate={new Date()}
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </MuiPickersUtilsProvider>

          <div>
            <FormLabel component="legend">{t("gender")}</FormLabel>
            <RadioGroup
              aria-label={t("gender")}
              name="gender"
              value={gender}
              onChange={handleChangeGender}
            >
              <FormControlLabel value="F" control={<Radio />} label={t("gender.female")} />
              <FormControlLabel value="M" control={<Radio />} label={t("gender.male")} />
              <FormControlLabel value="other" control={<Radio />} label={t("gender.other")} />
            </RadioGroup>
          </div>

          <Card elevation={0} className={classes.constrastCard}>
            <CardContent className={classes.locationContainer}>
              <Typography>{t("location")}</Typography>
              <Switch
                checked={checked}
                onChange={handleGeolocationChecked}
                name="checked"
                color="primary"
              />
            </CardContent>
          </Card>

          <Button type="submit" variant="contained" color="primary" className={classes.spacingTop}>
            {t("save")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StepperuserData;
