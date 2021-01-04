import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { getUserData } from "Redux/Reducers/User";
import { changeThemeMode } from "Redux/Reducers/ThemeMode";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

//material-UI
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import getTheme from "theme/MaterialUi";

//pages
import Home from "pages/Home";
import Access from "pages/Access";
import NotFound from "pages/NotFound";
import Settings from "pages/Settings";
import Profile from "pages/Profile";
import RecoverPassword from "pages/RecoverPassword";

//components
import Navbar from "Components/nav/Navbar";

//i18n
import { useTranslation } from "react-i18next";

//hooks
import getUser from "helpers/getUser";

const App = ({ changeThemeMode, mode, getUserData }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    getUser(getUserData);
    changeThemeMode(localStorage.getItem("theme"));
    i18n.changeLanguage(localStorage.getItem("language"));
  }, [getUserData, changeThemeMode, i18n]);

  return (
    <Router>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/Profile/:userID" component={Profile} />
          <ProtectedRoute exact path="/settings" component={Settings} />
          <Route exact path="/access" component={Access} />
          <Route exact path="/recoverpassword/:userID" component={RecoverPassword} />
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
  changeThemeMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
