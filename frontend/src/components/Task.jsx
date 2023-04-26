import {
  Card,
  Typography,
  CardContent,
  Skeleton,
  ListItemButton,
  CardHeader,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function Task({ taskId, loadTasks }) {
  const [task, setTask] = useState({});
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost/api/tasks/${taskId}.json`)
      .then((res) => {
        console.info(res.data);
        setTask(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  }, []);

  const handleClickOpen = () => {
    setOpenAlertDialog(true);
  };

  const handleClose = () => {
    setOpenAlertDialog(false);
  };

  const handleDeleteTask = () => {
    handleClose();
    axios.delete(`http://localhost/api/tasks/${taskId}.json`).then(() => {
      loadTasks();
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.keys(task).length > 0 ? ( // check if task is filled or empty
        <Card>
          <CardHeader
            action={
              <ListItemButton onClick={handleClickOpen}>
                <DeleteIcon />
              </ListItemButton>
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
                  .reduce((accumulator, current) => accumulator + current)} / ${
                  task.modules.length
                }`}
            </Typography>
          </CardContent>
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
        open={openAlertDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Would you like to delete this task?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
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
