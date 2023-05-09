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
import EditIcon from "@mui/icons-material/Edit";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDrag } from "react-dnd";
import loadData from "../helpers/loadData";
import TaskModal from "./TaskModal";

export default function Task({
  taskId,
  editTask,
  reloadTasks,
  listId,
  setReloadTasks,
}) {
  const [openTask, setOpenTask] = useState(false);
  const [task, setTask] = useState({
    id: taskId,
    title: "",
    description: "",
    modules: [],
  });
  const [newTaskName, setNewTaskName] = useState(task.title);
  const [isEditActive, setIsEditActive] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(
    () => loadData("tasks", setTask, taskId),
    [reloadTasks, loadingModal]
  );

  const handleOpenModal = () => {
    setOpenTask(true);
    setLoadingModal(!loadingModal);
  };

  const handleClickOpenTaskEdit = (e) => {
    e.stopPropagation();
    setIsEditActive(true);
    setNewTaskName(task.title);
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

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: taskId, sourceListId: listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", opacity }}
      ref={drag}
    >
      {Object.keys(task).length > 0 ? ( // check if task is filled or empty
        <Card
          sx={{
            margin: "10px 0",
            minWidth: "250px",
            bgcolor: "background.card",
          }}
        >
          <TaskModal
            open={openTask}
            setOpenTask={setOpenTask}
            task={task}
            taskId={task.id}
            loadingModal={loadingModal}
            setLoadingModal={setLoadingModal}
            setReloadTasks={setReloadTasks}
          />
          <CardHeader
            sx={{ padding: "8px 16px" }}
            action={
              <div>
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
                <Typography variant="h4" color="initial">
                  <span style={{ color: "primary" }}>{task.title}</span>
                </Typography>
              )
            }
          />
          <CardActionArea onClick={handleOpenModal}>
            <CardContent sx={{ padding: "0 16px", minHeight: "30px" }}>
              <Typography
                variant="p"
                sx={{ color: "secondary" }}
                color="initial"
              >
                {task.description}
              </Typography>
              {task.modules.length > 0 && (
                <Typography
                  sx={{
                    fontSize: 10,
                    padding: "12px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                  color="initial"
                >
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={percentageCompletion(task)}
                    sx={{ width: "100%", margin: "0 8px" }}
                  />
                  {`${Math.round(percentageCompletion(task))}`}%
                </Typography>
              )}
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
    </div>
  );
}

Task.propTypes = {
  taskId: PropTypes.number.isRequired,
  listId: PropTypes.number.isRequired,
  editTask: PropTypes.func.isRequired,
  reloadTasks: PropTypes.bool.isRequired,
  setReloadTasks: PropTypes.func.isRequired,
};
