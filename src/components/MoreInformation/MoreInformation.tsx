import { type FC } from 'react';
import { FaCheck } from "react-icons/fa";
import "./MoreInformation.scss";

const MoreInformation:FC = () => {
  return (
    <>
      <section className="moreInformation" aria-labelledby="more-info-heading">
        <div className="moreInformation__inner">

          <div className="moreInformation__text">
            <h2 className='moreInformation__heading'>Get More Information</h2>

            <p className="moreInformation__subheading">
              We provide innovative software solutions that empower businesses to thrive in the digital era.
            </p>

            <ul className="moreInformation__solutions">

              <li className="moreInformation__solution">
                <i className="moreInformation__solutionCheck"><FaCheck /></i>
                <span className="moreInformation__solutionText">
                  <span className="moreInformation__solutionSpan">Customized Solutions:</span> Our solutions are designed to meet your specific business needs, ensuring maximum efficiency and productivity.
                </span>
              </li>

              <li className="moreInformation__solution">
                <i className="moreInformation__solutionCheck"><FaCheck /></i>
                <span className="moreInformation__solutionText">
                  <span className="moreInformation__solutionSpan">Seamless Integration:</span> We seamlessly integrate our software with your existing systems, minimizing disruptions and optimizing workflows.
                </span>
              </li>

            </ul>
            
          </div>

          <section className="moreInformation__formSection">

            <form className="moreInformation__form">
              <h2>More Info Form</h2>

              <button className="moreInformation__submit">
                Submit
              </button>

            </form>
          </section>

        </div>
      </section>
    </>
  )};

export default MoreInformation;