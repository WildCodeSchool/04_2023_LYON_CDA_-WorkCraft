import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar1 from "../components/Sidebar1";

export default function Root() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar1 toggleDarkMode={toggleDarkMode} />
      <main style={{ width: "100%" }}>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
