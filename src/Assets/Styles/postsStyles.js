import { makeStyles } from "@material-ui/core";

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
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));
