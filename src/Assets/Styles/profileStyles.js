import { makeStyles, createStyles } from "@material-ui/core";

export const useProfileStyles = makeStyles((theme) =>
  createStyles({
    large: {
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
    contentMd: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    firstAvatar: {
      position: "absolute",
      top: "11em",
      left: theme.spacing(5),
      zIndex: "3",
    },
    firstHiddenAvatar: {
      animation: "$firstAvatar 0.6s",
      animationFillMode: "forwards",
    },
    secondAvatar: {
      position: "fixed",
      top: "3.5em",
      left: theme.spacing(5),
      zIndex: "3",
      width: theme.spacing(7),
      height: theme.spacing(7),
      opacity: 0,
    },
    secondHiddenAvatar: {
      animation: "$secondAvatar 2s",
      animationFillMode: "forwards",
    },
    skeletonAvatar: {
      position: "absolute",
      top: "15em!important",
      left: theme.spacing(5),
      zIndex: "3",
    },
    seconSkeletonAvatar: {
      position: "fixed",
      top: "5.5em!important",
      left: theme.spacing(5),
      zIndex: "3",
      opacity: 0,
      visibility: "hidden",
    },
    secondHiddenSkeletonAvatar: {
      visibility: "visible",
    },
    marginRight: {
      marginRight: theme.spacing(1),
    },

    marginTop: {
      marginTop: "1em",
    },
    btn: {
      marginLeft: "45%",
    },
    borderRadius: {
      borderRadius: "50px",
    },
    space: {
      marginTop: theme.spacing(6),
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
    sidebar: {
      width: "300px",
      height: "calc(100vh - 65px)",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
      position: "absolute",
    },
    fixedSidebar: {
      position: "fixed",
      top: "65px",
      zIndex: "2",
    },
    contentFollowers: {
      marginTop: ".5em",
      display: "flex",
      justifyContent: "space-around",
    },
    contentSkills: {
      display: "flex",
      flexWrap: "wrap",
    },
    skill: {
      margin: ".2em",
    },
    appBarProfile: {
      position: "absolute",
      left: "300px",
      width: "calc(100% - 300px)",
      borderRadius: "0",
      display: "flex",
      zIndex: "3",
      "& .MuiButtonBase-root": {
        borderRadius: "0!important",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        left: "0",
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    fixedAppBarProfile: {
      position: "fixed",
      top: "4.5em",
    },
    postContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(16),
        marginBottom: theme.spacing(10),
      },
    },
    "@keyframes firstAvatar": {
      "0%": {
        position: "absolute",
        top: "11em",
        left: theme.spacing(5),
        zIndex: "3",
        width: theme.spacing(7),
        height: theme.spacing(7),
        opacity: 1,
      },
      "100%": {
        top: "13.5em",
        left: theme.spacing(5),
        width: theme.spacing(7),
        height: theme.spacing(7),
        opacity: 0,
      },
    },
    "@keyframes secondAvatar": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
        zIndex: "4",
      },
    },
  })
);
