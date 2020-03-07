import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TableData from "../../components/TableData/TableData";
import LinearProgress from "@material-ui/core/LinearProgress";
import { createData } from "../../shared/utility";
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
function PatientPage(props) {
  const [patientRecord, setPatientRecord] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setPatientRecord(rows);
    }, 1000);
  }, []);
  return (
    <React.Fragment>
      {props.role !== "patient" && <Redirect to={props.authRedirectPath} />}
      <div>
        <h1>Your Records</h1>
        {patientRecord.length === 0 ? (
          <React.Fragment>
            <LinearProgress variant="query" color="secondary" />
            <LinearProgress variant="query" />
          </React.Fragment>
        ) : (
          <TableData rows={patientRecord} />
        )}
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
    role: state.role
  };
};
export default connect(mapStateToProps)(PatientPage);
