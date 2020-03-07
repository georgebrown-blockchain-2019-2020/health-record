import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AccessItem from "../../components/AccessItem/AccessItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  margin: {
    margin: theme.spacing(4, 0, 2)
  },
  center: {
    textAlign: "center"
  },
  button: {
    display: "block",
    margin: "0 auto"
  }
}));
const idList = ["doctor_xssss", "patient_aaa", "patient_aaaa"];
function AccessPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [accessList, setAccessList] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAccessList([...idList]);
    }, 1000);
  }, []);
  const onDeleteItem = id => {
    let index = accessList.indexOf(id);
    setLoading(true);
    const updatedList = [
      ...accessList.slice(0, index),
      ...accessList.slice(index + 1)
    ];
    console.log(index);
    console.log(updatedList);
    setTimeout(() => {
      setLoading(false);
      setAccessList(updatedList);
    }, 1000);
  };
  const onAddItem = id => {
    setLoading(true);
    const updatedList = [...accessList, id];
    setTimeout(() => {
      setLoading(false);
      setAccessList(updatedList);
      setId("");
    }, 1000);
  };
  return (
    <div className={classes.center}>
      <h2>Access List</h2>
      <List>
        {accessList.length !== 0 &&
          accessList.map(item => (
            <AccessItem
              id={item}
              key={item}
              delete={onDeleteItem}
              isLoading={loading}
            />
          ))}
      </List>
      {loading && <CircularProgress color="secondary" />}
      <Divider />
      <TextField
        label="ID"
        variant="outlined"
        value={id}
        onChange={e => setId(e.target.value)}
        className={classes.margin}
      />
      <Button
        variant="contained"
        disabled={!id || loading}
        color="secondary"
        className={classes.button}
        onClick={() => onAddItem(id)}
      >
        Add
      </Button>
    </div>
  );
}

export default AccessPage;
