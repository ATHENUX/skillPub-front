import { useState } from "react";
import { Redirect } from "react-router-dom";
import useSEO from "Hooks/useSEO";

//hooks
import useLanguageBrowser from "Hooks/useLanguageBrowser";

//Material ui
import { Container, Card, Grid } from "@material-ui/core";
import { useAccessStyle } from "Assets/Styles/accessStyles";

//components
import SignIn from "Components/access/SignIn";
import SignUp from "Components/access/SignUp";
import Overlay from "Components/access/Overlay";

const Access = () => {
  const classes = useAccessStyle();
  const [changeAccess, setChangeAccess] = useState(true);

  useSEO({
    title: "access",
    description: "log in to the skill Pub app",
  });

  useLanguageBrowser();

  const handleChangeAccess = (changeAccess) => {
    setChangeAccess(changeAccess);
  };

  const auth = localStorage.getItem("session");
  if (Boolean(auth)) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
        <Grid item xs={9} sm={7} md={12}>
          <Card className={classes.content}>
            <div className={`${classes.container}`}>
              <SignIn changeAccess={changeAccess} />
              <SignUp changeAccess={changeAccess} />
            </div>
            <Overlay changeAccess={changeAccess} handleChangeAccess={handleChangeAccess} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Access;
