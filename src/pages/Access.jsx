import { useState } from "react";
import { Redirect } from "react-router-dom";

//Material-UI
import { Container, Card, Grid } from "@material-ui/core";
import { useAccessStyle } from "Assets/Styles/accessStyles";

//components
import SignIn from "Components/access/SignIn";
import SignUp from "Components/access/SignUp";
import Overlay from "Components/access/Overlay";

//hooks
import useSEO from "Hooks/useSEO";
import { useValidateAuth } from "Hooks/useValidateAuth";
import useLanguageBrowser from "Hooks/useLanguageBrowser";

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

  const isLogged = useValidateAuth();
  if (Boolean(isLogged)) {
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
