import {
  Card,
  Typography,
  CardContent,
  Skeleton,
  CardHeader,
  CardActionArea,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TaskModal from "./TaskModal";
import ApiHelper from "../helpers/apiHelper";

export default function Task({ taskId, loadTasks }) {
  const [task, setTask] = useState({});
  const [openAlertDeleteDialog, setOpenAlertDeleteDialog] = useState(false);

  const loadTask = () => {
    ApiHelper(`tasks/${taskId}`, "get")
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  useEffect(loadTask, []);

  const handleClickOpenTaskDelete = (e) => {
    e.stopPropagation();
    setOpenAlertDeleteDialog(true);
  };

  const handleCloseTaskDelete = () => {
    setOpenAlertDeleteDialog(false);
  };

  const [openTask, setOpenTask] = useState(false);

  const handleClickOpenTask = () => {
    setOpenTask(true);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
  };

  const handleDeleteTask = () => {
    handleCloseTask();
    ApiHelper(`tasks/${taskId}`, "delete").then(() => {
      loadTasks();
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.keys(task).length > 0 ? ( // check if task is filled or empty
        <Card>
          <TaskModal
            open={openTask}
            handleClose={handleCloseTask}
            task={task}
          />
          <CardActionArea onClick={handleClickOpenTask}>
            <CardHeader
              action={
                <IconButton onClick={handleClickOpenTaskDelete}>
                  <DeleteIcon />
                </IconButton>
              }
              title={task.title}
              titleTypographyProps={{
                color: "primary",
              }}
            />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="initial">
                {task.description}
              </Typography>
              <Typography sx={{ fontSize: 10 }} color="initial">
                {task.modules.length > 0 &&
                  `Modules : ${task.modules
                    .map((module) => (module.isDone ? 1 : 0))
                    .reduce(
                      (accumulator, current) => accumulator + current
                    )} / ${task.modules.length}`}
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
          <Button onClick={handleCloseTaskDelete}>Disagree</Button>
          <Button onClick={handleDeleteTask} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Task.propTypes = {
  taskId: PropTypes.number.isRequired,
  loadTasks: PropTypes.func.isRequired,
};
