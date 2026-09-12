import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Sun, MoonStarsFill } from "react-bootstrap-icons";
import navIcon1 from '../assets/img/nav-icon1.svg';

import navIcon3 from '../assets/img/nav-icon3.svg';

import { useLanguage } from "../i18n/LanguageContext";

import {
  BrowserRouter as Router
} from "react-router-dom";


export const NavBar = ({ theme, toggleTheme }) => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { t, toggleLanguage } = useLanguage();

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
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>{t.nav.home}</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>{t.nav.technicalSkills}</Nav.Link>
              <Nav.Link href="#softskills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('softskills')}>{t.nav.softSkills}</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>{t.nav.projects}</Nav.Link>
              <Nav.Link href="#certificates" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('certificates')}>{t.nav.certificates}</Nav.Link>
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
                aria-label={theme === 'dark' ? t.theme.ariaToLight : t.theme.ariaToDark}
                title={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
              >
                {theme === 'dark' ? <Sun size={20} /> : <MoonStarsFill size={20} />}
              </button>
              <button
                type="button"
                className="language-toggle-btn"
                onClick={toggleLanguage}
                aria-label={t.languageToggle.aria}
                title={t.languageToggle.title}
              >
                {t.languageToggle.label}
              </button>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
