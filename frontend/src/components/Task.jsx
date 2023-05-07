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
        <Card>
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
                <span style={{ color: "primary" }}>{task.title}</span>
              )
            }
          />
          <CardActionArea onClick={handleOpenModal}>
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
