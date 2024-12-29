import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslate } from "../utils";
import {
  Badge,
  Button,
  Card,
  Dropdown,
  Indicator,
  Navbar,
} from "react-daisyui";
import { Header } from "../components";

const MainLayout = () => {
  const translate = useTranslate();
  return (
    <>
      <Header />
      <div className="lg:px-28">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
