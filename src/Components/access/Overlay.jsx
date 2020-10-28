import { Typography, Button } from "@material-ui/core";
import { useAccessStyleTheme } from "Assets/Styles/accessStyles";

//i18n
import { useTranslation } from "react-i18next";

const Overlay = ({ changeAccess, handleChangeAccess }) => {
  const { t } = useTranslation();
  const classes = useAccessStyleTheme();

  return (
    <div className={`${classes.overlayContainer}`}>
      <div className={`${classes.overlay} ${!changeAccess ? classes.overlayChange : ""}`}>
        <div className={`${classes.overlayPanel} ${changeAccess ? classes.overlaySwitchPanel : ""} `}>
          <Typography variant="h4">{t("hello.friend")}</Typography>
          <p>{t("system.message.good")}</p>
          <Button variant="outlined" color="inherit" id="signUp" onClick={() => handleChangeAccess(false)}>
            {t("sign.up")}
          </Button>
        </div>

        <div className={`${classes.overlayPanel} ${!changeAccess ? classes.overlaySwitchPanel : ""} `}>
          <Typography variant="h4">{t("welcome.back")}</Typography>
          <p>{t("system.message")}</p>
          <Button variant="outlined" color="inherit" id="signIn" onClick={() => handleChangeAccess(true)}>
            {t("sign.in")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
