import {
  Card,
  Typography,
  CardContent,
  Skeleton,
  CardHeader,
  CardActionArea,
  IconButton,
  ClickAwayListener,
  TextField,
  LinearProgress,
} from "@mui/material";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import loadData from "../helpers/loadData";
import TaskModal from "./TaskModal";

export default function Task({ taskId, deleteTask, editTask, reload }) {
  const [task, setTask] = useState({});
  const [newTaskName, setNewTaskName] = useState(task.title);
  const [isEditActive, setIsEditActive] = useState(false);
  const [openAlertDeleteDialog, setOpenAlertDeleteDialog] = useState(false);

  useEffect(() => loadData("tasks", setTask, taskId), [reload]);

  const handleClickOpenTaskDelete = (e) => {
    e.stopPropagation();
    setOpenAlertDeleteDialog(true);
  };

  const handleClickOpenTaskEdit = (e) => {
    e.stopPropagation();
    setIsEditActive(true);
    setNewTaskName(task.title);
  };

  const handleCloseTaskDelete = () => {
    setOpenAlertDeleteDialog(false);
  };

  const [openTask, setOpenTask] = useState(false);

  const handleCloseTask = () => {
    setOpenTask(false);
  };

  const handleClickOpenTask = () => {
    setOpenTask(true);
  };

  const handleDeleteTaskButton = () => {
    handleCloseTask();
    deleteTask(taskId, task.title);
  };

  const handleCloseEditTask = () => {
    editTask(taskId, newTaskName);
    setIsEditActive(false);
    setNewTaskName("");
  };
  const completedModules = (currentTask) =>
    currentTask.modules.filter((module) => module.isDone);
  const percentageCompletion = (currentTask) =>
    (completedModules(currentTask).length / currentTask.modules.length) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.keys(task).length > 0 ? ( // check if task is filled or empty
        <Card>
          <TaskModal
            open={openTask}
            handleClose={handleCloseTask}
            task={task}
            taskId={task.id}
          />
          <CardHeader
            action={
              <div>
                <IconButton onClick={handleClickOpenTaskDelete}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={handleClickOpenTaskEdit}>
                  <EditIcon />
                </IconButton>
              </div>
            }
            title={
              isEditActive ? (
                <ClickAwayListener onClickAway={() => handleCloseEditTask()}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                      variant="standard"
                      sx={{ width: "100%" }}
                      value={newTaskName}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleCloseEditTask()
                      }
                      onChange={(e) => setNewTaskName(e.target.value)}
                      ref={(input) => input && input.focus()}
                    />
                  </form>
                </ClickAwayListener>
              ) : (
                <span style={{ color: "primary" }}>{task.title}</span>
              )
            }
          />
          <CardActionArea onClick={handleClickOpenTask}>
            <CardContent>
              <Typography
                sx={{ color: "secondary", fontSize: 14 }}
                color="initial"
              >
                {task.description}
              </Typography>
              <Typography sx={{ fontSize: 10 }} color="initial">
                {task.modules.length > 0 && (
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={percentageCompletion(task)}
                  />
                )}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={210}
          height={Math.floor(Math.random() * 80) + 20}
        />
      )}
      <Dialog
        open={openAlertDeleteDialog}
        onClose={handleCloseTask}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Would you like to delete this task?
        </DialogTitle>
        <DialogActions>
          <Button
            sx={{ color: "text.primary" }}
            onClick={handleCloseTaskDelete}
          >
            Disagree
          </Button>
          <Button
            sx={{ color: "text.primary" }}
            onClick={handleDeleteTaskButton}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Task.propTypes = {
  taskId: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  reload: PropTypes.bool.isRequired,
};
