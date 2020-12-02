import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { getUserData } from "Redux/Reducers/User";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";

//material-UI
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import getTheme from "theme/MaterialUi";

//pages
import Home from "pages/Home";
import Access from "pages/Access";
import NotFound from "pages/NotFound";
import Settings from "pages/Settings";
import Profile from "pages/Profile";

//components
import Navbar from "Components/nav/Navbar";

//hooks
import getUser from "helpers/getUser";

const App = ({ mode, getUserData }) => {
  useEffect(() => {
    getUser(getUserData);
  }, [getUserData]);

  return (
    <Router>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/Profile/:userID" component={Profile} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/access" component={Access} />
          <Route exact path="/404" component={NotFound} />
          <Route exact path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  mode: state.ThemeMode,
});

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
