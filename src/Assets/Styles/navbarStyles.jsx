import { createStyles, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { withStyles, fade } from "@material-ui/core/styles";
const drawerWidth = 240;

export const useNavbarStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBarSecondary: {
      top: "auto!important",
      bottom: 0,
    },
    appBarSecondaryIcon: {
      display: "flex",
      justifyContent: "space-around",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
      position: "relative",
      borderRadius: "30px",
      backgroundColor:
        theme.palette.type === "light"
          ? fade(theme.palette.common.black, 0.1)
          : fade(theme.palette.common.white, 0.25),
      width: "100%",
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(3),
      "&:hover": {
        backgroundColor:
          theme.palette.type === "light"
            ? fade(theme.palette.common.black, 0.2)
            : fade(theme.palette.common.white, 0.25),
      },
      [theme.breakpoints.up("sm")]: {
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    offset: theme.mixins.toolbar,
    paperInputSearch: {
      maxWidth: 320,
      minWidth: 280,
      maxHeight: 300,
      overflowY: "hidden",
    },
    simplePopper: {
      zIndex: 5000,
    },
    noUsers: {
      padding: theme.spacing(1),
      textAlign: "center",
    },
  })
);

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    padding: "5px",
    "& .MuiList-padding": {
      padding: "0!important",
      "& .MuiButtonBase-root": {
        padding: "0!important",
      },
    },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    borderRadius: "5px",
    marginTop: "5px",
    marginBottom: "5px",
    "&:focus": {
      backgroundColor: theme.palette.grey,
      "& .MuiListItemText-primary": {
        color: theme.palette.primary.main,
      },
      "& .MuiAvatar-colorDefault": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff!important",
      },
    },
    "& .MuiAvatar-colorDefault": {
      color: "#000",
    },
    "& .MuiTypography-root": {
      marginRight: "50px",
    },
    "& .MuiSvgIcon-root": {
      opacity: 0.5,
    },
  },
}))(MenuItem);

export const useNavbarSetting = makeStyles((theme) => ({
  appBar: {
    position: "relative!important",
    zIndex: theme.zIndex.drawer + 1 + "!important",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  main: {
    width: "100%",
  },
  container: {
    width: "50%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0",
    },
  },
  AccountForm: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  newPassword: {
    display: "flex",
    flexWrap: "wrap",
  },
}));
