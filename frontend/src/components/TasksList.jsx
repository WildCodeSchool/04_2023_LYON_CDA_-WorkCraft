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
import Task from "./Task";
import CreateInputMenu from "./CreateInputMenu";
import ApiHelper from "../helpers/apiHelper";
import loadData from "../helpers/loadData";
import { useSnackbar } from "notistack";

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

  const createTask = (titleTask) => {
    ApiHelper(`tasks`, "post", {
      title: titleTask,
      description: "",
      list: `api/project_lists/${listId}`,
    })
      .then(() => {
        loadData("project_lists", setList, listId);
        enqueueSnackbar(`Task "${titleTask}" successfully created`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("An error occured, Please try again.", {
          variant: "error",
        });
      });
  };

  const deleteTask = (taskId) => {
    ApiHelper(`tasks/${taskId}`, "delete").then(() => {
      loadData("project_lists", setList, listId);
    });
  };

  const handleDeleteListButton = () => {
    handleClose();
    deleteList(listId);
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
