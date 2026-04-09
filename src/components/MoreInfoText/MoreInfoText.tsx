import{ type FC } from "react";
import type { MoreInfoTextData } from "../../typing/interfaces/interfaces";
import BulletCheck from "../BulletCheck/BulletCheck";
import "./MoreInfoText.scss";

const moreInfoPoint: MoreInfoTextData[] = [
  {
    titleShort: "Customized Solutions:",
    titleFull: "Customized Solutions:",
    description: "Our solutions are designed to meet your specific business needs, ensuring maximum efficiency and productivity."
  },
  {
    titleShort: "Seamless Integration:",
    titleFull: "Seamless Integration:",
    description: "We seamlessly integrate our software with your existing systems, minimizing disruptions and optimizing workflows."
  }
];

const MoreInfoText:FC = () => {
  return (
    <>
      <article className="moreInfoText">
        <div className="moreInfoText__inner">
          <h2 className="moreInfoText__heading">Get More Information</h2>

          <p className="moreInfoText__lead">
            We provide innovative software solutions that empower businesses to thrive in the digital era.
          </p>

           <ul className="moreInfoText__bullets">

              {moreInfoPoint.map((point, idx) => (

                <BulletCheck 
                  key={idx}
                  bulletHeadingShort={point.titleShort}
                  bulletHeadingFull={point.titleFull}
                  bulletBlurb={point.description}
                />

              ))}
            
            </ul>
        </div>
      </article>
    </>
  );
};

export default MoreInfoText;