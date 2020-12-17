import { useState } from "react";
import { connect } from "react-redux";

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

//moment
import moment from "moment";

const Account = ({ User, orientation }) => {
  const [user, setUser] = useState({
    email: User.email,
    gender: User.gender,
  });
  const [selectedDate, setSelectedDate] = useState(User.dateOfBirth);
  const classes = useNavbarSetting();
  const { t } = useTranslation();

  const saveUser = (e) => {
    e.preventDefault();
    const dateOfBirth = moment(selectedDate).format("l");
    console.log(user);
    console.log(dateOfBirth);
  };

  return (
    <Container className={classes.container}>
      <Typography variant={orientation ? "h6" : "h3"}>Account settings</Typography>
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

export default connect(mapStateToProps)(Account);
