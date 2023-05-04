import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { SnackbarProvider } from "notistack";
import { blue, grey, green } from "@mui/material/colors";
import Sidebar1 from "../components/Sidebar1";
import Sidebar2 from "../components/Sidebar2";
import img6 from "../assets/backgroundImg/img6.jpg";
import img2 from "../assets/backgroundImg/img2.jpg";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: blue[500],
            light: blue[500],
          },
          secondary: {
            main: blue[500],
          },
          divider: grey[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: grey[900],
            light: green[500],
          },
          secondary: {
            main: grey[300],
          },
          divider: grey[500],
          background: {
            default: "#121212",
            paper: "#121212",
          },
          text: {
            primary: "#fff",
            secondary: "#fff",
          },
        }),
  },
});

export default function Root() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [darkMode, setDarkMode] = useState(false);
  const [bgImage, setBgImage] = useState(img6);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    if (darkMode) {
      setBgImage(img6);
    } else {
      setBgImage(img2);
    }
  };

  const theme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));

  const [selectedProject, setSelectedProject] = useState({});

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <CssBaseline />
        <Sidebar1 toggleDarkMode={toggleDarkMode} toggleDrawer={toggleDrawer} />
        <Sidebar2
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          setSelectedProject={setSelectedProject}
          selectedProject={selectedProject}
        />
        <main
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "98vh",
            width: "300vh",
          }}
        >
          <Outlet context={[selectedProject, setSelectedProject]} />
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
