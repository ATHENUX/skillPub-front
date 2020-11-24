import { useState } from "react";
import { useHistory } from "react-router-dom";

// material ui
import { useMediaQuery, useTheme, Stepper, Step, StepLabel, Container } from "@material-ui/core";
import { useSettingsStyles } from "Assets/Styles/settingsStyles";
import moment from "moment";

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

const Settings = () => {
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

  const steps = ["Select your tastes", "Select your skills", "successful"];

  const handleFinish = () => {
    history.push("/");
  };

  const handleClose = () => {
    setSnackBar({ ...snackBar, show: false });
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChecked = () => {
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
      console.info("geolocation not available");
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
              handleChecked={handleChecked}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}

          {activeStep === 1 && <Skills saveSkills={saveSkills} />}

          {activeStep === 2 && <Successful finish={handleFinish} />}
        </Container>
      </div>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
      <BackdropSpinner isLoading={isLoading} />
    </>
  );
};

export default Settings;
