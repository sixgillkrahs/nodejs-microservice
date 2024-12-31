import { Breadcrumbs } from "react-daisyui";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbsCustom = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="/">
        <Link to={"/"}>Home</Link>
      </Breadcrumbs.Item>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <Breadcrumbs.Item href={routeTo}>
            <Link to={routeTo}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          </Breadcrumbs.Item>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsCustom;
