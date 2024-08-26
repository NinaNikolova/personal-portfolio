import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import smanagement from "../assets/img/self-management.png"
import goodcomunication from "../assets/img/goodcomunication.png"
import responsibility from "../assets/img/responsibility.png"
import friendliness from "../assets/img/friendliness.png"
import teamwork from "../assets/img/teamwork.png"


export const Softskills = () => {
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
    <section className="skill" id="Softskills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Soft Skills</h2>
              <p></p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                <div className="item">
                <img src={teamwork} alt="teamwork" />
                  <h5>Teamwork&Cooperation</h5>
                </div>
                <div className="item">
                <img src={friendliness} alt="friendliness" />
                  <h5>Friendliness</h5>
                </div>
                <div className="item">
                <img src={responsibility} alt="responsibility" />
                  <h5>Responsibility</h5>
                </div>
                <div className="item">
                 <img src={smanagement} alt="self-management" />
                  <h5>Self-management</h5>
                </div>
                <div className="item">
                <img src={goodcomunication} alt="good-comunication" />
                  <h5>Good communication</h5>
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
