import { makeStyles, createStyles } from "@material-ui/core";

export const useProfileStyles = makeStyles((theme) =>
  createStyles({
    large: {
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
    avatar: {
      position: "absolute",
      top: "11em",
      left: "20px",
      zIndex: "3",
    },
    fixedAvatar: {
      position: "fixed",
      top: "69px",
      left: "29px",
      zIndex: "3",
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    marginTop: {
      marginTop: "1em",
    },
    btn: {
      marginTop: ".6em",
      marginLeft: "65%",
    },
    bannerContent: {
      width: "100%",
      position: "relative",
      height: "200px",
      overflow: "hidden",
      "& img": {
        width: "100%",
        position: "relative",
        height: "auto",
      },
    },
    text: {
      fontSize: "12px",
      marginLeft: "2px",
    },
    panel: {
      width: "300px",
      height: "calc(100vh - 65px)",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
      position: "absolute",
    },
    fixed: {
      position: "fixed",
      top: "65px",
      zIndex: "2",
    },
    contentFollower: {
      marginTop: ".5em",
      display: "flex",
      justifyContent: "space-between",
    },
    contentSkills: {
      display: "flex",
      justifyContent: "Center",
      flexWrap: "wrap",
    },
    skill: {
      margin: ".2em",
    },
  })
);
