import { Card, List, ListItem, CardHeader, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";

export default function TasksList({ listId }) {
  const [list, setList] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost/api/project_lists/${listId}.json`)
      .then((res) => {
        console.info(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.error(`Axios Error : ${err.message}`);
      });
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader title={list.title} align="center" />
      <CardContent>
        <List>
          {list.tasks &&
            list.tasks.map((task) => (
              <ListItem key={task.id}>
                <Task taskId={task.id} />
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

TasksList.propTypes = {
  listId: PropTypes.number.isRequired,
};
