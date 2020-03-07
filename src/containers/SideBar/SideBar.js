import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Drawer } from "@material-ui/core";
import SidebarNav from "../../components/SideBarNav/SideBarNav";
import CreateIcon from "@material-ui/icons/Create";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { connect } from "react-redux";
const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)"
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, role } = props;

  const classes = useStyles();
  const doctorPages = [
    {
      title: "Description",
      href: "/description",
      icon: <CreateIcon />
    },
    {
      title: "Patient's Record",
      href: "/patientrecord",
      icon: <LocalHospitalIcon />
    }
  ];
  const patientPages = [
    {
      title: "Record",
      href: "/record",
      icon: <FavoriteIcon />
    },
    {
      title: "Patient's Record",
      href: "/patientrecord",
      icon: <LocalHospitalIcon />
    },
    {
      title: "Access List",
      href: "/accesslist",
      icon: <LockOpenIcon />
    }
  ];
  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={clsx(classes.root, className)}>
        <SidebarNav
          className={classes.nav}
          pages={role === "patient" ? patientPages : doctorPages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};
const mapStateToProps = state => {
  return {
    role: state.role
  };
};

export default connect(mapStateToProps)(Sidebar);
