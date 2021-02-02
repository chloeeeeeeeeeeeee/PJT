import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="light" light expand="md" className="mainHeader row">
      <NavbarBrand href="/">
        <img
          src="https://exhalepilateslondon.com/wp-content/uploads/2018/08/hello-logo-min.png"
          className="logoImage d-inline-block align-top"
        />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/"> Home </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/auth"> 회원 </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/profile"> 마이페이지 </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/support"> 후원하기 </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/map"> 지도 </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"> 문의하기 </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;
