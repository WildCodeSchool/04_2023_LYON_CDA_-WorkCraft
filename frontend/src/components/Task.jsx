import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import data from "../data";

export default function Task({ taskId }) {
  const selectedTask = data.tasks.find((task) => task.id === taskId);
  return (
    <Chip label={selectedTask.title} color="primary" sx={{ width: "100%" }} />
  );
}

Task.propTypes = {
  taskId: PropTypes.number.isRequired,
};
