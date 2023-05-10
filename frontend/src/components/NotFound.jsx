import { Button, Card, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          gap: 20,
        }}
      >
        <Typography variant="h4" color="primary">
          404 Page Not Found
        </Typography>
        <Typography variant="body1" color="initial">
          This page doesn't exist !
        </Typography>
        <Button component={NavLink} to="/" variant="contained">
          Return to Home Page
        </Button>
      </Card>
    </div>
  );
}
