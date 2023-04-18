import { Card, List, ListItem, CardHeader, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import data from "../data";
import Task from "./Task";

export default function TasksList({ listId }) {
  return (
    <Card>
      <CardHeader
        title={data.lists.find((list) => list.id === listId).title}
        align="center"
      />
      <CardContent>
        <List>
          {data.tasks
            .filter((task) => task.listId === listId)
            .map((task) => (
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
