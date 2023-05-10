import {
  Box,
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { NavLink, useOutletContext } from "react-router-dom";
import { useTheme } from "@emotion/react";
import LogoSVG from "./LogoSVG";

function HomePage() {
  const theme = useTheme();
  const { projects, images, darkMode } = useOutletContext();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "100px",
        }}
      >
        <LogoSVG
          color1={theme.palette.text.primary}
          color2={theme.palette.primary.main}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        {projects.map((project) => (
          <Card sx={{ width: 300 }} key={project.id}>
            <CardMedia
              sx={{ height: 140 }}
              image={
                images[darkMode ? "dark" : "light"][
                  project.id % images[darkMode ? "dark" : "light"].length
                ]
              }
            />
            <CardContent>
              <Typography variant="h5" color="text">
                {project.title}
              </Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ width: "100%" }}
                variant="contained"
                component={NavLink}
                to={`/projects/${project.id}`}
              >
                Open
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
export default HomePage;
