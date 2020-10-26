import { createStyles, makeStyles } from "@material-ui/core";

export const useErrorPageStyles = makeStyles((theme) =>
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
  })
);
