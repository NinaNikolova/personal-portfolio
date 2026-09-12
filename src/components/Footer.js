import { Container, Row, Col } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { useLanguage } from "../i18n/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
       
          <Col size={12} sm={6}>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end"  id="connect">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/nina-nikolova-0b2843147"><img src={navIcon1} alt="Icon" /></a>
         
              <a href="https://github.com/NinaNikolova"><img src={navIcon3} alt="Icon" /></a>
            </div>
            <p>{t.footer.copyright}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
