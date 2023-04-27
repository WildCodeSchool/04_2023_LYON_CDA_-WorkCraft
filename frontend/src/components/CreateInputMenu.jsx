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

export default function CreateInputMenu({
  submitTextButton,
  label,
  onSubmit,
  onClose,
  initialValue,
}) {
  const [nameInput, setNameInput] = useState(initialValue);

  const handleCloseListMenu = () => {
    setNameInput("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseListMenu();
    onSubmit(nameInput);
  };

  return (
    <div>
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
    </div>
  );
}

CreateInputMenu.propTypes = {
  submitTextButton: PropTypes.string,
  initialValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

CreateInputMenu.defaultProps = {
  submitTextButton: "Submit",
  initialValue: "",
};
