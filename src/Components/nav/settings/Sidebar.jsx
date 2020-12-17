import { useState } from "react";
//material-Ui
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useNavbarSetting } from "Assets/Styles/navbarStyles";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

//components
import Account from "./Account";
import Language from "./Language";
import DrawerComponent from "./DrawerComponent";

const Sidebar = ({ handleClose }) => {
  const theme = useTheme();
  const orientation = useMediaQuery(theme.breakpoints.down("sm"));
  const [select, setSelect] = useState(0);
  const [open, setOpen] = useState(false);
  const classes = useNavbarSetting();

  const handleSelect = (id) => {
    setSelect(id);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar>
          {orientation && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(!open)}
              aria-label="close"
            >
              {open ? <ArrowLeftIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Settings
          </Typography>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DrawerComponent
        select={select}
        handleSelect={handleSelect}
        open={open}
        orientation={orientation}
      />

      <main className={classes.main}>
        {select === 0 && <Account orientation={orientation} />}
        {select === 1 && <Language orientation={orientation} />}
      </main>
    </div>
  );
};

export default Sidebar;
