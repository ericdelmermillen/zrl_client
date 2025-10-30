import { type FC } from 'react';
import { FaCheck } from 'react-icons/fa6';
import "./Details.scss";


const accentBarDirection: "left" | "right" = "left";

const styleObj: React.CSSProperties = {
  [accentBarDirection]: 0,
};


const Details:FC = () => {
  return (
    <>
      <div className="details" id="details">
        <div className="details__inner">
          <h2 className="details__heading">
            Details
          </h2>


          <div className="detail">
            <div className="detail__accentBar" style={styleObj}></div>
            <div className="detail__text">

              <h3 className="detail__heading">
                Evaulation & Deployment
              </h3>

              <p className="detail__lead">
                We offer comprehensive evaluation and deployment services to ensure a smooth and successful implementation of our software solutions.
              </p>

              <ul className="detail__solutions">

                <li className="detail__solution">
                  <i className="detail__solutionCheck">
                    <FaCheck />
                  </i>
                  <span className="detail__solutionText">
                    <span className="detail__solutionSpan">
                      Customized solutions: 
                    </span>{" "}
                    We tailor our solutions to align with your unique business needs
                  </span>
                </li>

                <li className="detail__solution">
                  <i className="detail__solutionCheck">
                    <FaCheck />
                  </i>
                  <span className="detail__solutionText">
                    <span className="detail__solutionSpan">
                      Customized solutions: 
                    </span>{" "}
                    We tailor our solutions to align with your unique business needs
                  </span>
                </li>

              </ul>

            </div> 

          </div>



        </div>
      </div>
      
    </>
  )};

export default Details;