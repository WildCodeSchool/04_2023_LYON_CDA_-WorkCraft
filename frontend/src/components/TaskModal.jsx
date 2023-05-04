import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ApiHelper from "../helpers/apiHelper";
import loadData from "../helpers/loadData";
import Module from "./Module";

export default function TaskModal({ open, handleClose, task, taskId }) {
  const [loadingModal, setLoadingModal] = useState(false);
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState("");

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
        loadData("tasks", setModules, `${taskId}/modules`);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{task.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{task.description}</DialogContentText>
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
        <DialogActions>
          <Button sx={{ color: "text.primary" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: "text.primary" }} onClick={handleClose}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TaskModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
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
};
