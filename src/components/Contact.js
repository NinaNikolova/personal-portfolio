import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useLanguage } from '../i18n/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("access_key", process.env.REACT_APP_WEB3FORMS_KEY);
    formData.append("name", `${formDetails.firstName} ${formDetails.lastName}`);
    formData.append("subject", "Contact Form Submission - Portfolio");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    setIsSubmitting(false);
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.success) {
      setStatus({ success: true });
    } else {
      setStatus({ success: false });
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt={t.contact.imgAlt}/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>{t.contact.title}</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name="firstName" value={formDetails.firstName} placeholder={t.contact.firstName} onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name="lastName" value={formDetails.lastName} placeholder={t.contact.lastName} onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <input type="email" name="email" value={formDetails.email} placeholder={t.contact.email} onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" name="message" value={formDetails.message} placeholder={t.contact.message} onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{isSubmitting ? t.contact.sending : t.contact.send}</span></button>
                    </Col>
                    {
                      status.success !== undefined &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.success === false ? t.contact.error : t.contact.success}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
