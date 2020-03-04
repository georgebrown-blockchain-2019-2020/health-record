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
function HomePage(props) {
  let route = null;
  if (props.chainCodeID.includes("patient")) {
    route = (
      <Switch>
        <Route path="/record" render={props => <PatientPage {...props} />} />
        <Route
          path="/patientrecord"
          render={props => <RecordPage {...props} />}
        />
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
        {route}
      </Suspense>
    </Layout>
  );
}
const mapStateToProps = state => {
  return {
    chainCodeID: state.chainCodeID
  };
};
export default connect(mapStateToProps)(HomePage);
