import { makeStyles } from "@material-ui/core/styles";

export const useSpinnerStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));
