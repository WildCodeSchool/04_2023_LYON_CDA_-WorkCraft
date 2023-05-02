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

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
        }}
      >
        <Typography variant="h3" color="primary.contrastText" align="center">
          {selectedProject && selectedProject.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "left",
          gap: 5,
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
