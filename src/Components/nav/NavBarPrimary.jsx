import { AppBar, Toolbar, Typography, Hidden, Divider } from "@material-ui/core";

//components
import PopupMenu from "./PopupMenu";
import InputSearch from "./InputSearch";
import IconsNanbar from "./IconsNanbar";

//styles
import { useNavbarStyles } from "Assets/Styles/navbarStyles";

//i18n
import { useTranslation } from "react-i18next";

const NavBarPrimary = () => {
  const classes = useNavbarStyles();
  const { t } = useTranslation();
  return (
    <AppBar position="fixed" color="inherit" elevation={0}>
      <Toolbar>
        <Typography variant="h6">{t("name.app")}</Typography>

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
