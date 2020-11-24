import { makeStyles } from "@material-ui/core";

export const useSettingsStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    padding: "20px 0",
  },
  cardContent: {
    textAlign: "center",
  },
  spacing: {
    margin: theme.spacing(1),
  },
  spacingTop: {
    marginTop: theme.spacing(1),
  },
  spacingBottom: {
    marginBottom: theme.spacing(2),
  },
  formStyle: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "15em",
    },
  },
  constrastCard: {
    backgroundColor: theme.palette.type === "light" ? "#f1f1f1d7" : "#2b2b2bd7",
  },
  locationContainer: {
    padding: "0 20px",
    paddingBottom: "0!important",
    display: "flex",
    alignItems: "center",
  },
  skillsContent: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  dialogContent: {
    maxHeight: "100em",
    display: "flex",
    flexWrap: "wrap",
    "& .MuiButton-root": {
      margin: ".5em",
    },
  },
}));
