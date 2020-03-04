import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DoctorIcon from "../../assets/images/doctor-icon.png";
import PatientIcon from "../../assets/images/patient-icon.png";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import "./RolePage.css";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  icon: {
    width: "30px",
    height: "30px"
  }
}));

function RolePage(props) {
  const classes = useStyles();
  const {
    loading,
    error,
    chainCodeID,
    tokenId,
    authRedirectPath,
    onSelectRole,
    onSetAuthRedirectPath
  } = props;
  const selectRole = role => {
    onSelectRole(tokenId, role);
    onSetAuthRedirectPath("/");
  };
  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error.message}</p>;
  }
  return (
    <React.Fragment>
      {!!chainCodeID && <Redirect to={authRedirectPath} />}
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className={classes.root}>
        <h3>Choose Your Role</h3>
        {errorMessage}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img
              src={PatientIcon}
              className="icon"
              alt="Patient"
              onClick={() => selectRole("patient")}
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={DoctorIcon}
              className="icon"
              alt="Doctor"
              onClick={() => selectRole("doctor")}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    chainCodeID: state.chainCodeID,
    tokenId: state.token,
    authRedirectPath: state.authRedirectPath
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSelectRole: (tokenId, role) =>
      dispatch(actions.setupChainCodeID(tokenId, role)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RolePage);
