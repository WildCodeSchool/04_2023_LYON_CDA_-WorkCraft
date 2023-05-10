/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { useOutletContext, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
// eslint-disable-next-line import/no-extraneous-dependencies
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import loadData from "../helpers/loadData";
import TasksList from "./TasksList";
import CreateInputMenu from "./CreateInputMenu";
import ApiHelper from "../helpers/apiHelper";

export default function Project() {
  const { projectId } = useParams();
  const { selectedProject, setSelectedProject, darkMode } = useOutletContext();
  const [isCreateInputActive, setIsCreateInputActive] = useState(false);
  const [reloadListId, setReloadListId] = useState(null);

  useEffect(
    () => loadData("projects", setSelectedProject, projectId),
    [projectId]
  );

  const { enqueueSnackbar } = useSnackbar();

  const createList = (listName) => {
    setIsCreateInputActive(false);
    ApiHelper("project_lists", "post", {
      title: listName,
      project: `api/projects/${projectId}`,
    })
      .then(() => {
        loadData("projects", setSelectedProject, projectId);
        enqueueSnackbar(`List "${listName}" successfully created`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("An error occurred, Please try again.", {
          variant: "error",
        });
      });
  };

  const deleteList = (listId, listName) => {
    ApiHelper(`project_lists/${listId}`, "delete").then(() => {
      loadData("projects", setSelectedProject, projectId);
      enqueueSnackbar(`List "${listName}" successfully deleted`, {
        variant: "success",
      }).catch(() => {
        enqueueSnackbar("An error occurred, Please try again.", {
          variant: "error",
        });
      });
    });
  };

  const reorderLists = (startIndex, endIndex) => {
    const newLists = Array.from(selectedProject.lists);
    const [removed] = newLists.splice(startIndex, 1);
    newLists.splice(endIndex, 0, removed);
    setSelectedProject((prevProject) => ({
      ...prevProject,
      lists: newLists,
    }));
  };

  return (
    <DragDropContext
      onDragEnd={(result, ...props) => {
        const { destination, source } = result;
        if (!destination) {
          return;
        }
        if (destination.index === source.index) {
          return;
        }
        reorderLists(source.index, destination.index);
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Box
          sx={
            !darkMode
              ? {
                  backgroundImage:
                    "linear-gradient(to top, #00c6fb 0%, #005bea 100%)",
                  width: "100%",
                  textAlign: "center",
                }
              : {
                  backgroundImage:
                    "linear-gradient(to top, #434343 0%, black 100%)",
                  width: "100%",
                  textAlign: "center",
                }
          }
        >
          <Typography
            variant="h2"
            color="primary.contrastText"
            backgroundColor="primary.main"
            sx={{ height: "65px" }}
          >
            {selectedProject && selectedProject.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Droppable
            droppableId={selectedProject && `droppable-1${selectedProject.id}`}
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div
                style={{ display: "flex", gap: "30px" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {selectedProject.lists &&
                  selectedProject.lists.map((list, i) => (
                    <Draggable
                      key={list.id}
                      draggableId={`draggable-1${list.id}`}
                      index={i}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <TasksList
                              listId={list.id}
                              deleteList={deleteList}
                              setReloadListId={setReloadListId}
                              reloadListId={reloadListId}
                              dragProps={provided.dragHandleProps}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {isCreateInputActive ? (
            <CreateInputMenu
              onSubmit={createList}
              onClose={() => setIsCreateInputActive(false)}
              submitTextButton="Create"
              label="List"
            />
          ) : (
            <Button
              variant="contained"
              onClick={() => setIsCreateInputActive(true)}
              sx={{ margin: "4vh 1vw", width: "5vw" }}
            >
              New List
            </Button>
          )}
        </Box>
      </Box>
    </DragDropContext>
  );
}
