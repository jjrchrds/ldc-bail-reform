import React from "react"
import { Link } from "gatsby"
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from "react-bootstrap"
import headerStyles from "./header.module.scss"

import Logo from "../../static/assets/svg/logo_navbar.svg";
import BetaSticker from "../components/beta-sticker"

const Header = () => {
  
  return (
    <Navbar className="beta-sticker-wrap" collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" aria-label="Go to homepage">
          <Logo width={200}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className={headerStyles.nav}>
          <Nav className="ml-auto">
            <Nav.Link as={Link} activeClassName="active" to="/narrative">Stories</Nav.Link>
            <Nav.Link as={Link} activeClassName="active" to="/system-map">System Map</Nav.Link>
            <NavDropdown title="Issues" className="nav-dropdown" variant="dark" activeClassName="active">
              <NavDropdown.Item href="/issue1">Damaging Lives</NavDropdown.Item>
              <NavDropdown.Item href="/issue2">Denying Dignity</NavDropdown.Item>
              <NavDropdown.Item href="/issue3">Culture of Fear</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} activeClassName="active" to="/methodology">Methodology</Nav.Link>
            <Nav.Link as={Link} activeClassName="active" to="/cta" className={headerStyles.ctaHover}><p className={headerStyles.cta}>About the Beta</p></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <BetaSticker />
    </Navbar>
  )
}

export default Header;