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
import axios from "axios";
import ApiHelper from "../helpers/apiHelper";

export default function ProjectItem({
  toggleCollapse,
  collapseList,
  project,
  loading,
  setLoading,
}) {
  const [anchorMenuElement, setAnchorMenuElement] = useState(null);
  const isMenuOpen = Boolean(anchorMenuElement);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(project.title);
  const handleClick = (event) => {
    setAnchorMenuElement(event.currentTarget);
  };
  // const newName = "new project name";
  //   A la place d'une constante qui envoie les données en
  // dur mettre un state newName qui va stoquer le nom et qui va l'actualiser (voir ligne en dessous)
  // const [newName, setNewName] = useState("");

  const handleClose = () => {
    setAnchorMenuElement(null);
  };

  const handleEdit = (id) => {
    console.info(`edit id : ${id}`);
    ApiHelper(
      `projects/${id}`,
      "patch",
      {
        title: newName,
      },
      "application/merge-patch+json"
    )
      .then(() => {
        console.info("Update successful");
        setLoading(!loading);
        setIsEditing(true); // Reset the editing state variable
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const toggleDelete = (id) => {
    console.info(`Deleting project : ${id}`);
    axios
      .delete(`http://localhost/api/projects/${id}`)
      .then(() => {
        console.info("Delete successful");
        setLoading(!loading);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value); // Update the new title when the input changes
  };

  return (
    <div>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
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
            {isEditing ? (
              <input value={newName} onChange={handleInputChange} />
            ) : (
              <ListItemText primary={project.title} />
            )}
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
            <MenuItem onClick={() => toggleDelete(project.id)}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleEdit(project.id)}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
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
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};
