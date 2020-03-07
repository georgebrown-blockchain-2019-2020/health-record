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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "90%"
  },
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  icon: {
    width: "30px",
    height: "30px"
  },
  btn: {
    display: "block",
    margin: "0 auto"
  }
}));
const roleList = ["patient", "doctor"];
function RolePage(props) {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef(null);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const [userInfo, setUserInfo] = React.useState({
    role: "",
    userName: ""
  });
  const handleChange = input => event => {
    const updatedProfile = { ...userInfo };
    updatedProfile[input] = event.target.value;
    setUserInfo(updatedProfile);
  };
  const classes = useStyles();
  const {
    loading,
    error,
    role,
    tokenId,
    userId,
    authRedirectPath,
    onSelectRole,
    onSetAuthRedirectPath,
    onSubmitProfile
  } = props;
  const selectRole = role => {
    onSelectRole(tokenId, role);
    onSetAuthRedirectPath("/");
  };
  const submitProfile = () => {
    onSubmitProfile(tokenId, userInfo.role, userInfo.userName, userId);
    onSetAuthRedirectPath("/");
  };
  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error.message}</p>;
  }
  return (
    <React.Fragment>
      {!!role && <Redirect to={authRedirectPath} />}
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className={classes.root}>
        <h3>Choose Your Role</h3>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Role
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={userInfo.role}
            onChange={handleChange("role")}
            labelWidth={labelWidth}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {roleList.map(role => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          value={userInfo.userName}
          onChange={handleChange("userName")}
          className={classes.formControl}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={submitProfile}
          disabled={userInfo.role === "" || userInfo.userName === ""}
        >
          Submit
        </Button>
        {errorMessage}
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    role: state.role,
    userId: state.userId,
    tokenId: state.token,
    authRedirectPath: state.authRedirectPath
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
    onSubmitProfile: (tokenId, role, userName, userId) =>
      dispatch(actions.setupUser(tokenId, role, userName, userId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RolePage);
