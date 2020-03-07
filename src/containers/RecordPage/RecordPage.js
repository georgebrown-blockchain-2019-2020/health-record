import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { createData } from "../../shared/utility";
import TableData from "../../components/TableData/TableData";

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
    display: "block"
  },
  table: {
    minWidth: 700
  }
}));

const rows = [
  createData(
    "doctor_eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYTNmN2EwMjQ4YmU0ZTBkZjAyYWVlZWIyMGIxZDJlMmI3ZjI0NzQiLCJ0eXAiOiJKV1QifQ",
    new Date().toString(),
    "headache and flu"
  ),
  createData(
    "doctor_eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYTNmN2EwMjQ4YmU0ZTBkZjAyYWVlZWIyMGIxZDJlMmI3ZjI0NzQiLCJ0eXAiOiJKV1Qif1",
    new Date().toString(),
    "headache and flu"
  ),
  createData(
    "doctor_eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYTNmN2EwMjQ4YmU0ZTBkZjAyYWVlZWIyMGIxZDJlMmI3ZjI0NzQiLCJ0eXAiOiJKV1Qif2",
    new Date().toString(),
    "headache and flu"
  ),
  createData(
    "doctor_eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYTNmN2EwMjQ4YmU0ZTBkZjAyYWVlZWIyMGIxZDJlMmI3ZjI0NzQiLCJ0eXAiOiJKV1Qif3",
    new Date().toString(),
    "headache and flussssssssssssssssssss"
  ),
  createData(
    "doctor_eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYTNmN2EwMjQ4YmU0ZTBkZjAyYWVlZWIyMGIxZDJlMmI3ZjI0NzQiLCJ0eXAiOiJKV1Qif4",
    "new Date()",
    "headache and flu"
  )
];
const userList = ["user_1", "user_2", "user_3"];
function RecordPage() {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef(null);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    setPatientList(userList);
  }, []);
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [patientList, setPatientList] = React.useState([]);
  const [patientRecords, setPatientRecords] = React.useState([]);
  const handleChange = e => {
    setPatientId(e.target.value);
  };
  const getPatientRecords = () => {
    setLoading(true);
    setPatientRecords([]);
    setTimeout(() => {
      setLoading(false);
      setPatientRecords(rows);
    }, 1000);
  };

  return (
    <div className={classes.center}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Patient ID
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={patientId}
          onChange={e => handleChange(e)}
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
      <Button
        variant="outlined"
        disabled={!patientId}
        color="secondary"
        className={classes.button}
        onClick={() => getPatientRecords()}
      >
        Check Records
      </Button>
      {loading && (
        <React.Fragment>
          <LinearProgress variant="query" className={classes.mgTop} />{" "}
          <LinearProgress
            variant="query"
            color="secondary"
            className={classes.mgTop}
          />
        </React.Fragment>
      )}
      {patientRecords.length !== 0 && <TableData rows={patientRecords} />}
    </div>
  );
}

export default RecordPage;
