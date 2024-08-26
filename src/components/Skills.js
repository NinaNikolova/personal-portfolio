import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import { FaAngular, FaReact, FaJava, FaBootstrap, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiPostgresql, SiMicrosoftazure, SiFigma, SiDocker, SiJira, SiExpress, SiMongodb } from 'react-icons/si';

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Technical Skills</h2>
              <p>During my studies at SoftUni, my participation in two internship programs there and Speed IT Up at Nemetschek Bulgaria, I gained experience, skills and learned a lot of technologies:</p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                <div className="item">
                  <FaAngular size={100} color="#dd1b16" />
                  <h5>Angular</h5>
                </div>
                <div className="item">
                  <FaReact size={100} color="#61dafb" />
                  <h5>React</h5>
                </div>
                <div className="item">
                  <SiTypescript size={100} color="#007acc" />
                  <h5>TypeScript</h5>
                </div>
                <div className="item">
                  <SiTailwindcss size={100} color="#38b2ac" />
                  <h5>Tailwind</h5>
                </div>
                <div className="item">
                  <FaJava size={100} color="#007396" />
                  <h5>Java</h5>
                </div>
                <div className="item">
                  <FaHtml5 size={100} color="#e34f26" />
                  <h5>HTML</h5>
                </div>
                <div className="item">
                  <FaBootstrap size={100} color="#7952b3" />
                  <h5>Bootstrap</h5>
                </div>
                <div className="item">
                  <FaCss3Alt size={100} color="#264de4" />
                  <h5>CSS</h5>
                </div>
                <div className="item">
                  <FaHtml5 size={100} color="#e34f26" />
                  <h5>HTML</h5>
                </div>

                <div className="item">
                  <SiPostgresql size={100} color="#336791" />
                  <h5>Postgre</h5>
                </div>
                <div className="item">
                  <SiMicrosoftazure size={100} color="#0078d4" />
                  <h5>Azure</h5>
                </div>
                <div className="item">
                  <SiFigma size={100} color="#f24e1e" />
                  <h5>Figma</h5>
                </div>
                <div className="item">
                  <SiDocker size={100} color="#2496ed" />
                  <h5>Docker</h5>
                </div>

                <div className="item">
                  <SiJira size={100} color="#0052CC" />
                  <h5>Jira</h5>
                </div>
                <div className="item">
                  <SiExpress size={100} color="#ffffff" />
                  <h5>Express.js</h5>
                </div>
                <div className="item">
                  <SiMongodb size={100} color="#47A248" />
                  <h5>MongoDB</h5>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image5" />
    </section>
  )
}
