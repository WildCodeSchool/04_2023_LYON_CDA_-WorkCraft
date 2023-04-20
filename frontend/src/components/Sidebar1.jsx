import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Sidebar2 from "./Sidebar2";
import ProjectModal from "./ProjectModal";

export default function Sidebar1() {
  const [openModal, setOpenModal] = React.useState(false);

  function miniButton(icon, onClick = undefined) {
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
      <ProjectModal open={openModal} setOpen={setOpenModal} />
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
            {miniButton(<PersonIcon />)}
            {miniButton(<SearchIcon />)}
            {miniButton(<SettingsIcon />)}
          </List>
          <Divider />
          <List>
            {miniButton(<DarkModeIcon />)}
            {miniButton(<PowerSettingsNewIcon />)}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          width: "0px",
          zIndex: 1500,
        }}
      >
        <Sidebar2 openModal={openModal} setOpenModal={setOpenModal} />
      </Box>
    </Box>
  );
}
