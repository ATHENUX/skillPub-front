import { makeStyles, createStyles } from "@material-ui/core";

export const useRecoverPasswordStyle = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100vh",
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: "center",
      borderRadius: 30,
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "inherit",
      },
    },
    marginTop: {
      marginTop: theme.spacing(2),
    },
    form: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      "& .MuiButton-root": {
        [theme.breakpoints.up("md")]: {
          width: "50%",
          margin: "auto",
          marginTop: theme.spacing(2),
        },
      },
    },
  })
);
