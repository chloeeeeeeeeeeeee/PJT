import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Col
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
    <Navbar light expand="md" className="mainHeader">
    { childcheck?

      <div className="d-flex flex-column col-10 offset-1">
      <NavbarBrand className="mainHeaderLogo">
        <img src={oori} className="logoImage d-inline-block align-top"/>
      </NavbarBrand>
      </div>

    :

      <div className="d-flex flex-column col-10 offset-1">
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar className="mainHeaderAuth">
          <Nav className="ml-auto" navbar>
            {/* {Boolean(localStorage.getItem("access-token")) && (localStorage.getItem("access-token") != "undefined") ?
              <NavItem>
                <NavLink href="/profile"><b>마이페이지</b></NavLink>
              </NavItem>
              : ""
            } */}
            <NavItem>
              {Boolean(localStorage.getItem("access-token")) == true && (localStorage.getItem("access-token") != "undefined") ?
                <NavLink href="/signout">다음에 또 만나요 <b>로그아웃</b></NavLink>
                :
                <NavLink href="/auth">따뜻한 마음으로 우리와 <b>함께하기</b></NavLink>
              }
            </NavItem>
          </Nav>
        </Collapse>
        <NavbarBrand className="mainHeaderLogo">
          <img src={oori} className="logoImage d-inline-block align-top"/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar className="mainHeaderNav">
            <Nav className="mx-auto" navbar>
              <NavItem>
                <NavLink href="/support"> 후원하기 </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/qna"> 문의하기 </NavLink>
              </NavItem>
              {Boolean(localStorage.getItem("access-token")) ?
                <NavItem>
                  <NavLink href="/profile"><b>마이페이지</b></NavLink>
                </NavItem>
                : ""
              }
            </Nav>
        </Collapse>
      </div>
    }
    </Navbar>
  );
}

export default Header;