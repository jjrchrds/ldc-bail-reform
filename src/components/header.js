import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Navbar, Nav, Container } from "react-bootstrap"
// import './header.module.scss'
// import headerStyles from './header.module.scss';

/* Import SVG Components */
import Logo from "../../static/assets/logo_navbar.svg";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} activeClassName="active" to="/">Introduction</Nav.Link>
            <Nav.Link as={Link} activeClassName="active" to="/narrative">Narrative</Nav.Link>
            <Nav.Link as={Link} activeClassName="active" to="/system-map">System Map</Nav.Link>
            <Nav.Link as={Link} activeClassName="active" to="/methodology">Methodology</Nav.Link>
            <Nav.Link as={Link} activeClassName="active" to="/cta">CTA</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;