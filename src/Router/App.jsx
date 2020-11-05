import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//material ui
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import getTheme from "theme/MaterialUi";

//pages
import Home from "pages/Home";
import Access from "pages/Access";
import NotFound from "pages/NotFound";

//components
import Navbar from "Components/nav/Navbar";

//react & redux
import { connect } from "react-redux";

const App = ({ mode }) => {
  return (
    <Router>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
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

export default connect(mapStateToProps)(App);
