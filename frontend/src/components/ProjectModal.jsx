import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import axios from "axios";

export default function ProjectModal({ open, setOpen }) {
  const [projectName, setProjectName] = React.useState("");
  const [isProjectEmpty, setIsProjectEmpty] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isDateEmpty, setIsDateEmpty] = React.useState(false);
  const [isDatesInOrder, setIsDatesInOrder] = React.useState(true);

  const addProject = () => {
    axios
      .post("http://localhost/api/projects", {
        title: projectName,
        owner: "api/users/5",
      })
      .then((res) => {
        console.info(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
    setIsProjectEmpty(false);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setIsDateEmpty(false);
    setIsDatesInOrder(true);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setIsDateEmpty(false);
    setIsDatesInOrder(true);
  };

  const handleSubscribe = () => {
    if (!projectName) {
      setIsProjectEmpty(true);
      return;
    }
    if (!startDate || !endDate) {
      setIsDateEmpty(true);
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setIsDatesInOrder(false);
      return;
    }
    addProject();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Add a new project</DialogTitle>
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
          <InputLabel>Starting date</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="date"
            fullWidth
            variant="standard"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <InputLabel>Ending date</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="date"
            fullWidth
            variant="standard"
            value={endDate}
            onChange={handleEndDateChange}
          />
          {isDateEmpty && (
            <p style={{ color: "red" }}>Please fill the date field</p>
          )}
          {!isDatesInOrder && (
            <p style={{ color: "red" }}>
              Please fill the dates in the correct order
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubscribe}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
