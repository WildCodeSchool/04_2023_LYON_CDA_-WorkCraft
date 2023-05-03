import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Grow } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Sidebar1 from "../components/Sidebar1";
import Sidebar2 from "../components/Sidebar2";
import img6 from "../assets/backgroundImg/img6.jpg";
import img2 from "../assets/backgroundImg/img2.jpg";

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

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const [selectedProject, setSelectedProject] = useState({});

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        TransitionComponent={Grow}
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
            height: "100vh",
            width: "100vw",
          }}
        >
          <Outlet context={[selectedProject, setSelectedProject]} />
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
