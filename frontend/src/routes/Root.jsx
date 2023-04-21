import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar1 from "../components/Sidebar1";
import img6 from "../assets/backgroundImg/img6.jpg";
import img2 from "../assets/backgroundImg/img2.jpg";

export default function Root() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar1 toggleDarkMode={toggleDarkMode} />
      <main
        style={{
          width: "100%",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
