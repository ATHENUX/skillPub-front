import { CircularProgress } from "@material-ui/core";
import { useSpinnerStyles } from "Assets/Styles/spinnerStyles";

const RegularSpinner = ({ size = 50, isLoading, children }) => {
  const classes = useSpinnerStyles();

  const Spinner = (
    <div className={classes.root}>
      <CircularProgress color="secondary" size={size} />
    </div>
  );

  return <>{isLoading ? Spinner : children}</>;
};

export default RegularSpinner;
