import { useState } from "react";
import { connect } from "react-redux";
import { userSettings } from "Redux/Reducers/User";

//material-UI
import {
  TextField,
  Container,
  Button,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useNavbarSetting } from "Assets/Styles/navbarStyles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

//moment
import moment from "moment";

const Account = ({ User, orientation, handleOpenSnackBar, userSettings }) => {
  const [user, setUser] = useState({
    email: User.email,
    gender: User.gender,
  });
  const [selectedDate, setSelectedDate] = useState(User.dateOfBirth);
  const classes = useNavbarSetting();
  const { t } = useTranslation();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const dateOfBirth = moment(selectedDate).format("l");

      if (user.email !== "") {
        const res = await axios.post(
          "/api/accountSettings",
          { ...user, dateOfBirth },
          { headers: { auth: localStorage.getItem("session") } }
        );
        const { success, message } = res.data;
        if (success) {
          handleOpenSnackBar({
            show: true,
            message: t("successful.update"),
            severity: "success",
          });
          userSettings({
            email: user.email,
            gender: user.gender,
            dateOfBirth,
          });
        } else {
          if (message === "Email is required") {
            handleOpenSnackBar({
              show: true,
              message: t("email.message.error.input.required"),
              severity: "error",
            });
          }
        }
      } else {
        handleOpenSnackBar({
          show: true,
          message: t("email.message.error.input.required"),
          severity: "error",
        });
      }
    } catch (error) {
      handleOpenSnackBar({
        show: true,
        message: t("email.message.error.input.required"),
        severity: "error",
      });
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant={orientation ? "h6" : "h3"}>{t("account.settings")}</Typography>
      <form onSubmit={saveUser} className={classes.AccountForm}>
        <TextField
          type="email"
          label={t("email")}
          name="email"
          variant="outlined"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          size="small"
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            orientation={orientation ? "portrait" : "landscape"}
            variant="inline"
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
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <FormControlLabel value="F" control={<Radio />} label={t("gender.female")} />
            <FormControlLabel value="M" control={<Radio />} label={t("gender.male")} />
            <FormControlLabel value="other" control={<Radio />} label={t("gender.other")} />
          </RadioGroup>
        </div>
        <Button type="submit" variant="contained" color="primary">
          {t("save")}
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  User: state.User,
});

const mapDispatchToProps = {
  userSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
