import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TasksList from "./TasksList";
import CreateInputMenu from "./CreateInputMenu";

export default function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  const loadLists = () => {
    axios
      .get(`http://localhost/api/projects/${projectId}.json`)
      .then((res) => {
        console.info("ReloadingLists list...");
        console.info(res.data);
        setProject(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const createList = (listName) => {
    axios
      .post("http://localhost/api/project_lists", {
        title: listName,
        project: `api/projects/${projectId}`,
      })
      .then(loadLists);
  };

  useEffect(loadLists, [projectId]);

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
          {project && project.title}
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
        {project.lists &&
          project.lists.map((list) => (
            <TasksList key={list.id} listId={list.id} loadLists={loadLists} />
          ))}
        <CreateInputMenu
          onSubmit={createList}
          submitTextButton="Create"
          label="List"
        />
      </Box>
    </Box>
  );
}
