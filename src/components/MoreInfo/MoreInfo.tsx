import { type FC } from 'react';
import { FaCheck } from "react-icons/fa";
import "./MoreInfo.scss";

const MoreInfo:FC = () => {
  return (
    <>
      <section className="moreInfo" aria-labelledby="more-info-heading">
        <div className="moreInfo__inner">

          <div className="moreInfo__text">
            <h2 className='moreInfo__heading'>Get More Information</h2>

            <p className="moreInfo__subheading">
              We provide innovative software solutions that empower businesses to thrive in the digital era.
            </p>

            <ul className="moreInfo__solutions">

              <li className="moreInfo__solution">
                <i className="moreInfo__solutionCheck"><FaCheck /></i>
                <span className="moreInfo__solutionText">
                  <span className="moreInfo__solutionSpan">Customized Solutions:</span> Our solutions are designed to meet your specific business needs, ensuring maximum efficiency and productivity.
                </span>
              </li>

              <li className="moreInfo__solution">
                <i className="moreInfo__solutionCheck"><FaCheck /></i>
                <span className="moreInfo__solutionText">
                  <span className="moreInfo__solutionSpan">Seamless Integration:</span> We seamlessly integrate our software with your existing systems, minimizing disruptions and optimizing workflows.
                </span>
              </li>

            </ul>
            
          </div>

          <section className="moreInfo__formSection">

            <form className="moreInfo__form">
              <h2>More Info Form</h2>

              <button className="moreInfo__submit">
                Submit
              </button>

            </form>
          </section>

        </div>
      </section>
    </>
  )};

export default MoreInfo;