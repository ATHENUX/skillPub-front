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
  button: {
    marginTop: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formStyle: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& .MuiInputBase-root": {
      borderRadius: "30px 30px",
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
  skills: {
    margin: theme.spacing(1),
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
