import Project from "../components/Project";
import Root from "./Root";

const Routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "projects/:projectId",
        element: <Project />,
      },
    ],
  },
];

export default Routes;
