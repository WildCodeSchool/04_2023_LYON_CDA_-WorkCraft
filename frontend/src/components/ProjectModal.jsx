import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

export default function ProjectModal({ open, setOpen, createProject }) {
  const [projectName, setProjectName] = useState("");
  const [isProjectEmpty, setIsProjectEmpty] = useState(false);

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
    setIsProjectEmpty(false);
  };

  const resetForm = () => {
    setProjectName("");
    setIsProjectEmpty(false);
  };

  const handleSubscribe = (e) => {
    console.info("CLICK");
    e.preventDefault();
    if (!projectName) {
      setIsProjectEmpty(true);
      return;
    }
    createProject(projectName);
    resetForm();
    setOpen(false);
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle sx={{ textAlign: "center" }}>
          Add a new project
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            value={projectName}
            onChange={handleProjectNameChange}
          />
          {isProjectEmpty && (
            <p style={{ color: "red" }}>Please fill the project name</p>
          )}
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubscribe}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
};
