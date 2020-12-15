import { makeStyles, fade, Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const usePostStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  paperFooter: {
    marginTop: 5,
  },
  input: {
    display: "none",
  },
  postButtons: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "15px auto",
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.6em",
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,.3)",
        backgroundColor: "#F5F5F5",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        backgroundColor: "#F5F5F5",
      },
      "*::-webkit-scrollbar-thumb": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,.3)",
        backgroundColor: "#BCC0C4",
      },
    },
  },
  gridList: {
    maxWidth: 450,
    height: 250,
  },
  hideGridList: {
    display: "none",
  },
  titleBar: {
    backgroundColor: "transparent",
    padding: 5,
  },
  closeIcon: {
    color: "white",
    backgroundColor: fade(theme.palette.common.black, 0.8),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.6),
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
  },

  post: {
    width: "600px",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  media: {
    position: "relative",
    "& .CarouselItem": {
      height: "350px",
      overflow: "hidden",
      backgroundColor: theme?.palette?.type === "light" ? "#f1f1f1d7" : "#1414142e",
      [theme.breakpoints.down("xs")]: {
        height: "164px",
      },
    },
    "& img": {
      width: "100%",
    },
  },
  CardAction: {
    justifyContent: "space-around",
    "& .MuiIconButton-root:hover": {
      backgroundColor: "rgba(255, 255, 255, -0.92)!important",
    },
  },
  secondUser: {
    position: "relative",
  },
  secondUserTitle: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    left: "5em",
    top: "-2em",
    [theme.breakpoints.down(296)]: {
      top: "-1.5em",
    },
  },
  smallText: {
    fontSize: ".9em",
    opacity: 0.5,
  },
  secondUserBody: {
    margin: "0 4em 1em 4em",
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  btnDefault: {
    opacity: 0.5,
  },
  contentButton: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
}));

export const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);
