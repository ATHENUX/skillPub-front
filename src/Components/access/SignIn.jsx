import { Typography, TextField, Button, Link, Hidden } from "@material-ui/core";
import { useAccessStyleTheme } from "Assets/Styles/accessStyles";

//components
import Social from "./Social";

//i18n
import { useTranslation } from "react-i18next";

const SignIn = ({ changeAccess }) => {
  const { t } = useTranslation();
  const classes = useAccessStyleTheme();

  return (
    <div className={classes.signInContainer}>
      <form className={`${classes.formStyle} ${!changeAccess ? classes.hideSingIn : ""}`}>
        <Hidden xsDown>
          <Typography variant="h3">{t("sign.in")}</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h6">{t("sign.in")}</Typography>
        </Hidden>
        <Social />
        <Typography variant="caption">{t("use.accounts")}</Typography>
        <TextField type="email" id="Email" label={t("email")} variant="outlined" size="small" />
        <TextField type="password" id="password" label={t("password")} variant="outlined" size="small" />
        <div className={classes.link}>
          <Link href="#">{t("recover.account")}</Link>
        </div>
        <Button variant="contained" color="primary">
          {t("sign.in")}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
