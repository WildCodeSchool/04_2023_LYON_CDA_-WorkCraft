import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
import loadData from "../helpers/loadData";

export default function UserList({ setSelectedUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index, id) => {
    setSelectedIndex(index);
    setSelectedUser(id);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => loadData("users", setUsers), []);

  return (
    <div>
      <List
        component="nav"
        aria-label="Owner project"
        sx={{ bgcolor: "grey[200]" }}
      >
        <ListItem
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Choose the owner of the project"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Choose the owner of the project"
            secondary={
              users[selectedIndex] === undefined
                ? ""
                : users[selectedIndex].username
            }
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {users.map((user, index) => (
          <MenuItem
            key={user.id}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index, user.id)}
          >
            {user.username}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

UserList.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
};
