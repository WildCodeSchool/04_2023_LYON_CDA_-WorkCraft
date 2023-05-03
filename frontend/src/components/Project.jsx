import { useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import loadData from "../helpers/loadData";
import TasksList from "./TasksList";
import CreateInputMenu from "./CreateInputMenu";
import ApiHelper from "../helpers/apiHelper";
import { useSnackbar } from "notistack";

export default function Project() {
  const { projectId } = useParams();
  const [selectedProject, setSelectedProject] = useOutletContext();
  const [isCreateInputActive, setIsCreateInputActive] = useState(false);

  useEffect(
    () => loadData("projects", setSelectedProject, projectId),
    [projectId]
  );

  const { enqueueSnackbar } = useSnackbar();

  const createList = (listName) => {
    setIsCreateInputActive(false);
    ApiHelper("project_lists", "post", {
      title: listName,
      project: `api/projects/${projectId}`,
    })
      .then(() => {
        loadData("projects", setSelectedProject, projectId);
        enqueueSnackbar(`List "${listName}" successfully created`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("An error occured, Please try again.", {
          variant: "error",
        });
      });
  };

  const deleteList = (listId) => {
    ApiHelper(`project_lists/${listId}`, "delete").then(() =>
      loadData("projects", setSelectedProject, projectId)
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <Typography variant="h3" color="primary.contrastText" align="center">
          {selectedProject && selectedProject.title}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "left",
          gap: 20,
        }}
      >
        {selectedProject.lists &&
          selectedProject.lists.map((list) => (
            <TasksList key={list.id} listId={list.id} deleteList={deleteList} />
          ))}
        {isCreateInputActive ? (
          <CreateInputMenu
            onSubmit={createList}
            onClose={() => setIsCreateInputActive(false)}
            submitTextButton="Create"
            label="List"
          />
        ) : (
          <Button
            variant="contained"
            onClick={() => setIsCreateInputActive(true)}
          >
            New List
          </Button>
        )}
      </Box>
    </Box>
  );
}
