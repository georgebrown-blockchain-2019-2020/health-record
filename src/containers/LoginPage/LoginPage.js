import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { checkValidity, updateObject } from "../../shared/utility";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  center: {
    justifyContent: "center"
  }
}));

const SignIn = props => {
  const classes = useStyles();
  const {
    isAuth,
    role,
    loading,
    authRedirectPath,
    error,
    onAuth,
    onSetAuthRedirectPath
  } = props;
  const [controls, setControl] = useState({
    email: {
      value: "",
      validation: { required: true, email: true },
      errors: []
    },
    password: {
      value: "",
      validation: { required: true },
      errors: []
    }
  });
  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        errors: checkValidity(
          event.target.value,
          controls[controlName].validation
        )
      })
    });
    setControl(updatedControls);
  };
  useEffect(() => {
    if (role) {
      onSetAuthRedirectPath("/");
    } else {
      onSetAuthRedirectPath("/role");
    }
  }, [role, onSetAuthRedirectPath]);
  const isValid =
    !controls.email.value ||
    !controls.password.value ||
    controls.email.errors.length !== 0 ||
    controls.password.errors.length !== 0;
  const submitHandler = (event, isSignUp) => {
    event.preventDefault();
    onAuth(controls.email.value, controls.password.value, isSignUp);
  };
  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error.message}</p>;
  }
  return (
    <React.Fragment>
      {isAuth && <Redirect to={authRedirectPath} />}
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Health Record
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={controls.email.errors.length !== 0}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={controls.email.value}
              helperText={
                controls.email.errors.length !== 0
                  ? controls.email.errors.join(" & ")
                  : ""
              }
              onChange={event => inputChangeHandler(event, "email")}
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={controls.password.errors.length !== 0}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={controls.password.value}
              helperText={
                controls.password.errors.length !== 0
                  ? controls.password.errors.join(" & ")
                  : ""
              }
              onChange={event => inputChangeHandler(event, "password")}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errorMessage}
            <Grid container spacing={3} className={classes.center}>
              <Grid item xs={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isValid}
                  onClick={e => submitHandler(e, false)}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  disabled={isValid}
                  onClick={e => submitHandler(e, true)}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isAuth: state.token !== null,
    role: state.role,
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
