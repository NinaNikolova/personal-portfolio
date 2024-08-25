import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, img }) => {
  return (
    <Col size={12} sm={6} md={4} >

      <div className="proj-imgbx">
        <a href={imgUrl} target="_blank" rel="noopener noreferrer" className="project-link">
          <img src={img} alt={title} />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </a>
      </div>
    </Col>
  )
}
