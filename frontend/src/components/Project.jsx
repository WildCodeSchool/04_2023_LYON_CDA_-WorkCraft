import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  ClickAwayListener,
  Typography,
  TextField,
  Card,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TasksList from "./TasksList";

export default function Project() {
  const { projectId } = useParams();

  const [loadingLists, setLoadingLists] = useState(false);
  const [isShowingListMenu, setIsShowingListMenu] = useState(false);
  const [listNameInput, setListNameInput] = useState("");

  const handleClickAwayListMenu = () => {
    setIsShowingListMenu(false);
    setListNameInput("");
  };

  const handleCreateList = () => {
    axios
      .post("http://localhost/api/project_lists", {
        title: listNameInput,
        project: `api/projects/${projectId}`,
      })
      .then(() => setLoadingLists((prev) => !prev));
    handleClickAwayListMenu();
  };

  const [project, setProject] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost/api/projects/${projectId}.json`)
      .then((res) => {
        console.info("ReloadingLists list...");
        console.info(res.data);
        setProject(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  }, [projectId, loadingLists]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <Typography variant="h3" color="primary.contrastText" align="center">
          {project && project.title}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "left",
          gap: 20,
        }}
      >
        {project.lists &&
          project.lists.map((list) => (
            <TasksList
              key={list.id}
              listId={list.id}
              setLoadingLists={setLoadingLists}
            />
          ))}
        {isShowingListMenu ? (
          <ClickAwayListener onClickAway={handleClickAwayListMenu}>
            <Card sx={{ minWidth: 275 }}>
              <TextField
                sx={{ width: "100%" }}
                label="List Name"
                value={listNameInput}
                onChange={(e) => setListNameInput(e.target.value)}
                inputRef={(input) => input && input.focus()}
              />
              <Button variant="contained" onClick={handleCreateList}>
                Create
              </Button>
            </Card>
          </ClickAwayListener>
        ) : (
          <Button
            variant="contained"
            onClick={() => setIsShowingListMenu(true)}
          >
            New List
          </Button>
        )}
      </Box>
    </Box>
  );
}
