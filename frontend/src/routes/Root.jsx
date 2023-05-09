import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { blue, grey, green } from "@mui/material/colors";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
// eslint-disable-next-line import/no-extraneous-dependencies
import { DndProvider } from "react-dnd";
// eslint-disable-next-line import/no-extraneous-dependencies
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar1 from "../components/Sidebar1";
import Sidebar2 from "../components/Sidebar2";
import img6 from "../assets/backgroundImg/Light/img6.jpg";
import img2 from "../assets/backgroundImg/Dark/img2.jpg";
import img8 from "../assets/backgroundImg/Light/img8.webp";
import img9 from "../assets/backgroundImg/Light/img9.jpeg";
import img11 from "../assets/backgroundImg/Light/img11.jpeg";
import img12 from "../assets/backgroundImg/Light/img12.webp";
import img14 from "../assets/backgroundImg/Light/img14.jpeg";
import img16 from "../assets/backgroundImg/Light/img16.jpeg";
import img17 from "../assets/backgroundImg/Light/img17.jpeg";
import img18 from "../assets/backgroundImg/Light/img18.jpeg";
import img19 from "../assets/backgroundImg/Light/img19.jpeg";
import img20 from "../assets/backgroundImg/Light/img20.jpeg";
import img21 from "../assets/backgroundImg/Dark/img21.jpg";
import img22 from "../assets/backgroundImg/Dark/img22.jpg";
import img23 from "../assets/backgroundImg/Dark/img23.jpeg";
import img24 from "../assets/backgroundImg/Dark/img24.webp";
import img25 from "../assets/backgroundImg/Dark/img25.jpeg";
import img26 from "../assets/backgroundImg/Dark/img26.webp";
import img27 from "../assets/backgroundImg/Dark/img27.webp";
import img28 from "../assets/backgroundImg/Dark/img28.jpeg";
import img29 from "../assets/backgroundImg/Dark/img29.jpeg";
import img31 from "../assets/backgroundImg/Dark/img31.jpeg";
import img32 from "../assets/backgroundImg/Dark/img32.jpeg";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: blue[500],
          },
          secondary: {
            main: blue[500],
          },
          custom: {
            main: green[500],
          },
          divider: grey[200],
          background: {
            card: blue[300],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: grey[600],
          },
          secondary: {
            main: grey[300],
          },
          divider: grey[500],
          background: {
            default: "#121212",
            paper: "#121212",
            card: grey[600],
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
  const images = {
    light: [img8, img9, img11, img12, img14, img16, img17, img18, img19, img20],
    dark: [
      img21,
      img22,
      img23,
      img24,
      img25,
      img26,
      img27,
      img28,
      img29,
      img31,
      img32,
    ],
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [darkMode, setDarkMode] = useState(false);
  const [bgImage, setBgImage] = useState(img6);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));

  theme.typography.h2 = {
    fontSize: "3rem",
  };

  theme.typography.h3 = {
    fontSize: "1.5rem",
  };

  theme.typography.h4 = {
    fontSize: "1rem",
  };

  theme.typography.p = {
    fontSize: "0.75rem",
  };

  const [selectedProject, setSelectedProject] = useState({});

  useEffect(() => {
    if (Object.keys(selectedProject).length === 0) {
      if (darkMode) {
        setBgImage(img2);
      } else {
        setBgImage(img6);
      }
    } else {
      const mode = darkMode ? "dark" : "light";
      const imageArray = images[mode];
      setBgImage(imageArray[selectedProject.id % imageArray.length]);
    }
  }, [darkMode, selectedProject]);

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <CssBaseline />
          <Sidebar1
            toggleDarkMode={toggleDarkMode}
            toggleDrawer={toggleDrawer}
          />
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
    </DndProvider>
  );
}
