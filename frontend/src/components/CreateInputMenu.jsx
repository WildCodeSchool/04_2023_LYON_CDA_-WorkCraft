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

export default function CreateInputMenu({ onSubmit, submitTextButton, label }) {
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const handleCloseListMenu = () => {
    setIsShowingMenu(false);
    setNameInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseListMenu();
    onSubmit(nameInput);
  };

  return (
    <div>
      {isShowingMenu ? (
        <ClickAwayListener onClickAway={handleCloseListMenu}>
          <Form onSubmit={handleSubmit}>
            <Card sx={{ minWidth: 275, padding: "10px 5px" }}>
              <CardContent>
                <TextField
                  sx={{ width: "100%" }}
                  label={`${label} Name`}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  inputRef={(input) => input && input.focus()}
                />
              </CardContent>
              <CardActions>
                <Button variant="default" onClick={handleCloseListMenu}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={nameInput.length <= 0}
                  type="submit"
                >
                  {submitTextButton}
                </Button>
              </CardActions>
            </Card>
          </Form>
        </ClickAwayListener>
      ) : (
        <Button variant="contained" onClick={() => setIsShowingMenu(true)}>
          {`New ${label}`}
        </Button>
      )}
    </div>
  );
}

CreateInputMenu.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitTextButton: PropTypes.string,
  label: PropTypes.string.isRequired,
};

CreateInputMenu.defaultProps = {
  submitTextButton: "Submit",
};
