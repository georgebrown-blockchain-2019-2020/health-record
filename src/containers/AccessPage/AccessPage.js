import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AccessItem from "../../components/AccessItem/AccessItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import axios from "axios";
import {
  GET_ACCESS_LIST_URL,
  DATABASE_URL,
  ADD_PERMISSION_URL,
  DELETE_PERMISSION_URL
} from "../../api";
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
function AccessPage(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessList, setAccessList] = useState([]);
  const [id, setId] = useState("");
  const getAccessList = useCallback(async () => {
    setLoading(true);
    const list = await axios.get(`${GET_ACCESS_LIST_URL}?id=${props.userId}`);
    const updatedList = [];
    try {
      if (list.data.status === "success") {
        for (let i = 0; i < list.data.data.length; i++) {
          const detail = await axios.get(
            `${DATABASE_URL}/information.json?auth=${props.token}&orderBy="userId"&equalTo="${list.data.data[i].id}"`
          );
          console.log(detail);
          for (let key in detail.data) {
            let user = {
              ...list.data.data[i],
              name: detail.data[key].userName
            };

            updatedList.push(user);
          }
        }
        setAccessList(updatedList);
        setLoading(false);
      } else {
        setLoading(false);
        setError(list.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.toString());
    }
  }, [props.token, props.userId]);
  useEffect(() => {
    getAccessList();
  }, [getAccessList]);
  const onDeleteItem = id => {
    let index = accessList.findIndex(item => item.id === id);
    setLoading(true);
    axios
      .delete(
        `${DELETE_PERMISSION_URL}?id=${props.userId}&permissionedID=${id}`
      )
      .then(result => {
        setLoading(false);
        console.log(result);
        if (result.data.status === "success") {
          const updatedList = [
            ...accessList.slice(0, index),
            ...accessList.slice(index + 1)
          ];
          console.log(updatedList);
          setAccessList(updatedList);
        }
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };
  const onAddItem = id => {
    setLoading(true);
    axios
      .get(
        `${DATABASE_URL}/information.json?auth=${props.token}&orderBy="userId"&equalTo="${id}"`
      )
      .then(infor => {
        console.log(infor);
        for (let key in infor.data) {
          axios
            .put(ADD_PERMISSION_URL, {
              id: props.userId,
              permissionedID: id.toString(),
              role: infor.data[key].role
            })
            .then(result => {
              if (result.data.status === "success") {
                const updatedList = [
                  ...accessList,
                  {
                    id: infor.data[key].userId,
                    role: infor.data[key].role,
                    name: infor.data[key].userName
                  }
                ];
                setAccessList(updatedList);
                setId("");
                setLoading(false);
              }
            })
            .catch(error => {
              setLoading(false);
              setError(error);
            });
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  };
  let accessListContent;
  if (accessList.length !== 0) {
    accessListContent = accessList.map(item => (
      <AccessItem
        item={item}
        key={item}
        delete={onDeleteItem}
        isLoading={loading}
      />
    ));
  }
  console.log(accessListContent);
  return (
    <div className={classes.center}>
      <h2>Access List</h2>
      <div>{error}</div>
      <List>{accessListContent}</List>
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
const mapStateToProps = state => {
  return {
    role: state.role,
    userId: state.userId,
    authRedirectPath: state.authRedirectPath,
    token: state.token
  };
};
export default connect(mapStateToProps)(AccessPage);
