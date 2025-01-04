import React, { useEffect, useState } from "react";
import { Breadcrumbs, Link as LinkMU, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { usePageTitle } from "../../hooks";
import { childRoutes } from "../../utils/routes";

const Breadcrums = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [titlePage, setTitlePage] = useState<string>("Home");
  const pathnames = location.pathname.split("/").filter((x) => x);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const routeNames = pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const route: any =
        childRoutes.find((route) => route.path === routeTo) || {};
      return route.name || name.charAt(0).toUpperCase() + name.slice(1);
    });
    const lastName =
      pathnames.length === 0 ? "Home" : routeNames[routeNames.length - 1];
    setTitlePage(lastName);
  }, [location.pathname, childRoutes]);

  usePageTitle(titlePage);

  return (
    <div role="presentation" className="flex items-center gap-3">
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
          >
            <HomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="medium" />
          </LinkMU>
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          const route: any =
            childRoutes.find((route) => route.path === routeTo) || {};
          const displayName =
            route.name || name.charAt(0).toUpperCase() + name.slice(1);

          return isLast ? (
            <Typography
              key={routeTo}
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
              }}
            >
              {displayName}
            </Typography>
          ) : (
            <Link to={routeTo} key={routeTo}>
              <LinkMU
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
              >
                {displayName}
              </LinkMU>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrums;
