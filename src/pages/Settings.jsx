import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getUserData } from "Redux/Reducers/User";

// material-UI
import { useMediaQuery, useTheme, Stepper, Step, StepLabel, Container } from "@material-ui/core";
import { useSettingsStyles } from "Assets/Styles/settingsStyles";

//components
import StepperuserData from "Components/settings/UserData";
import Skills from "Components/settings/Skills";
import Successful from "Components/settings/Successful";
import BackdropSpinner from "Components/spinner/BackdropSpinner";
import SnackBar from "Components/SnackBar";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

//moment
import moment from "moment";

const Settings = ({ getUserData, user }) => {
  const theme = useTheme();
  const orientation = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useSettingsStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [gender, setGender] = useState("F");
  const [checked, setChecked] = useState(false);
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [snackBar, setSnackBar] = useState({
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  });
  const history = useHistory();
  const { t } = useTranslation();

  const steps = [t("profile.setting"), t("select.skills"), t("successful")];

  const handleFinish = async () => {
    const res = await axios.put(
      "/api/updateUserState",
      {},
      { headers: { auth: localStorage.getItem("session") } }
    );
    if (res.data.success) {
      getUserData(res.data.user);
      history.push("/");
    }
  };

  const handleSnackBarByComponent = (severity, message) => {
    setSnackBar({ ...snackBar, show: true, severity, message });
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, show: false, severity: "error" });
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleGeolocationChecked = () => {
    setChecked(!checked);
    if ("geolocation" in navigator) {
      if (!checked) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      }
    } else {
      setTimeout(() => {
        setSnackBar({
          ...snackBar,
          message: t("geolocation.warning"),
          show: true,
          severity: "warning",
        });
      }, 2000);
    }
  };

  const saveUserData = async (data) => {
    const dateOfBirth = moment(selectedDate).format("l");

    try {
      setIsLoading(true);
      const res = await axios.post(
        "/api/updateUserSettings",
        { ...data, location, gender, dateOfBirth },
        { headers: { auth: localStorage.getItem("session") } }
      );
      setIsLoading(false);
      if (res.data.success) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setSnackBar({ ...snackBar, message: t("internal.server.error.title"), show: true });
      }
    } catch (error) {
      setIsLoading(false);
      setSnackBar({ ...snackBar, message: t("internal.server.error.title"), show: true });
    }
  };

  const saveSkills = async (skills) => {
    try {
      setIsLoading(true);
      const listAptitudes = skills.map((e) => e.id);

      const res = await axios.post(
        "/api/assignAptitudes",
        { listAptitudes },
        { headers: { auth: localStorage.getItem("session") } }
      );
      setIsLoading(false);

      if (res.data.success) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setSnackBar({ ...snackBar, message: t("internal.server.error.title"), show: true });
      }
    } catch (error) {
      setIsLoading(false);
      setSnackBar({ ...snackBar, message: t("internal.server.error.title"), show: true });
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation={orientation ? "vertical" : "horizontal"}>
          {steps.map((label) => {
            const labelProps = {};
            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Container className={classes.container}>
          {activeStep === 0 && (
            <StepperuserData
              saveUserData={saveUserData}
              gender={gender}
              handleChangeGender={handleChangeGender}
              checked={checked}
              handleGeolocationChecked={handleGeolocationChecked}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}

          {activeStep === 1 && (
            <Skills saveSkills={saveSkills} handleSnackBar={handleSnackBarByComponent} />
          )}

          {activeStep === 2 && <Successful finish={handleFinish} />}
        </Container>
      </div>
      <SnackBar snackBar={snackBar} handleClose={handleCloseSnackBar} />
      <BackdropSpinner isLoading={isLoading} />
    </>
  );
};

const mapDispatchToProps = {
  getUserData,
};
export default connect(null, mapDispatchToProps)(Settings);
