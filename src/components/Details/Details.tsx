import { type FC, useState, useEffect } from 'react';
import BulletCheck from '../BulletCheck/BulletCheck';
import detailsImg_1 from "../../assets/images/details-1.jpg";
import detailsImg_2 from "../../assets/images/details-2.jpg";
import "./Details.scss";

const details = [
  {
    detailHeading: "Evaluation & Deployment",
    detailLead: "We offer comprehensive evaluation and deployment services to ensure a smooth and successful implementation of our software solutions.",
    bullets: [
      {
        bulletHeading: "Evaluation & Deployment:",
        bulletBlurb: "We tailor our solutions to align with your unique business needs",
      },
      {
        bulletHeading: "Seamless Integration:",
        bulletBlurb: "Our team ensures smooth integration of the software into your existing infrastructure, minimizing disruptions",
      }
    ],
    detailImg: detailsImg_1
  },
  {
    detailHeading: "Maintenance & Support",
    detailLead: "We provide comprehensive maintenance and support services to ensure the smooth and uninterrupted operation of your software solutions.",
    bullets: [
      {
        bulletHeading: "Proactive Maintenance:",
        bulletBlurb: "We proactively monitor and maintain your software solutions to prevent issues and optimize performance.",
      },
      {
        bulletHeading: "Timely Updates:",
        bulletBlurb: "We ensure your software is up to date with the latest features, security patches, and enhancements.",
      }
    ],
    detailImg: detailsImg_2
  },
];

const Details: FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="details" id="details">
      <div className="details__inner">
        <h2 className="details__heading">Details</h2>

        {details.map((detail, detailIdx) => {
          const detailStyleObj: React.CSSProperties = {
            display: "flex",
            flexDirection: windowWidth < 1080
              ? "column"
              : detailIdx % 2 === 0
                ? "row"
                : "row-reverse",
          };

          const accentBarStyleObj: React.CSSProperties = detailIdx % 2 === 0
            ? { left: 0 }
            : { right: 0 };

          return (
            <div className="detail" style={detailStyleObj} key={detailIdx}>
              <div className="detail__accentBar" style={accentBarStyleObj}></div>

              <div className="detail__text">
                <h3 className="detail__heading">{detail.detailHeading}</h3>
                <p className="detail__lead">{detail.detailLead}</p>

                <ul className="detail__points">
                  {detail.bullets.map((bullet, bulletIdx) => (
                    <BulletCheck
                      key={bulletIdx}
                      bulletHeading={bullet.bulletHeading}
                      bulletBlurb={bullet.bulletBlurb}
                    />
                  ))}
                </ul>
              </div>

              <div className="detail__cardImage">
                <img className="detail__image" src={detail.detailImg} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Details;
