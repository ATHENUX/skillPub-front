import { useState } from "react";

//material-UI
import {
  Container,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useNavbarSetting } from "Assets/Styles/navbarStyles";

//i18n
import { useTranslation } from "react-i18next";

const Language = ({ orientation }) => {
  const [language, setlanguage] = useState(localStorage.getItem("language"));
  const { t, i18n } = useTranslation();
  const classes = useNavbarSetting();

  const handleLanguage = (e) => {
    setlanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Container className={classes.container}>
      <Typography variant={orientation ? "h6" : "h3"}>{t("choose.language")}</Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Language"
          name="Language"
          value={language}
          onChange={handleLanguage}
        >
          <FormControlLabel value="es" control={<Radio />} label={t("spanish")} />
          <FormControlLabel value="en" control={<Radio />} label={t("english")} />
        </RadioGroup>
      </FormControl>
    </Container>
  );
};

export default Language;
