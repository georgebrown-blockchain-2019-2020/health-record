import React, { useEffect, Suspense } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as actions from "./store/actions/index";
import theme from "./theme";
const LoginPage = React.lazy(() => {
  return import("./containers/LoginPage/LoginPage");
});
const RolePage = React.lazy(() => {
  return import("./containers/RolePage/RolePage");
});
const HomePage = React.lazy(() => {
  return import("./containers/HomePage/HomePage");
});

function App(props) {
  const { onTryAutoSignUp } = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);
  let routes = null;
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/role" render={props => <RolePage {...props} />} />
        <Route path="/logout" render={props => <LoginPage {...props} />} />
        <Route path="/auth" render={props => <LoginPage {...props} />} />
        <Route path="/" render={props => <HomePage {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" render={props => <LoginPage {...props} />} />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <Backdrop open={true}>
            <CircularProgress color="secondary" />
          </Backdrop>
        }
      >
        {routes}
      </Suspense>
    </ThemeProvider>
  );
}
const mapStateToProps = state => {
  return {
    isAuth: state.token !== null,
    chainCodeID: state.chainCodeID
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
