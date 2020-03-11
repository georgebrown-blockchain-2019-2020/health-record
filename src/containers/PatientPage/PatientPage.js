import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TableData from "../../components/TableData/TableData";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { GET_MEDICAL_INFO_URL, DATABASE_URL } from "../../api";
function PatientPage(props) {
  const [patientRecord, setPatientRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getMedicalInfo = useCallback(async () => {
    setLoading(true);
    try {
      const medicalInfo = await axios.get(
        `${GET_MEDICAL_INFO_URL}?id=${props.userId}`
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
        setPatientRecord(updatedList);
        setLoading(false);
      } else {
        setLoading(false);
        setError(medicalInfo.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.toString());
    }
  }, [props.token, props.userId]);
  useEffect(() => {
    getMedicalInfo();
  }, [getMedicalInfo]);
  let content;
  if (patientRecord.length !== 0) {
    content = <TableData rows={patientRecord} />;
  } else {
    content = <p>No Record</p>;
  }
  return (
    <React.Fragment>
      {props.role !== "patient" && <Redirect to={props.authRedirectPath} />}
      <div>
        <h1>Your Records</h1>
        <div>{error}</div>
        {loading ? (
          <React.Fragment>
            <LinearProgress variant="query" color="secondary" />
            <LinearProgress variant="query" />
          </React.Fragment>
        ) : (
          <div>{content}</div>
        )}
      </div>
    </React.Fragment>
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
export default connect(mapStateToProps)(PatientPage);
