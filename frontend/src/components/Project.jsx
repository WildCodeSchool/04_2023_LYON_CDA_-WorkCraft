import { useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import loadData from "../helpers/loadData";
import TasksList from "./TasksList";
import CreateInputMenu from "./CreateInputMenu";
import ApiHelper from "../helpers/apiHelper";

export default function Project() {
  const { projectId } = useParams();
  const [selectedProject, setSelectedProject] = useOutletContext();
  const [isCreateInputActive, setIsCreateInputActive] = useState(false);
  const [reloadList, setReloadList] = useState(false);

  useEffect(
    () => loadData("projects", setSelectedProject, projectId),
    [projectId]
  );

  const createList = (listName) => {
    setIsCreateInputActive(false);
    ApiHelper("project_lists", "post", {
      title: listName,
      project: `api/projects/${projectId}`,
    })
      .then(() => {
        loadData("projects", setSelectedProject, projectId);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const deleteList = (listId) => {
    ApiHelper(`project_lists/${listId}`, "delete").then(() =>
      loadData("projects", setSelectedProject, projectId)
    );
  };

  // Edit List
  const editList = (listId, newListName) => {
    ApiHelper(
      `project_lists/${listId}`,
      "patch",
      {
        title: newListName,
      },
      "application/merge-patch+json"
    ).then(() => {
      loadData("projects", setSelectedProject, projectId);
      setReloadList(!reloadList);
    });
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
            <TasksList
              key={list.id}
              listId={list.id}
              deleteList={deleteList}
              editList={editList}
              reloadList={reloadList}
            />
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
