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
import axios from "axios";
import PrimarySearchAppBar from "./Searchbar";
import ProjectItem from "./ProjectItem";

export default function Sidebar2({
  setOpenModal,
  toggleDrawer,
  isDrawerOpen,
  loading,
  setLoading,
}) {
  const [projects, setProjects] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [collapseList, setCollapseList] = useState({});
  const toggleCollapse = (id) => {
    setCollapseList({ ...collapseList, [id]: !collapseList[id] });
  };

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
  }, [loading]);

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
                  <ProjectItem
                    toggleCollapse={toggleCollapse}
                    collapseList={collapseList}
                    project={project}
                    loading={loading}
                    setLoading={setLoading}
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
    </div>
  );
}

Sidebar2.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};
