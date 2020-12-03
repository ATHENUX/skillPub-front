//material-UI
import { AppBar, Toolbar, Typography, Link, Hidden, Divider } from "@material-ui/core";
import { useNavbarStyles } from "Assets/Styles/navbarStyles";
import { Link as RouterLink } from "react-router-dom";

//components
import PopupMenu from "./PopupMenu";
import InputSearch from "./InputSearch";
import IconsNanbar from "./IconsNanbar";

//i18n
import { useTranslation } from "react-i18next";

const NavBarPrimary = () => {
  const classes = useNavbarStyles();
  const { t } = useTranslation();
  return (
    <AppBar position="fixed" color="inherit" elevation={0}>
      <Toolbar>
        <Typography variant="h6">
          <Link underline="none" component={RouterLink} to="/" color="inherit">
            {t("name.app")}
          </Link>
        </Typography>

        <InputSearch />
        <div className={classes.grow} />

        <Hidden xsDown>
          <IconsNanbar />
        </Hidden>

        <PopupMenu />
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default NavBarPrimary;
