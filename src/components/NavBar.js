import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Sun, MoonStarsFill } from "react-bootstrap-icons";
import navIcon1 from '../assets/img/nav-icon1.svg';

import navIcon3 from '../assets/img/nav-icon3.svg';


import {
  BrowserRouter as Router
} from "react-router-dom";


export const NavBar = ({ theme, toggleTheme }) => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
          <div  style={{ color: 'skyblue', fontSize: '30px', fontWeight:'bold' }}>
    &lt;Code4Fun /&gt;
  </div>

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Technical Skills</Nav.Link>
              <Nav.Link href="#softskills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('softskills')}>Soft Skills</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
              <Nav.Link href="#certificates" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('certificates')}>Certificates</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/nina-nikolova-0b2843147"><img src={navIcon1} alt="Icon" /></a>

                <a href="https://github.com/NinaNikolova"><img src={navIcon3} alt="Icon" /></a>
              </div>
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Switch to sea theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <MoonStarsFill size={20} />}
              </button>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
