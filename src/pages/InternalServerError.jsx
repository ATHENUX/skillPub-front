import { Link as RouterLink } from "react-router-dom";

//material-UI
import { Grid, Typography, Paper, Button, Hidden } from "@material-ui/core";
import { useErrorPageStyles } from "Assets/Styles/errorPagesStyles";

//i18n
import { useTranslation } from "react-i18next";

//hooks
import useSEO from "Hooks/useSEO";
import useLanguageBrowser from "Hooks/useLanguageBrowser";

const InternalServerError = () => {
  const classes = useErrorPageStyles();
  const { t } = useTranslation();
  useSEO({
    title: "Internal server error",
    description: "The server responded with a status of 500",
  });
  useLanguageBrowser();

  return (
    <Grid container direction="row" alignItems="center" justify="center" className={classes.root}>
      <Grid item>
        <Paper className={classes.paper} elevation={0}>
          <Typography variant="h1" color="textSecondary">
            <b>{t("internal.server.error.status")}</b>
          </Typography>
          <Hidden xsDown>
            <Typography variant="h2" color="textSecondary">
              <b>{t("internal.server.error.title")}</b>
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h5" color="textSecondary">
              <b>{t("internal.server.error.title")}</b>
            </Typography>
          </Hidden>
          <Typography variant="body1" color="textSecondary" paragraph>
            <b>{t("internal.server.error.body")}</b>
          </Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/">
            {t("error.pages.button")}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default InternalServerError;
