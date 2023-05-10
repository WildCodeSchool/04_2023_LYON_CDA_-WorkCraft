import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { useState } from "react";

export default function ProjectItem({
  toggleCollapse,
  collapseList,
  project,
  deleteProject,
  editProject,
}) {
  const [anchorMenuElement, setAnchorMenuElement] = useState(null);
  const isMenuOpen = Boolean(anchorMenuElement);
  const [isEditActive, setIsEditActive] = useState(false);
  const [newName, setNewName] = useState(project.title);

  const handleClick = (event) => {
    setAnchorMenuElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenuElement(null);
  };

  const handleEdit = () => {
    handleClose();
    setNewName(project.title);
    setIsEditActive(true); // Reset the editing state variable
  };

  const handleClickDeleteButton = () => {
    deleteProject(project.id, project.title);
  };

  const handleCloseEditProject = () => {
    setIsEditActive(false);
    setNewName("");
    editProject(newName, project.id);
  };

  return (
    <div>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          {isEditActive ? (
            <ClickAwayListener
              onClickAway={() => handleCloseEditProject(project.id)}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <TextField
                  autoFocus
                  variant="standard"
                  sx={{ width: "100%", flexGrow: "4" }}
                  value={newName}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCloseEditProject()
                  }
                  onChange={(e) => setNewName(e.target.value)}
                />
              </form>
            </ClickAwayListener>
          ) : (
            <NavLink
              to={`/projects/${project.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                flexGrow: "4",
              }}
            >
              <ListItemText primary={project.title} />
            </NavLink>
          )}
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorMenuElement}
            open={isMenuOpen}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleEdit(project.id)}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleClickDeleteButton()}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        {/* )} */}
        {collapseList[project.id] ? (
          <ExpandLess
            sx={{ cursor: "pointer" }}
            onClick={() => toggleCollapse(project.id)}
          />
        ) : (
          <ExpandMore
            sx={{ cursor: "pointer" }}
            onClick={() => toggleCollapse(project.id)}
          />
        )}
      </ListItem>
      <Collapse in={collapseList[project.id]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {project.lists.map((list) => {
            return (
              <ListItemButton sx={{ pl: 4 }} key={list.id}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
}

ProjectItem.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  collapseList: PropTypes.objectOf(PropTypes.bool).isRequired,
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    lists: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  deleteProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
};
