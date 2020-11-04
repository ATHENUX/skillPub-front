import { useState } from "react";
import { Typography, TextField, Button, Link, Hidden } from "@material-ui/core";
import { useAccessStyleTheme } from "Assets/Styles/accessStyles";

//components
import Social from "./Social";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const SignIn = ({ changeAccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useAccessStyleTheme();
  const { t } = useTranslation();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/signIn", { email, password });
      const { success } = res.data;
      if (success) {
        // localStorage.setItem("session");
        console.log(res.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log("eerorr", error);
    }
  };

  return (
    <div className={classes.signInContainer}>
      <form onSubmit={handleSignIn} className={`${classes.formStyle} ${!changeAccess ? classes.hideSingIn : ""}`}>
        <Hidden xsDown>
          <Typography variant="h3">{t("sign.in")}</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h6">{t("sign.in")}</Typography>
        </Hidden>
        <Social />
        <Typography variant="caption">{t("use.accounts")}</Typography>
        <TextField type="email" id="Email" label={t("email")} variant="outlined" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField type="password" id="password" label={t("password")} variant="outlined" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className={classes.link}>
          <Link href="#">{t("recover.account")}</Link>
        </div>
        <Button type="submit" variant="contained" color="primary">
          {t("sign.in")}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
