import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { NavLink } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { useState } from "react";
import CreateInputMenu from "./CreateInputMenu";

export default function ProjectItem({
  toggleCollapse,
  collapseList,
  project,
  deleteProject,
  editProject,
}) {
  const [anchorMenuElement, setAnchorMenuElement] = useState(null);
  const isMenuOpen = Boolean(anchorMenuElement);
  // const [isEditing, setIsEditing] = useState(false);
  // const [newName, setNewName] = useState(project.title);
  const [isEditActive, setIsEditActive] = useState(false);

  const handleClick = (event) => {
    setAnchorMenuElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenuElement(null);
  };

  const handleEdit = () => {
    handleClose();
    setIsEditActive(true); // Reset the editing state variable
  };

  const handleClickDeleteButton = () => {
    deleteProject(project.id);
  };

  // const handleInputChange = (event) => {
  //   setNewName(event.target.value); // Update the new title when the input changes
  // };

  // const handleCloseEditProject = () => {
  //   setIsEditing(false);
  //   setNewName("");
  //   editProject(newName, project.id);
  // };

  const handleEditSubmit = (newName) => {
    editProject(newName, project.id);
  };

  return (
    <div>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
        {isEditActive ? (
          <CreateInputMenu
            onSubmit={handleEditSubmit}
            onClose={() => setIsEditActive(false)}
            submitTextButton="Edit"
            label="Project"
            initialValue={project.title}
          />
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <NavLink
              to={`/projects/${project.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItemText primary={project.title} />
            </NavLink>
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
        )}
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
