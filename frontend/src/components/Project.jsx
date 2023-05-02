import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TasksList from "./TasksList";
import CreateInputMenu from "./CreateInputMenu";
import ApiHelper from "../helpers/apiHelper";

export default function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  const loadLists = () => {
    ApiHelper(`projects/${projectId}`, "get")
      .then((res) => {
        console.info("ReloadingLists list...");
        setProject(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  useEffect(loadLists, [projectId]);

  const createList = (listName) => {
    ApiHelper("project_lists", "post", {
      title: listName,
      project: `api/projects/${projectId}`,
    })
      .then(() => {
        loadLists();
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
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
          {project && project.title}
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
