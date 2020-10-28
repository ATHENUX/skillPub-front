import { Backdrop } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { useTheme } from "@material-ui/core/styles";
import { useSpinnerStyles } from "Assets/Styles/spinnerStyles";

const BackdropSpinner = ({ isLoading, children }) => {
  const theme = useTheme();
  const classes = useSpinnerStyles();

  const Spinner = (
    <Backdrop open className={classes.backdrop}>
      <Loader type="Bars" color={theme.palette.secondary.main} height={100} width={100} />
    </Backdrop>
  );

  return <>{isLoading ? Spinner : children}</>;
};

export default BackdropSpinner;
