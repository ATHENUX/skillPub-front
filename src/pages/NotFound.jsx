import { Link as RouterLink } from "react-router-dom";

//material-UI
import { Grid, Typography, Paper, Button, Hidden } from "@material-ui/core";
import { useErrorPageStyles } from "Assets/Styles/errorPagesStyles";

//i18n
import { useTranslation } from "react-i18next";

//hooks
import useSEO from "Hooks/useSEO";
import useLanguageBrowser from "Hooks/useLanguageBrowser";

const NotFound = () => {
  const classes = useErrorPageStyles();
  const { t } = useTranslation();
  useSEO({ title: "Page not found", description: "Page not found 404" });
  useLanguageBrowser();

  return (
    <Grid container direction="row" alignItems="center" justify="center" className={classes.root}>
      <Grid item>
        <Paper className={classes.paper} elevation={0}>
          <Typography variant="h1" color="textSecondary">
            <b>{t("not.found.status")}</b>
          </Typography>
          <Hidden xsDown>
            <Typography variant="h2" color="textSecondary">
              <b>{t("not.found.title")}</b>
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h4" color="textSecondary">
              <b>{t("not.found.title")}</b>
            </Typography>
          </Hidden>
          <Typography variant="body1" color="textSecondary" paragraph>
            <b>{t("not.found.body")}</b>
          </Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/">
            {t("error.pages.button")}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NotFound;
