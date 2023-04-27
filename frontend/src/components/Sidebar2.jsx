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
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Fab } from "@mui/material";
import PrimarySearchAppBar from "./Searchbar";
import ProjectItem from "./ProjectItem";
import ProjectModal from "./ProjectModal";
import ApiHelper from "../helpers/apiHelper";

export default function Sidebar2({ toggleDrawer, isDrawerOpen }) {
  const [projects, setProjects] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [collapseList, setCollapseList] = useState({});
  const toggleCollapse = (id) => {
    setCollapseList({ ...collapseList, [id]: !collapseList[id] });
  };

  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);

  const loadProjects = () => {
    ApiHelper("projects", "get")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  useEffect(loadProjects, []);

  return (
    <div>
      <Fab
        color="primary"
        aria-label="edit"
        size="small"
        sx={{
          marginLeft: isDrawerOpen ? 19 : -4,
          marginTop: "50vh",
          zIndex: 3000,
          transition: "all 0.1s",
        }}
        onClick={() => toggleDrawer()}
      >
        {isDrawerOpen ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </Fab>
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
              <Button
                variant="contained"
                onClick={() => setOpenCreateProjectModal(true)}
              >
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
                  <ProjectItem
                    toggleCollapse={toggleCollapse}
                    collapseList={collapseList}
                    loadProjects={loadProjects}
                    project={project}
                    key={project.id}
                  />
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
      <ProjectModal
        open={openCreateProjectModal}
        setOpen={setOpenCreateProjectModal}
        loadProjects={loadProjects}
      />
    </div>
  );
}

Sidebar2.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};
