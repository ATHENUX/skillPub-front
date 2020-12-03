import { makeStyles, fade } from "@material-ui/core";

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
}));
