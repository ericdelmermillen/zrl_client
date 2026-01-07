import { type FC } from "react";
import { type DetailData } from "../../typing/interfaces/interfaces";
import Detail from "../Detail/Detail";
import detailsImg_1 from "../../assets/images/details-1.jpg";
import detailsImg_2 from "../../assets/images/details-2.jpg";
import "./Details.scss";


  const details: DetailData[] = [
    {
      detailHeading: "Evaluation & Deployment",
      detailLead: "We offer comprehensive evaluation and deployment services to ensure a smooth and successful implementation of our software solutions.",
      bullets: [
        {
          bulletHeadingShort: "Evaluation:",
          bulletHeadingFull: "Evaluation & Deployment:",
          bulletBlurb: "We tailor our solutions to align with your unique business needs",
        },
        {
          bulletHeadingShort: "Integration:",
          bulletHeadingFull: "Seamless Integration:",
          bulletBlurb: "Our team ensures smooth integration of the software into your existing infrastructure, minimizing disruptions",
        },
      ],
      detailImg: detailsImg_1,
      imgDesc: "description of first details image"
    },
    {
      detailHeading: "Maintenance & Support",
      detailLead: "We provide comprehensive maintenance and support services to ensure the smooth and uninterrupted operation of your software solutions.",
      bullets: [
        {
          bulletHeadingShort: "Proactive Maintenance:",
          bulletHeadingFull: "Proactive Maintenance:",
          bulletBlurb: "We proactively monitor and maintain your software solutions to prevent issues and optimize performance.",
        },
        {
          bulletHeadingShort: "Timely Updates:",
          bulletHeadingFull: "Timely Updates:",
          bulletBlurb: "We ensure your software is up to date with the latest features, security patches, and enhancements.",
        },
      ],
      detailImg: detailsImg_2,
      imgDesc: "description of second details image"
    }
  ];


const Details: FC = () => {

  return (
    <section className="details" id="details">
      <div className="details__inner">
        <h2 className="details__heading">Details</h2>

        {details.map((detail, idx) => (
          <Detail
            key={idx}
            idx={idx}
            detailHeading={detail.detailHeading}
            detailLead={detail.detailLead}
            bullets={detail.bullets}
            detailImg={detail.detailImg}
            imgDesc={detail.imgDesc}
          />

        ))}
        
      </div>
    </section>
  )};

export default Details;