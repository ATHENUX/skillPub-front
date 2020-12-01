import { makeStyles, createStyles } from "@material-ui/core";

export default makeStyles((theme) =>
  createStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      width: "100vw",
      marginTop: 20,
    },
    middle: {
      maxWidth: 600,
      minWidth: 600,
    },
    btn: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
    messageInput: {
      fontSize: ".9em",
      color: theme.palette.error.main,
    },
    input: {
      display: "none",
    },
  })
);
