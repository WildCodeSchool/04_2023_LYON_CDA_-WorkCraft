import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { Fab } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ApiHelper from "../helpers/apiHelper";
import loadData from "../helpers/loadData";
import PrimarySearchAppBar from "./Searchbar";
import ProjectItem from "./ProjectItem";
import ProjectModal from "./ProjectModal";

export default function Sidebar2({
  toggleDrawer,
  isDrawerOpen,
  setSelectedProject,
  selectedProject,
  projects,
  setProjects,
}) {
  const [searchValue, setSearchValue] = useState("");

  const [collapseList, setCollapseList] = useState({});
  const toggleCollapse = (id) => {
    setCollapseList({ ...collapseList, [id]: !collapseList[id] });
  };

  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const createProject = (projectName) => {
    ApiHelper("projects", "post", {
      title: projectName,
      owner: "api/users/1",
    })
      .then((res) => {
        loadData("projects", setProjects);
        navigate(`/projects/${res.data.id}`);
        enqueueSnackbar(`Project "${projectName}" successfully created`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("An error occurred, Please try again.", {
          variant: "error",
        });
      });
  };

  const editProject = (newProjectName, projectId) => {
    console.info(`edit id : ${projectId}`);
    ApiHelper(
      `projects/${projectId}`,
      "patch",
      {
        title: newProjectName,
      },
      "application/merge-patch+json"
    )
      .then(() => {
        loadData("projects", setProjects);
        enqueueSnackbar(`Project "${newProjectName}" successfully edited`, {
          variant: "success",
        });
        if (selectedProject?.id === projectId)
          loadData("projects", setSelectedProject, projectId);
      })
      .catch(() => {
        enqueueSnackbar("An error occurred, Please try again.", {
          variant: "error",
        });
      });
  };

  const deleteProject = (projectId, projectName) => {
    console.info(`Deleting project : ${projectId}`);
    ApiHelper(`projects/${projectId}`, "delete")
      .then(() => {
        enqueueSnackbar(`Project "${projectName}" successfully deleted`, {
          variant: "success",
        });
        loadData("projects", setProjects);
        if (projectId === selectedProject.id) {
          setSelectedProject({});
          navigate("/");
        }
      })
      .catch(() => {
        enqueueSnackbar("An error occurred, Please try again.", {
          variant: "error",
        });
      });
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="edit"
        size="small"
        sx={{
          position: "fixed",
          left: isDrawerOpen ? 230 : 45,
          top: "50vh",
          zIndex: 1300,
          transition: "all 0.25s",
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
                    deleteProject={deleteProject}
                    editProject={editProject}
                    project={project}
                    key={project.id}
                  />
                );
              })}
            {/* Button collapse */}
          </List>
        </Box>
      </Drawer>
      <ProjectModal
        open={openCreateProjectModal}
        setOpen={setOpenCreateProjectModal}
        createProject={createProject}
      />
    </div>
  );
}

Sidebar2.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  selectedProject: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    lists: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
  }),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      lists: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  setProjects: PropTypes.func.isRequired,
};

Sidebar2.defaultProps = {
  selectedProject: null,
};
