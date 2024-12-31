import React from "react";
import { Button, Dropdown, Menu, Navbar } from "react-daisyui";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Navbar
      className="bg-base-100 shadow-xl font-bold lg:px-7"
      dataTheme="#fff"
    >
      <Navbar.Start>
        <Dropdown className="block lg:hidden">
          <Button tag="label" color="ghost" tabIndex={0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </Button>
          <Dropdown.Menu tabIndex={0} className="w-52 mt-3 z-[1]">
            <Dropdown.Item>Item 1</Dropdown.Item>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link to={"/"}>daisyUI</Link>
      </Navbar.Start>
      <Navbar.Center className="hidden lg:flex">
        <Menu horizontal className="px-1">
          <Menu.Item>
            <a>Analyze a Deal</a>
          </Menu.Item>
          <Menu.Item>
            <a>Estimate Rents</a>
          </Menu.Item>
          <Menu.Item>
            <a>Crime Map</a>
          </Menu.Item>
          <Menu.Item>
            <a>For Agents</a>
          </Menu.Item>
          <Menu.Item>
            <details>
              <summary>Tools & Calculator</summary>
              <ul className="p-2">
                <Menu.Item>
                  <a>Submenu 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Submenu 2</a>
                </Menu.Item>
              </ul>
            </details>
          </Menu.Item>
        </Menu>
      </Navbar.Center>
      <Navbar.End>
        <Button tag="a" color="ghost">
          <Link to={"/login"}>Login</Link>
        </Button>
        <Button tag="a" variant="outline">
          <Link to={"/register"}>Sign up</Link>
        </Button>
      </Navbar.End>
    </Navbar>
  );
};

export default Header;
