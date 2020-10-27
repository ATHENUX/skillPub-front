import { CircularProgress } from "@material-ui/core";
import { useSpinnerStyles } from "Assets/Styles/spinnerStyles";

const RegularSpinner = ({ size = 50 }) => {
  const classes = useSpinnerStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" size={size} />
    </div>
  );
};

export default RegularSpinner;
