import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableData from "../../components/TableData/TableData";
import { connect } from "react-redux";
import axios from "axios";
import {
  GET_ALLOWED_LIST_URL,
  GET_MEDICAL_INFO_URL,
  DATABASE_URL
} from "../../api";
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
function RecordPage(props) {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientList, setPatientList] = React.useState([]);
  const [patientRecords, setPatientRecords] = React.useState([]);
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
            console.log(user);
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

  const handleChange = e => {
    setPatientId(e.target.value);
  };
  const getPatientRecords = async () => {
    setLoading(true);
    setError("");
    setPatientRecords([]);
    try {
      const medicalInfo = await axios.get(
        `${GET_MEDICAL_INFO_URL}?id=${patientId}`
      );
      const updatedList = [];
      if (medicalInfo.data.status === "success") {
        for (let i = 0; i < medicalInfo.data.data.length; i++) {
          const infor = await axios.get(
            `${DATABASE_URL}/information.json?auth=${props.token}&orderBy="userId"&equalTo="${medicalInfo.data.data[i]["writer_id"]}"`
          );
          for (let key in infor.data) {
            let user = {
              ...medicalInfo.data.data[i],
              name: infor.data[key].userName
            };
            updatedList.push(user);
          }
        }
        setLoading(false);
        setPatientRecords(updatedList);
      } else {
        setLoading(false);
        setError(medicalInfo.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.toString());
    }
  };
  React.useEffect(() => {}, [patientRecords]);
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
            <MenuItem key={patient.id} value={patient.id}>
              {patient.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>{error}</div>
      <Button
        variant="outlined"
        disabled={!patientId || patientList.length === 0}
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
      {console.log(patientRecords.length)}
      {patientRecords.length !== 0 && <TableData rows={patientRecords} />}
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
export default connect(mapStateToProps)(RecordPage);
