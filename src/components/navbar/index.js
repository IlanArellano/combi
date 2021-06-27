import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/FormatListBulleted";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ArrowForward";

import "./styles/index.css";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const useStyles = makeStyles({
  list: {
    width: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  icon: {
    color: "#ffffff",
    fontSize: 27,
  },
  logout: {
    color: "red",
    fontSize: 27,
    fontWeight: "bold",
    cursor: "pointer",
  },
});

export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { getUser, logout } = useUser();

  const { user } = getUser();

  const toggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const ListDraw = () => {
    return (
      <div onClick={toggle} className={classes.list}>
        <div>
          <List>
            <ListItem component={Link} to="/home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem component={Link} to="/configuracion">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configuración de Recorridos" />
            </ListItem>
          </List>
        </div>
        <div>
          <List>
            <ListItem onClick={handleLogout} className={classes.logout}>
              <ListItemIcon>
                <LogoutIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItem>
          </List>
        </div>
      </div>
    );
  };

  return (
    <nav className="Nav">
      <div className="Items">
        <div>
          <LightTooltip title="Menú" arrow>
            <IconButton onClick={toggle}>
              <ListIcon className={classes.icon} />
            </IconButton>
          </LightTooltip>
        </div>
        <div className="Item1">
          <div>
            <h3>{user}</h3>
          </div>
          <div>
            <LightTooltip title="Salir" arrow>
              <IconButton onClick={handleLogout}>
                <LogoutIcon className={classes.logout} />
              </IconButton>
            </LightTooltip>
          </div>
        </div>
      </div>
      <div>
        <Drawer anchor="left" open={open} onClose={toggle}>
          <ListDraw />
        </Drawer>
      </div>
    </nav>
  );
}
