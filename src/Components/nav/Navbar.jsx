import { useLocation } from "react-router-dom";

//material-UI
import { Hidden } from "@material-ui/core";
import { useNavbarStyles } from "Assets/Styles/navbarStyles";

//components
import NavBarSecondary from "./NavBarSecondary";
import NavBarPrimary from "./NavBarPrimary";
import HideOnScroll from "./HideOnScroll";

const Navbar = (props) => {
  const classes = useNavbarStyles();

  let location = useLocation();
  if (
    location.pathname === "/access" ||
    location.pathname === "/404" ||
    location.pathname === "/500" ||
    location.pathname === "/settings"
  ) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Hidden smUp>
        <HideOnScroll {...props}>
          <div>
            <NavBarPrimary />
          </div>
        </HideOnScroll>
      </Hidden>

      <Hidden xsDown>
        <NavBarPrimary />
      </Hidden>

      <div className={classes.offset}></div>
      {/* this navigation bar is displayed in a small size */}
      <NavBarSecondary />
    </div>
  );
};

export default Navbar;
