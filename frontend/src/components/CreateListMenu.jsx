import { Form } from "react-router-dom";
import {
  Button,
  ClickAwayListener,
  TextField,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export default function CreateListMenu({ createList }) {
  const [isShowingListMenu, setIsShowingListMenu] = useState(false);
  const [listNameInput, setListNameInput] = useState("");

  const handleCloseListMenu = () => {
    setIsShowingListMenu(false);
    setListNameInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseListMenu();
    createList(listNameInput);
  };

  return (
    <div>
      {isShowingListMenu ? (
        <ClickAwayListener onClickAway={handleCloseListMenu}>
          <Form onSubmit={handleSubmit}>
            <Card sx={{ minWidth: 275, padding: "10px 5px" }}>
              <CardContent>
                <TextField
                  sx={{ width: "100%" }}
                  label="List Name"
                  value={listNameInput}
                  onChange={(e) => setListNameInput(e.target.value)}
                  inputRef={(input) => input && input.focus()}
                />
              </CardContent>
              <CardActions>
                <Button variant="default" onClick={handleCloseListMenu}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={listNameInput.length <= 0}
                  type="submit"
                >
                  Create
                </Button>
              </CardActions>
            </Card>
          </Form>
        </ClickAwayListener>
      ) : (
        <Button variant="contained" onClick={() => setIsShowingListMenu(true)}>
          New List
        </Button>
      )}
    </div>
  );
}

CreateListMenu.propTypes = {
  createList: PropTypes.func.isRequired,
};
