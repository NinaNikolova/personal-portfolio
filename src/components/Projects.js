import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg5 from "../assets/img/project-img5.png";
import projImg7 from "../assets/img/project-img7.png";
import projImg8 from "../assets/img/project-img8.png";
import projImg9 from "../assets/img/project-img9.png";
import projImg10 from "../assets/img/project-img10.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useLanguage } from '../i18n/LanguageContext';

const projectsMeta = [
  {
    key: "ninaResume",
    title: "Nina's Resume",
    imgUrl: "https://personal-portfolio-hazel-six.vercel.app/",
    img: projImg1
  },
  {
    key: "garantBurgas",
    title: "Garant Burgas",
    imgUrl: "https://borsa.garantburgas.com",
    img: projImg2
  },
  {
    key: "manifestCode",
    title: "ManifestCode",
    imgUrl: "https://manifest-code.com/",
    img: projImg4
  },
  {
    key: "playWithPy",
    title: "PlayWithPy",
    imgUrl: "https://python-games-rrib.onrender.com/",
    img: projImg7
  },
  {
    key: "playWithEli",
    title: "Играй с Ели",
    imgUrl: "https://beamish-tartufo-50e677.netlify.app/",
    img: projImg8
  },
  {
    key: "quizApp",
    title: "Software Technologies Quiz App",
    imgUrl: "https://fmi-master-quizes.vercel.app/",
    img: projImg10
  },
  {
    key: "marbirec",
    title: "Marbirec",
    imgUrl: "https://marbirec.com/",
    img: projImg9
  },
  {
    key: "credito",
    title: "Credito",
    imgUrl: "https://credito.bg",
    img: projImg3
  },
  {
    key: "golfClub",
    title: "GolfClubAirSofia",
    imgUrl: "https://golfclubsofia.com/",
    img: projImg5
  },
];

export const Projects = () => {
  const { t } = useLanguage();
  const projects = projectsMeta.map((project) => ({
    ...project,
    description: t.projects.items[project.key],
  }));

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>{t.projects.title}</h2>
                  <p>{t.projects.subtitle}</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">{t.projects.tabs[0]}</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">{t.projects.tabs[1]}</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">{t.projects.tabs[2]}</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.slice(0, 3).map((project, index) => (
                            <ProjectCard
                              key={project.key}
                              title={project.title}
                              description={project.description}
                              imgUrl={project.imgUrl}
                              img={project.img}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          {projects.slice(3, 6).map((project, index) => (
                            <ProjectCard
                              key={project.key}
                              title={project.title}
                              description={project.description}
                              imgUrl={project.imgUrl}
                              img={project.img}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Row>
                          {projects.slice(6).map((project, index) => (
                            <ProjectCard
                              key={project.key}
                              title={project.title}
                              description={project.description}
                              imgUrl={project.imgUrl}
                              img={project.img}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>

                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="background-img"></img>
    </section>
  )
}
