import {
  Card,
  List,
  ListItem,
  CardHeader,
  CardContent,
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  CardActions,
  Button,
  ClickAwayListener,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import Task from "./Task";
import CreateInputMenu from "./CreateInputMenu";
import ApiHelper from "../helpers/apiHelper";
import loadData from "../helpers/loadData";

export default function TasksList({ listId, deleteList, editList }) {
  const [list, setList] = useState({});
  const [newListName, setNewListName] = useState(list.title);
  const [isEditActive, setIsEditActive] = useState(false);
  const [anchorMenuElement, setAnchorMenuElement] = useState(null);
  const isMenuOpen = Boolean(anchorMenuElement);
  const handleClick = (event) => {
    setAnchorMenuElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenuElement(null);
  };

  const handleEditList = () => {
    handleClose();
    setNewListName(list.title);
    setIsEditActive(true); // Reset the editing state variable
    editList(newListName, listId);
  };

  const handleCloseEditList = () => {
    setIsEditActive(false);
    setNewListName("");
    editList(newListName, listId);
  };

  const [isCreateInputActive, setIsCreateInputActive] = useState(false);

  useEffect(() => loadData("project_lists", setList, listId), []);

  const createTask = (titleTask) => {
    ApiHelper(`tasks`, "post", {
      title: titleTask,
      description: "",
      list: `api/project_lists/${listId}`,
    }).then(() => loadData("project_lists", setList, listId));
  };

  const deleteTask = (taskId) => {
    ApiHelper(`tasks/${taskId}`, "delete").then(() =>
      loadData("project_lists", setList, listId)
    );
  };

  const handleDeleteListButton = () => {
    handleClose();
    deleteList(listId);
  };
  // //Edit task - to be continued
  // const editTask = (taskId) => {
  //   ApiHelper(`tasks/${taskId}`, "patch").then(() =>
  //     loadData("project_lists", setList, listId)
  //   );
  // };

  return (
    <Card sx={{ minWidth: 275 }}>
      {isEditActive ? (
        <ClickAwayListener onClickAway={() => handleCloseEditList(list.id)}>
          <TextField
            variant="standard"
            sx={{ width: "100%" }}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            ref={(input) => input && input.focus()}
          />
        </ClickAwayListener>
      ) : (
        <CardHeader
          title={list.title}
          align="center"
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
        />
      )}
      <CardContent>
        <List>
          {list.tasks &&
            list.tasks.map((task) => (
              <ListItem key={task.id}>
                <Task deleteTask={deleteTask} taskId={task.id} />
              </ListItem>
            ))}
        </List>
      </CardContent>
      <CardActions>
        {isCreateInputActive ? (
          <CreateInputMenu
            onSubmit={createTask}
            onClose={() => setIsCreateInputActive(false)}
            submitTextButton="Create"
            label="Task"
          />
        ) : (
          <Button
            variant="contained"
            onClick={() => setIsCreateInputActive(true)}
          >
            New List
          </Button>
        )}
      </CardActions>
      <Menu
        id="basic-menu"
        anchorEl={anchorMenuElement}
        open={isMenuOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleEditList()}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteListButton}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
}

TasksList.propTypes = {
  listId: PropTypes.number.isRequired,
  deleteList: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
};
