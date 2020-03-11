import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import axios from "axios";
import {
  ADD_MEDICAL_INFO_URL,
  GET_ALLOWED_LIST_URL,
  DATABASE_URL
} from "../../api";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "90%"
  },
  mgTop: {
    marginTop: theme.spacing(2)
  },
  center: {
    textAlign: "center"
  },
  button: {
    margin: "2rem auto",
    display: "block",
    height: "50px",
    width: "100px",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    },
    color: "white"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

function DoctorPage(props) {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [patientRecord, setPatientRecord] = useState({
    patientID: "",
    date: new Date(),
    info: ""
  });
  const [patientList, setPatientList] = React.useState([]);
  const getPatientList = useCallback(async () => {
    setLoading(true);
    const patientIDs = await axios.get(
      `${GET_ALLOWED_LIST_URL}?id=${props.userId}`
    );
    const updatedList = [];
    try {
      if (patientIDs.data.status === "success") {
        for (let i = 0; i < patientIDs.data.data.length; i++) {
          const infor = await axios.get(
            `${DATABASE_URL}/information.json?auth=${props.token}&orderBy="userId"&equalTo="${patientIDs.data.data[i].id}"`
          );
          for (let key in infor.data) {
            let user = {
              ...patientIDs.data.data[i],
              name: infor.data[key].userName
            };
            updatedList.push(user);
          }
        }
        setPatientList(updatedList);
        setLoading(false);
      } else {
        setLoading(false);
        setError(patientIDs.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.toString());
    }
  }, [props.token, props.userId]);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    getPatientList();
  }, [getPatientList]);

  const handleChange = input => e => {
    const updatedInfo = { ...patientRecord };
    if (input === "date") {
      updatedInfo[input] = e;
    } else {
      updatedInfo[input] = e.target.value;
    }
    setPatientRecord(updatedInfo);
  };
  const submitRecord = () => {
    setLoading(true);
    axios
      .put(ADD_MEDICAL_INFO_URL, {
        id: props.userId,
        patientID: patientRecord.patientID,
        info: patientRecord.info
      })
      .then(res => {
        if (res.data.status === "success") {
          setLoading(false);
          setPatientRecord({ patientID: "", date: new Date(), info: "" });
        } else {
          setLoading(false);
          setError(res.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.toString());
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  let checkValidSubmit =
    patientRecord.info === "" || patientRecord.patientID === "";
  return (
    <div className={classes.center}>
      <div>{error}</div>
      <h1>PRESCRIPTION</h1>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Patient ID
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={patientRecord.patientID}
          onChange={handleChange("patientID")}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {patientList.length !== 0 &&
            patientList.map(patient => (
              <MenuItem key={patient.id} value={patient.id}>
                {patient.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        id="standard-multiline-flexible"
        label="Treatment Info"
        multiline
        rowsMax="4"
        value={patientRecord.info}
        onChange={handleChange("info")}
        className={classes.formControl}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          value={patientRecord.date}
          onChange={handleChange("date")}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          className={classes.formControl}
        />
      </MuiPickersUtilsProvider>
      <div className={classes.wrapper}>
        <Button
          variant="outlined"
          disabled={checkValidSubmit}
          color="secondary"
          className={classes.button}
          onClick={submitRecord}
        >
          {!loading && "Submit"}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    role: state.role,
    userId: state.userId,
    authRedirectPath: state.authRedirectPath,
    token: state.token
  };
};
export default connect(mapStateToProps)(DoctorPage);
