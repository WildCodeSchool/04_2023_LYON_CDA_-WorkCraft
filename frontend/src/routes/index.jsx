import NotFound from "../components/NotFound";
import Project from "../components/Project";
import Root from "./Root";

const Routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "projects/:projectId",
        element: <Project />,
      },
    ],
  },
];

export default Routes;
