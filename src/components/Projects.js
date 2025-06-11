import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg7 from "../assets/img/project-img7.png";
import projImg8 from "../assets/img/project-img8.png";
import projImg9 from "../assets/img/project-img9.png";
import projImg10 from "../assets/img/project-img10.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Nina's Resume",
      description: "Current project...",
      imgUrl: "https://personal-portfolio-hazel-six.vercel.app/",
      img: projImg1
    },
    {
      title: "Garant Burgas",
      description: "Garant Burgas - As part of an Academy for trainees and team leaders /SoftUni/ I performed frontend development /as trainee/ with React, TypeScript and Tailwind. The result of our team work is part of the website of Garant Burgas",
      imgUrl: "https://borsa.garantburgas.com/sectorRanking?origin_code=bg",
      img: projImg2
    },
    {
      title: "B2114 DAT Compiler",
      description: "B2114 DAT Compiler-a family friend website",
      imgUrl: "https://b2114-datcompiler.xyz/",
      img: projImg4
    },
    {
      title: "PlayWithPy",
      description: "Игри за учене на Python, КМИТ, 6-7 клас",
      imgUrl: "https://python-games-rrib.onrender.com/",
      img: projImg7
    },
    {
      title: "Тестове за входно ниво за 6-ти клас",
      description: "Тестове за входно ниво за 6-ти клас",
      imgUrl: "https://sunny-tanuki-49b78e.netlify.app/",
      img: projImg8
    },
    {
      title: "Hangman",
      description: "Fun learning english",
      imgUrl: "https://englishlearning6klas.netlify.app/",
      img: projImg9
    },
    {
      title: "Software Technologies Quiz App",
      description: "Software Technologies Master Degree Quiz App quiz",
      imgUrl: "https://fmi-master-quizes.vercel.app/",
      img: projImg10
    },



  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>Here are some of my completed projects:</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.slice(0, 3).map((project, index) => (
                            <ProjectCard
                              key={project.title}
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
                              key={project.title}
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
                              key={project.title}
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
