import HomePage from "../components/HomePage";
import NotFound from "../components/NotFound";
import Project from "../components/Project";
import Root from "./Root";

const Routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
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
