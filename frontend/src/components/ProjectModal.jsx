import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import UserList from "./UserList";
import ApiHelper from "../helpers/apiHelper";

export default function ProjectModal({ open, setOpen, loadProjects }) {
  const [projectName, setProjectName] = useState("");
  const [isProjectEmpty, setIsProjectEmpty] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateEmpty, setIsDateEmpty] = useState(false);
  const [isDatesInOrder, setIsDatesInOrder] = useState(true);
  const [selectedUser, setSelectedUser] = useState(0);

  const addProject = () => {
    ApiHelper("projects", "post", {
      title: projectName,
      owner: `api/users/${selectedUser}`,
    })
      .then(() => {
        loadProjects();
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
          <UserList setSelectedUser={setSelectedUser} />
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
  loadProjects: PropTypes.func.isRequired,
};
