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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import CreateInputMenu from "./CreateInputMenu";

export default function TasksList({ listId, loadLists }) {
  const [list, setList] = useState({});
  const [anchorMenuElement, setAnchorMenuElement] = useState(null);
  const isMenuOpen = Boolean(anchorMenuElement);
  const handleClick = (event) => {
    setAnchorMenuElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenuElement(null);
  };
  const handleDeleteList = () => {
    handleClose();
    axios
      .delete(`http://localhost/api/project_lists/${listId}.json`)
      .then(loadLists);
  };

  const loadTasks = () => {
    axios
      .get(`http://localhost/api/project_lists/${listId}.json`)
      .then((res) => {
        console.info(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  useEffect(loadTasks, []);

  const createTask = (titleTask) => {
    axios
      .post(`http://localhost/api/tasks`, {
        title: titleTask,
        description: "",
        list: `api/project_lists/${listId}`,
      })
      .then(() => {
        loadTasks();
      });
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={list.title}
        align="center"
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <List>
          {list.tasks &&
            list.tasks.map((task) => (
              <ListItem key={task.id}>
                <Task loadTasks={loadTasks} taskId={task.id} />
              </ListItem>
            ))}
        </List>
      </CardContent>
      <CardActions>
        <CreateInputMenu
          onSubmit={createTask}
          submitTextButton="Create"
          label="Task"
        />
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
        <MenuItem onClick={handleDeleteList}>
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
  loadLists: PropTypes.func.isRequired,
};
