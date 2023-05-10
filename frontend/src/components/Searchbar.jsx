import * as React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import { Search, SearchIconWrapper, StyledInputBase } from "./StyledComponent";

export default function PrimarySearchAppBar({ searchValue, setSearchValue }) {
  const searchInputRef = React.useRef();
  React.useEffect(() => {
    searchInputRef.current.focus();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => setSearchValue(event.target.value)}
              value={searchValue}
              inputRef={searchInputRef}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

PrimarySearchAppBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};
