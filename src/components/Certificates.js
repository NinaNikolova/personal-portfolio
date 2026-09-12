import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import cert1 from "../assets/img/cert1.jpeg";
import cert2 from "../assets/img/cert2.jpeg";
import cert3 from "../assets/img/cert3.jpeg";
import cert4 from "../assets/img/cert4.jpeg";
import cert5 from "../assets/img/cert5.png";
import cert6 from "../assets/img/cert6.jpeg";
import cert7 from "../assets/img/cert7.jpeg";
import cert8 from "../assets/img/cert8.jpeg";
import cert9 from "../assets/img/cert9.jpeg";
import cert10 from "../assets/img/cert10.jpeg";
import cert11 from "../assets/img/cert11.jpeg";
import cert12 from "../assets/img/cert12.jpeg";
import cert13 from "../assets/img/cert13.jpeg";
import cert14 from "../assets/img/cert14.jpeg";
import cert15 from "../assets/img/cert15.jpeg";
import cert16 from "../assets/img/cert16.jpeg";
import cert17 from "../assets/img/cert17.jpeg";
import cert18 from "../assets/img/cert18.jpeg";
import { useLanguage } from "../i18n/LanguageContext";

const certificatesMeta = [
    {
        key: "jsWebDeveloper",
        imgUrl: "https://softuni.bg/certificates/details/185271/46d18211",
        img: cert1
    },
    {
        key: "mysql",
        imgUrl: "https://softuni.bg/certificates/details/226214/e4019d94",
        img: cert18
    },
    {
        key: "containersCloud",
        imgUrl: "https://softuni.bg/certificates/details/225479/ce73942a",
        img: cert17
    },
    {
        key: "javaAdvance",
        imgUrl: "https://softuni.bg/certificates/details/203382/3e2e30b7",
        img: cert2
    },
    {
        key: "javaFundamentals",
        imgUrl: "https://softuni.bg/certificates/details/195145/c10f50f2",
        img: cert3
    },
    {
        key: "javaOop",
        imgUrl: "https://softuni.bg/certificates/details/211065/3ca50784",
        img: cert4
    },
    {
        key: "internTeamLead",
        imgUrl: "https://drive.google.com/file/d/1HAVNopZsz644p_lY8Q1Oogcr1DbC4RLR/view?pli=1",
        img: cert5
    },
    {
        key: "postgresql",
        imgUrl: "https://softuni.bg/certificates/details/216935/1e04bc5e",
        img: cert6
    },
    {
        key: "jsAdvanced",
        imgUrl: "https://softuni.bg/certificates/details/145356/24d4c3a8",
        img: cert7
    },
    {
        key: "htmlCss",
        imgUrl: "https://softuni.bg/certificates/details/127626/4af97c58",
        img: cert8
    },
    {
        key: "softwareTech",
        imgUrl: "https://softuni.bg/certificates/details/56833/6cd31a3c",
        img: cert9
    },
    {
        key: "javaBasics",
        imgUrl: "https://softuni.bg/certificates/details/53854/9d4168c0",
        img: cert10
    },
    {
        key: "reactJs",
        imgUrl: "https://softuni.bg/certificates/details/168611/6bbe309d",
        img: cert11
    },
    {
        key: "angular",
        imgUrl: "https://softuni.bg/certificates/details/182994/647a6f7a",
        img: cert12
    },
    {
        key: "jsBackEnd",
        imgUrl: "https://softuni.bg/certificates/details/175230/51bce23f",
        img: cert13
    },
    {
        key: "jsApplications",
        imgUrl: "https://softuni.bg/certificates/details/167781/ed8020f8",
        img: cert14
    },
    {
        key: "jsFundamentals",
        imgUrl: "https://softuni.bg/certificates/details/139037/70a130ce",
        img: cert15
    },
    {
        key: "programmingBasic",
        imgUrl: "https://softuni.bg/certificates/details/125134/4d6c8840",
        img: cert16
    },
];

export default function Certificates() {
    const { t } = useLanguage();
    const certificates = certificatesMeta.map((certificate) => ({
        ...certificate,
        title: t.certificates.items[certificate.key],
    }));


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
                            <h2>{t.certificates.title}</h2>
                            <p>{t.certificates.description}</p>
                            <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                                {certificates?.map(c =>
                                    <div className="item" key={c.key}>
                                        <a href={c.imgUrl} className='no-underline'>
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
