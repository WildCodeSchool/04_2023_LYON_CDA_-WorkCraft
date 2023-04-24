import * as React from "react";
import { useState, useEffect } from "react";
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
import { NavLink } from "react-router-dom";
import axios from "axios";
import PrimarySearchAppBar from "./Searchbar";

export default function Sidebar2({ setOpenModal, toggleDrawer, isDrawerOpen }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost/api/projects.json?owner.username=supzero`)
      .then((res) => {
        console.info(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const [collapseList, setCollapseList] = useState({});
  function toggleCollapse(id) {
    setCollapseList({ ...collapseList, [id]: !collapseList[id] });
  }

  return (
    <div>
      <Button
        sx={{ marginLeft: isDrawerOpen ? 19 : -4 }}
        onClick={() => toggleDrawer()}
      >
        {isDrawerOpen ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </Button>
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer()}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {/* SearchBar */}
            <PrimarySearchAppBar
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />

            {/* New Project Button */}
            <Stack
              spacing={2}
              direction="row"
              sx={{
                marginTop: 2,
                marginBottom: 1,
                ml: 2,
              }}
            >
              <Button variant="contained" onClick={() => setOpenModal(true)}>
                New project <AddIcon />
              </Button>
            </Stack>
            {projects
              .filter((project) =>
                project.title
                  .toLocaleLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(
                    searchValue
                      .toLocaleLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                  )
              )
              .map((project) => {
                return (
                  <div key={project.id}>
                    <ListItem
                      key={project.id}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ListItemIcon>
                          <DateRangeIcon />
                        </ListItemIcon>
                        <NavLink
                          to={`/projects/${project.id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <ListItemText primary={project.title} />
                        </NavLink>
                      </Box>
                      {collapseList[project.id] ? (
                        <ExpandLess
                          sx={{ cursor: "pointer" }}
                          onClick={() => toggleCollapse(project.id)}
                        />
                      ) : (
                        <ExpandMore
                          sx={{ cursor: "pointer" }}
                          onClick={() => toggleCollapse(project.id)}
                        />
                      )}
                    </ListItem>
                    <Collapse
                      in={collapseList[project.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {project.lists.map((list) => {
                          return (
                            <ListItemButton sx={{ pl: 4 }} key={list.id}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary={list.title} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </div>
                );
              })}

            {/* Button collapse */}
          </List>
          <Divider />
          <List>
            {projects
              .filter((project) =>
                project.title
                  .toLocaleLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(
                    searchValue
                      .toLocaleLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                  )
              )
              .map((project) => (
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
      </Drawer>
    </div>
  );
}

Sidebar2.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};
