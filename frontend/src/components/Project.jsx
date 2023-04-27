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
          createFunction={createList}
          submitText="Create"
          labelInput="List Name"
        />
      </Box>
    </Box>
  );
}
