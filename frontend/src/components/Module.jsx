import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  ClickAwayListener,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./ConfirmDialog";
import ApiHelper from "../helpers/apiHelper";
import loadData from "../helpers/loadData";

export default function Module({ moduleId, setLoadingModal }) {
  const [loadingModule, setLoadingModule] = useState(true);
  const [isEditActive, setIsEditActive] = useState(false);
  const [newName, setNewName] = useState("");
  const [module, setModule] = useState({
    id: 0,
    title: "Please Wait",
    isDone: false,
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => loadData("modules", setModule, moduleId), [loadingModule]);

  const handleCheckbox = (checked) => {
    ApiHelper(
      `modules/${moduleId}`,
      "patch",
      {
        isDone: checked,
      },
      "application/merge-patch+json"
    )
      .then(() => {
        setLoadingModule(!loadingModule);
        setLoadingModal((prev) => !prev);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const handleEditModule = (newModuleName) => {
    ApiHelper(
      `modules/${moduleId}`,
      "patch",
      {
        title: newModuleName,
      },
      "application/merge-patch+json"
    )
      .then(() => {
        setLoadingModule(!loadingModule);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const deleteModule = () => {
    ApiHelper(`modules/${moduleId}`, "delete")
      .then(() => {
        setLoadingModal((prev) => !prev);
        setConfirmOpen(false);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const handleEdit = () => {
    setIsEditActive(true);
    setNewName(module.title);
    console.info(module.title);
  };

  const handleCloseEdit = () => {
    setIsEditActive(false);
    setNewName("");
    handleEditModule(newName);
  };

  return (
    <div style={{ display: "flex" }}>
      <Checkbox
        checked={module.isDone}
        onChange={(e) => handleCheckbox(e.target.checked)}
      />
      {isEditActive ? (
        <ClickAwayListener onClickAway={handleCloseEdit}>
          <TextField
            variant="standard"
            sx={{ flexGrow: "4" }}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            ref={(input) => input && input.focus()}
          />
        </ClickAwayListener>
      ) : (
        <p style={{ flexGrow: "4" }}>{module.title}</p>
      )}
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => setConfirmOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <ConfirmDialog
        title="Delete Module?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteModule}
      >
        Are you sure you want to delete this module?
      </ConfirmDialog>
    </div>
  );
}

Module.propTypes = {
  moduleId: PropTypes.number.isRequired,
  setLoadingModal: PropTypes.func.isRequired,
};
