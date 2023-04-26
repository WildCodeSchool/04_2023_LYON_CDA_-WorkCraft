import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox } from "@mui/material";

export default function TaskModal({ open, handleClose, task }) {
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{task.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{task.description}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="module"
            label="Module Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText>
            {task.modules.length > 0 &&
              task.modules.map((module) => (
                <div key={module.id} style={{ display: "flex" }}>
                  <Checkbox checked={module.isDone} />
                  <p>{module.title}</p>
                </div>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TaskModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
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
