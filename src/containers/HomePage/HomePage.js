import React, { Suspense } from "react";
import Layout from "../../hoc/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
const RecordPage = React.lazy(() => {
  return import("../RecordPage/RecordPage");
});
const DoctorPage = React.lazy(() => {
  return import("../DoctorPage/DoctorPage");
});
const PatientPage = React.lazy(() => {
  return import("../PatientPage/PatientPage");
});
const AccessPage = React.lazy(() => {
  return import("../AccessPage/AccessPage");
});
function HomePage(props) {
  let route = null;
  console.log("hello");
  console.log(props.role);
  if (props.role === "patient") {
    route = (
      <Switch>
        <Route path="/record" render={props => <PatientPage {...props} />} />
        <Route
          path="/patientrecord"
          render={props => <RecordPage {...props} />}
        />
        <Route path="/accesslist" render={props => <AccessPage {...props} />} />
        <Redirect to="/record" />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route
          path="/description"
          render={props => <DoctorPage {...props} />}
        />
        <Route
          path="/patientrecord"
          render={props => <RecordPage {...props} />}
        />
        <Redirect to="/description" />
      </Switch>
    );
  }
  return (
    <Layout>
      <Suspense
        fallback={
          <Backdrop open={true}>
            <CircularProgress color="secondary" />
          </Backdrop>
        }
      >
        {!props.role ? <Redirect to={props.authRedirectPath} /> : route}
      </Suspense>
    </Layout>
  );
}
const mapStateToProps = state => {
  return {
    authRedirectPath: state.authRedirectPath,
    role: state.role
  };
};
export default connect(mapStateToProps)(HomePage);
