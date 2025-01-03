import React from "react";
import { Outlet } from "react-router-dom";
import { Breadcrums, Header } from "../components";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Box sx={{ paddingTop: 4, paddingX: 10 }}>
        <Breadcrums />
        <Outlet />
      </Box>
    </div>
  );
};

export default MainLayout;
