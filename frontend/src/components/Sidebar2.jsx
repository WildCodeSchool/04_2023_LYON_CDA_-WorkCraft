import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";
import PrimarySearchAppBar from "./Searchbar";
import data from "../data";

export default function Sidebar2({ setOpenModal }) {
  const [state, setState] = React.useState({
    left: false,
    openProjectCollapse: {}, // new state object to keep track of project collapses
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleProjectCollapse = (projectId) => {
    setState({
      ...state,
      openProjectCollapse: {
        ...state.openProjectCollapse,
        [projectId]: !state.openProjectCollapse[projectId],
      },
    });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" ? "auto" : 250,
      }}
      role="presentation"
    >
      <List>
        {/* SearchBar */}
        <PrimarySearchAppBar />

        {/* New Project Button */}
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            New project <AddIcon />
          </Button>
        </Stack>
        {data.projects.map((project) => (
          <div key={project.id}>
            <ListItem
              key={project.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon>
                  <DateRangeIcon />
                </ListItemIcon>
                <Link
                  to={`/projects/${project.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemText primary={project.title} />
                </Link>
              </Box>
              <ListItemButton
                onClick={() => handleProjectCollapse(project.id)}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {state.openProjectCollapse[project.id] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>
            <Collapse
              in={state.openProjectCollapse[project.id]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </div>
        ))}

        {/* Button collapse */}
      </List>
      <Divider />
      <List>
        {data.projects.map((project) => (
          <ListItem key={project.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary={project.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ marginLeft: state[anchor] ? 19 : -4 }}
            onClick={toggleDrawer(anchor, !state[anchor])}
          >
            {!state[anchor] ? (
              <KeyboardDoubleArrowRightIcon />
            ) : (
              <KeyboardDoubleArrowLeftIcon />
            )}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

Sidebar2.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};
