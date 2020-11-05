import { createStyles, makeStyles } from "@material-ui/core";

export const useAccessStyle = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    link: {
      marginBottom: "10px",
    },
    content: {
      position: "relative",
      margin: "20px 0",
    },
    container: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
    },
    images: {
      width: "30px",
    },
    signInContainer: {
      zIndex: 2,
    },
    signUpContainer: {
      opacity: 0,
      zIndex: 2,
    },
    hideSingIn: {
      opacity: 0,
      animation: "$hide 0.2s",
    },
    showSingUp: {
      zIndex: 5,
      opacity: 1,
      animation: "$show 0.8s",
    },
    formStyle: {
      padding: "20px",
      width: "290px",
      textAlign: "center",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      "& .MuiInputBase-root": {
        borderRadius: "30px 30px",
      },
    },
    overlayContainer: {
      position: "absolute",
      top: "0",
      left: "50%",
      width: "50%",
      height: "100%",
      zIndex: 3,
      [theme.breakpoints.down("sm")]: {
        left: "0",
        top: "50%",
      },
    },
    overlay: {
      background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "0 0",
      color: "#ffffff",
      position: "relative",
      height: "100%",
      width: "200%",
      transition: "all 0.6s ease-in-out",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      textAlign: "center",
      left: "0",
      [theme.breakpoints.down("sm")]: {
        top: "0",
        flexDirection: "column",
      },
    },
    overlayChange: {
      left: "-200%",
      [theme.breakpoints.down("sm")]: {
        left: "0",
        top: "-110%",
      },
    },
    overlayPanel: {
      padding: "0 40px",
      textAlign: "center",
      opacity: 0,
      marginLeft: "29px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0",
      },
    },
    overlaySwitchPanel: {
      opacity: 1,
      animation: "$showOverlayPanel 0.6s ease-in-out",
    },
    socialContainer: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    modalContainer: {
      textAlign: "center",
      margin: "0 40px 20px 40px",
    },
    iconModal: {
      fontSize: 100,
      textAlign: "center",
    },
    "@keyframes show": {
      "0%, 50%": {
        zIndex: 2,
        opacity: 0,
      },
      "100%": {
        zIndex: 5,
        opacity: 1,
      },
    },
    "@keyframes hide": {
      "0%, 50%": {
        opacity: 1,
      },
      "100%": {
        opacity: 0,
      },
    },
    "@keyframes showOverlayPanel": {
      "0%, 50%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
  })
);
