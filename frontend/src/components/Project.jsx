import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import data from "../data";
import TasksList from "./TasksList";

export default function Project() {
  const { projectId } = useParams();
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
          {
            data.projects.find(
              (project) => project.id === parseInt(projectId, 10)
            ).title
          }
        </Typography>
      </Box>
      <Box style={{ display: "flex", justifyContent: "left", gap: 20 }}>
        {data.lists
          .filter((list) => list.projectId === parseInt(projectId, 10))
          .map((list) => (
            <TasksList key={list.id} listId={list.id} />
          ))}
      </Box>
    </Box>
  );
}
