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
import { useSnackbar } from "notistack";
import Task from "./Task";
import CreateInputMenu from "./CreateInputMenu";
import ApiHelper from "../helpers/apiHelper";
import loadData from "../helpers/loadData";

export default function TasksList({ listId, deleteList }) {
  const [list, setList] = useState({});
  const [anchorMenuElement, setAnchorMenuElement] = useState(null);
  const isMenuOpen = Boolean(anchorMenuElement);
  const handleClick = (event) => {
    setAnchorMenuElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenuElement(null);
  };

  const [isCreateInputActive, setIsCreateInputActive] = useState(false);

  useEffect(() => loadData("project_lists", setList, listId), []);

  const { enqueueSnackbar } = useSnackbar();

  const createTask = (taskName) => {
    ApiHelper(`tasks`, "post", {
      title: taskName,
      description: "",
      list: `api/project_lists/${listId}`,
    })
      .then(() => {
        loadData("project_lists", setList, listId);
        enqueueSnackbar(`Task "${taskName}" successfully created`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("An error occurred, Please try again.", {
          variant: "error",
        });
      });
  };

  const deleteTask = (taskId, taskName) => {
    ApiHelper(`tasks/${taskId}`, "delete")
      .then(() => {
        loadData("project_lists", setList, listId);
        enqueueSnackbar(`Task "${taskName}" successfully deleted`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("An error occurred, Please try again.", {
          variant: "error",
        });
      });
  };

  const handleDeleteListButton = () => {
    handleClose();
    deleteList(listId, list.title);
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
        <List sx={{ maxHeight: "70vh", overflow: "auto" }}>
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
};
