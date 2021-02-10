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
import oori from "../../assets/images/ooriname.png"

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  let childcheck = false;
  if (window.location.href.slice(-9) === "childmain" || window.location.href.slice(-8) === "childmap"){
    childcheck = true;
  }

  return (
    <Navbar color="light" light expand="md" className="mainHeader row">
      <NavbarBrand>
        <img src={oori} className="logoImage d-inline-block align-top"/>
      </NavbarBrand>
      <NavbarToggler onClick={toggle}/>
      <Collapse isOpen={isOpen} navbar>
          { childcheck?
          ( 
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/childmain"> Home </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/childmap"> 지도 </NavLink>
            </NavItem>
          </Nav>
          )
          :
          (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/"> Home </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/support"> 후원하기 </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/qna"> 문의하기 </NavLink>
            </NavItem>
            {Boolean(localStorage.getItem("access-token")) ?
            <NavItem>
              <NavLink href="/profile"> 마이페이지 </NavLink>
            </NavItem>
            : ""
            }
            <NavItem>
              {Boolean(localStorage.getItem("access-token")) == true && localStorage.getItem("access-token") != undefined ? <NavLink href="/signout"><b>로그아웃</b></NavLink> : <NavLink href="/auth"><b>함께하기</b></NavLink> }                </NavItem>
          </Nav>
          )
          }
      </Collapse>
    </Navbar>
  );
}

export default Header;