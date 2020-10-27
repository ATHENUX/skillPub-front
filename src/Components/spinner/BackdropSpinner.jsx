import { Backdrop } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { useTheme } from "@material-ui/core/styles";
import { useSpinnerStyles } from "Assets/Styles/spinnerStyles";

const BackdropSpinner = () => {
  const theme = useTheme();
  const classes = useSpinnerStyles();

  return (
    <Backdrop open className={classes.backdrop}>
      <Loader type="Bars" color={theme.palette.secondary.main} height={100} width={100} />
    </Backdrop>
  );
};

export default BackdropSpinner;
