import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//material ui
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import getTheme from "theme/MaterialUi";

//pages
import Home from "pages/Home";
import Access from "pages/Access";
import NotFound from "pages/NotFound";

//components
import BackdropSpinner from "Components/spinner/BackdropSpinner";

//navbar
import Navbar from "Components/nav/Navbar";

//react & redux
import { connect } from "react-redux";

const App = ({ mode, changeSpinner }) => {
  return (
    <Router>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/access">
            <BackdropSpinner isLoading={changeSpinner}>
              <Access />
            </BackdropSpinner>
          </Route>
          <Route exact path="/404">
            <NotFound />
          </Route>
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
  changeSpinner: state.Spinner,
});

export default connect(mapStateToProps)(App);
