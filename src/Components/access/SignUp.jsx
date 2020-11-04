import { Typography, TextField, Button, Hidden } from "@material-ui/core";
import { useAccessStyle } from "Assets/Styles/accessStyles";

//components
import Social from "./Social";

//i18n
import { useTranslation } from "react-i18next";

const SignUp = ({ changeAccess }) => {
  const { t } = useTranslation();
  const classes = useAccessStyle();

  return (
    <div className={`${classes.signUpContainer} ${!changeAccess ? classes.showSingUp : ""}`}>
      <form className={classes.formStyle}>
        <Hidden xsDown>
          <Typography variant="h4">{t("create.account")}</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h6">{t("create.account")}</Typography>
        </Hidden>
        <Social />
        <span>{t("use.account.register")}</span>
        <TextField label={t("user.name")} variant="outlined" size="small" />
        <TextField label={t("first.name")} variant="outlined" size="small" />
        <TextField label={t("last.name")} variant="outlined" size="small" />
        <TextField label={t("email")} type="email" variant="outlined" size="small" />
        <TextField label={t("password")} type="password" variant="outlined" size="small" />
        <Button variant="contained" color="primary">
          {t("sign.up")}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
