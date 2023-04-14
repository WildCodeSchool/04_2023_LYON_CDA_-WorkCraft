import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
