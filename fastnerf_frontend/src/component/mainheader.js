import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const MainHeader = () => {
  const headersData = [
    {
      label: "Results",
      href: "/",
    },
    {
      label: "Plots",
      href: "/plots",
    },
    {
      label: "Uploads",
      href: "/uploads",
    },
    
  ];

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">AllInOneAvatar</Typography>
          </Grid>
          <Grid item>{getMenuButtons()}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
