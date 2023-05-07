import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ConfirmDialog from "./ConfirmDialog";
import ApiHelper from "../helpers/apiHelper";
import loadData from "../helpers/loadData";
import Module from "./Module";

export default function TaskModal({
  open,
  setOpenTask,
  task,
  taskId,
  loadingModal,
  setLoadingModal,
  setReloadTasks,
}) {
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [newDescription, setNewDescription] = useState(task.description);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(
    () => loadData("tasks", setModules, `${taskId}/modules`),
    [loadingModal]
  );

  const createModule = () => {
    ApiHelper("modules", "post", {
      title: moduleName,
      isDone: false,
      task: `api/tasks/${taskId}`,
    })
      .then(() => {
        setModuleName("");
        setLoadingModal(!loadingModal);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const deleteTask = () => {
    ApiHelper(`tasks/${taskId}`, "delete")
      .then(() => {
        setOpenTask((prev) => !prev);
        setReloadTasks((prev) => !prev);
        enqueueSnackbar("Task successfully deleted", {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("An error occurred, Please try again.", {
          variant: "error",
        });
      });
  };

  const editDescription = () => {
    ApiHelper(
      `tasks/${taskId}`,
      "patch",
      {
        description: newDescription,
      },
      "application/merge-patch+json"
    ).then(() => {
      setLoadingModal(!loadingModal);
    });
  };

  const handleOpenEditDescription = () => {
    setIsEditActive(true);
  };

  const handleCloseEditDescription = () => {
    editDescription();
    setIsEditActive(false);
    setNewDescription("");
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{task.title}</DialogTitle>
        <DialogContent>
          {isEditActive ? (
            <form
              style={{ flexGrow: "4" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                variant="standard"
                sx={{ width: "100%" }}
                value={newDescription}
                placeholder={task.description}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleCloseEditDescription()
                }
                onChange={(e) => setNewDescription(e.target.value)}
                ref={(input) => input && input.focus()}
              />
            </form>
          ) : (
            <div style={{ display: "flex" }}>
              <DialogContentText sx={{ flexGrow: "4" }}>
                {task.description}
              </DialogContentText>
              <DialogActions>
                <IconButton onClick={handleOpenEditDescription}>
                  <EditIcon />
                </IconButton>
              </DialogActions>
            </div>
          )}
          <div style={{ display: "flex" }}>
            <TextField
              autoFocus
              margin="dense"
              id="module"
              label="Module Name"
              type="text"
              fullWidth
              variant="standard"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
            <Button sx={{ color: "text.primary" }} onClick={createModule}>
              Submit
            </Button>
          </div>
          <DialogContentText>
            {modules.length > 0 &&
              modules.map((module) => (
                <Module
                  key={module.id}
                  moduleId={module.id}
                  setLoadingModal={setLoadingModal}
                />
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={() => setConfirmOpen(true)}>Delete Task</Button>
          <ConfirmDialog
            title="Delete Task?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={deleteTask}
          >
            Are you sure you want to delete this task?
          </ConfirmDialog>
          <Button onClick={(prev) => setOpenTask(!prev)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TaskModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpenTask: PropTypes.func.isRequired,
  taskId: PropTypes.number.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        isDone: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  loadingModal: PropTypes.bool.isRequired,
  setLoadingModal: PropTypes.func.isRequired,
  setReloadTasks: PropTypes.func.isRequired,
};
