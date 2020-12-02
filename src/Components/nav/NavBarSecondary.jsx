//material-UI
import { AppBar, Toolbar, Hidden, Divider } from "@material-ui/core";
import { useNavbarStyles } from "Assets/Styles/navbarStyles";

//components
import IconsNanbar from "./IconsNanbar";

const NavBarSecondary = () => {
  const classes = useNavbarStyles();

  return (
    <Hidden smUp>
      <AppBar position="fixed" color="inherit" elevation={0} className={classes.appBarSecondary}>
        <Divider />
        <Toolbar className={classes.appBarSecondaryIcon}>
          <IconsNanbar />
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default NavBarSecondary;
