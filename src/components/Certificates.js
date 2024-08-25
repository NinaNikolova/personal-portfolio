import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import cert1 from "../assets/img/cert1.jpeg";
import cert2 from "../assets/img/cert2.jpeg";
import cert3 from "../assets/img/cert3.jpeg";
import cert4 from "../assets/img/cert4.jpeg";

export default function Certificates() {
    const certificates = [
        {
            title: "JS Web Developer Diploma",
            imgUrl: "https://softuni.bg/certificates/details/185271/46d18211",
            img: cert1
        },
        {
            title: "Java Advance- January 2024",
            imgUrl: "https://softuni.bg/certificates/details/203382/3e2e30b7",
            img: cert2
        },
        {
            title: "Programming Fundamentals with Java - September 2023",
            imgUrl: "https://softuni.bg/certificates/details/195145/c10f50f2",
            img: cert3
        },
        {
            title: "Java OOP-February 2024",
            imgUrl: "https://softuni.bg/certificates/details/211065/3ca50784",
            img: cert4
        },

    ];


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
        <section className="skill" id="certificates">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx wow zoomIn">
                            <h2>Certificates</h2>
                            <p>During my studies at SoftUni, my participation in two internship programs there and Speed IT Up at Nemetschek Bulgaria, I gained experience, skills and learned a lot of technologies:</p>
                            <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                                {certificates?.map(c =>
                                    <div className="item">
                                        <a href={c.imgUrl}>
                                            <img src={c.img} alt={c.title} />
                                            <h5>{c.title}</h5></a>
                                    </div>
                                )}

                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <img className="background-image-left" src={colorSharp} alt="Image5" />
        </section>
    )
}
