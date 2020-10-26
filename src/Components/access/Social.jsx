//material ui
import { Button } from "@material-ui/core";

//svg
import google from "Assets/img/svg/google.svg";
import facebook from "Assets/img/svg/facebook.svg";

//styles
import { useAccessStyleTheme } from "Assets/Styles/accessStyles";

const Social = () => {
  const classes = useAccessStyleTheme();
  return (
    <div className={classes.socialContainer}>
      <Button aria-label="like" size="small">
        <img src={google} alt="google" className={classes.images} />
      </Button>
      <Button aria-label="like" size="small">
        <img src={facebook} alt="facebook" className={classes.images} />
      </Button>
    </div>
  );
};

export default Social;
