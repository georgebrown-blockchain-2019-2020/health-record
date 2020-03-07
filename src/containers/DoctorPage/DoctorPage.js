import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

function DoctorPage() {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [patientRecord, setPatientRecord] = useState({
    patientID: "",
    date: new Date(),
    info: ""
  });
  const [patientList, setPatientList] = React.useState([
    "user_1",
    "user_2",
    "user_3"
  ]);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  let checkValidSubmit =
    patientRecord.info === "" || patientRecord.patientID === "";
  return (
    <div className={classes.center}>
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
          {patientList.map(patient => (
            <MenuItem key={patient} value={patient}>
              {patient}
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

export default DoctorPage;
