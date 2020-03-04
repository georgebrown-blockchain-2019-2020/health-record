import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
function PatientPage(props) {
  return (
    <React.Fragment>
      {!props.chainCodeID && <Redirect to={props.authRedirectPath} />}
      <div>
        <h1>PatientPage</h1>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
    isAuth: state.token !== null,
    chainCodeID: state.chainCodeID,
    authRedirectPath: state.authRedirectPath
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientPage);
