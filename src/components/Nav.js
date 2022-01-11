import React from "react";
import "../App.css";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Menu style={{ textAlign: "center" }} mode="horizontal" theme="dark">
        <Menu.Item key="mail">
          <Icon type="home" />
          Sources<Link to="/source"></Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Icon type="read" />
          My articles<Link to="/articles"></Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Icon type="logout" />
          Logout<Link to="/"></Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default Nav;
