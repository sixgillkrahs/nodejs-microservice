import React from "react";
import { Breadcrumbs, Link as LinkMU, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useLocation, Link, useNavigate } from "react-router-dom";
import _ from "lodash";

const Breadcrums = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      role="presentation"
      onClick={handleClick}
      className="flex items-center gap-3"
    >
      {pathnames.length > 0 && (
        <div
          className="flex gap-1 cursor-pointer items-center"
          onClick={handleBack}
        >
          <InfoOutlinedIcon />
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
          >
            Back
          </Typography>
        </div>
      )}
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link to={"/"}>
          <LinkMU
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
          >
            <HomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="medium" />
          </LinkMU>
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography
              key={routeTo}
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
              }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          ) : (
            <Link to={routeTo}>
              <LinkMU
                key={routeTo}
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                href={routeTo}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </LinkMU>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrums;
