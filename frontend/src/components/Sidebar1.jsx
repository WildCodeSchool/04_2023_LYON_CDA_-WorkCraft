import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import * as React from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import ApiHelper from "../helpers/apiHelper";
import data from "../data";
import data2 from "../data2";

export default function Sidebar1({ toggleDarkMode, toggleDrawer }) {
  const navigate = useNavigate();
  const createFakeData = () => {
    ApiHelper("projects", "post", data)
      .then(() => {
        console.info("ok");
      })
      .catch(() => {
        console.info("nop");
      });
    ApiHelper("projects", "post", data2)
      .then(() => {
        console.info("ok");
      })
      .catch(() => {
        console.info("nop");
      });
  };

  function miniButton(icon, onClick = () => {}) {
    return (
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          onClick={onClick}
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: 65,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: 65,
            overflowX: "hidden",
          },
        }}
      >
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <List>
            {miniButton(<SearchIcon />, () => toggleDrawer())}
            {miniButton(<SettingsIcon />, createFakeData)}
          </List>
          <List>
            {miniButton(<DarkModeIcon />, toggleDarkMode)}
            {miniButton(<HomeIcon />, () => navigate("/"))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

Sidebar1.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};
