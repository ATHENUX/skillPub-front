import { useState } from "react";

// material ui
import { useMediaQuery, useTheme, Stepper, Step, StepLabel, Typography } from "@material-ui/core";
import { useSettingsStyles } from "Assets/Styles/settingsStyles";

//components
import StepperuserData from "Components/settings/UserData";

//axios
import axios from "axiosConfig";

const getSteps = () => {
  return ["Select your tastes", "Select ypur skills", "join groups"];
};

const Settings = () => {
  const theme = useTheme();
  const orientation = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useSettingsStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [gender, setGender] = useState("F");
  const [checked, setChecked] = useState(false);
  const [location, setLocation] = useState({});
  const steps = getSteps();

  // const handleFinish = () => {
  //   console.log("finalizacion");
  // };

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
      //alert
      console.log("geolocation not available");
    }
  };

  const saveUserData = async (data) => {
    const res = await axios.post(
      "/api/updateUserSettings",
      { ...data, location, gender },
      { headers: { auth: localStorage.getItem("session") } }
    );
    if (res.data.success) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      //alert errors
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation={orientation ? "vertical" : "horizontal"}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (index === 2) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === 0 && (
        <StepperuserData
          saveUserData={saveUserData}
          gender={gender}
          handleChangeGender={handleChangeGender}
          checked={checked}
          handleChecked={handleChecked}
        />
      )}
    </div>
  );
};

export default Settings;
