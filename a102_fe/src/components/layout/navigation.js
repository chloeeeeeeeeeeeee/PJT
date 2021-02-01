import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
// import { Link } from "react-router-dom";

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="navigation">
            <Navbar color="light" light expand="md">
            {/* <NavbarBrand href="/">밥은 먹고 다니니~?</NavbarBrand> */}
            {/* <NavbarToggler onClick={toggle} /> */}
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
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
        </div>
    );
}


export default Navigation;