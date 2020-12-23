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
import Password from "./Password";
import DrawerComponent from "./DrawerComponent";
import SnackBar from "Components/SnackBar";

//i18n
import { useTranslation } from "react-i18next";

const Sidebar = ({ handleClose }) => {
  const theme = useTheme();
  const orientation = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const [select, setSelect] = useState(0);
  const [open, setOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  });
  const classes = useNavbarSetting();

  const handleSelect = (id) => {
    setSelect(id);
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, show: false });
  };

  const handleOpenSnackBar = (data) => {
    setSnackBar({ ...snackBar, ...data });
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
            {t("settings")}
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
        {select === 0 && (
          <Account orientation={orientation} handleOpenSnackBar={handleOpenSnackBar} />
        )}
        {select === 1 && <Language orientation={orientation} />}
        {select === 2 && (
          <Password orientation={orientation} handleOpenSnackBar={handleOpenSnackBar} />
        )}
      </main>
      <SnackBar snackBar={snackBar} handleClose={handleCloseSnackBar} />
    </div>
  );
};

export default Sidebar;
