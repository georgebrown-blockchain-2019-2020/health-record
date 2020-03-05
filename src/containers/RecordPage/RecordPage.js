import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);
function createData(doctorID, date, info) {
  return { doctorID, date, info };
}
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
function RecordPage() {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef(null);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const [patientId, setPatientId] = useState("");
  const [patientList, setPatientList] = React.useState([
    "user_1",
    "user_2",
    "user_3"
  ]);
  const handleChange = e => {
    setPatientId(e.target.value);
  };
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
          onChange={() => handleChange()}
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
      >
        Check Records
      </Button>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Doctor ID</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Treatment Info</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.doctorID}>
                <StyledTableCell component="th" scope="row">
                  {row.doctorID}
                </StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.info}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecordPage;
