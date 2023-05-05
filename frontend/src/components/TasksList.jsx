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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDrop } from "react-dnd";
import Task from "./Task";
import CreateInputMenu from "./CreateInputMenu";
import ApiHelper from "../helpers/apiHelper";
import loadData from "../helpers/loadData";

export default function TasksList({
  listId,
  deleteList,
  setReloadListId,
  reloadListId,
}) {
  const [list, setList] = useState({});
  const [anchorMenuElement, setAnchorMenuElement] = useState(null);
  const [, setDraggingTaskId] = useState(null);
  const isMenuOpen = Boolean(anchorMenuElement);
  const handleClick = (event) => {
    setAnchorMenuElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenuElement(null);
  };

  const [isCreateInputActive, setIsCreateInputActive] = useState(false);

  useEffect(() => loadData("project_lists", setList, listId), [listId]);

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

  const LoadOnDrop = (item) => {
    ApiHelper(
      `tasks/${item.id}`,
      "patch",
      {
        list: `api/project_lists/${listId}`,
      },
      "application/merge-patch+json"
    ).then(() => {
      setReloadListId(item.sourceListId);
      loadData("project_lists", setList, listId);
    });
  };

  useEffect(() => {
    if (reloadListId === listId) {
      loadData("project_lists", setList, listId);
      setReloadListId(null);
    }
  }, [reloadListId]);

  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      // Logique de traitement après le drop
      LoadOnDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDragStart = (task, e) => {
    if (e && e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", JSON.stringify(task));
      setDraggingTaskId(task.id);
    }
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
  };

  return (
    <div ref={drop}>
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
                <ListItem
                  key={task.id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, task)}
                  onDragEnd={(event) => handleDragEnd(event)}
                >
                  <Task
                    deleteTask={deleteTask}
                    taskId={task.id}
                    listId={listId}
                  />
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
          <MenuItem onClick={handleDeleteListButton}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Card>
    </div>
  );
}

TasksList.propTypes = {
  listId: PropTypes.number.isRequired,
  deleteList: PropTypes.func.isRequired,
  setReloadListId: PropTypes.func.isRequired,
  reloadListId: PropTypes.number,
};

TasksList.defaultProps = { reloadListId: null };
