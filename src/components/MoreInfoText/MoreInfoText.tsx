import{ type FC } from 'react';
import { FaCheck } from 'react-icons/fa6';
import "./MoreInfoText.scss";

const solutions = [
  {
    title: "Customized Solutions:",
    description: "Our solutions are designed to meet your specific business needs, ensuring maximum efficiency and productivity.",
  },
  {
    title: "Seamless Integration:",
    description: "We seamlessly integrate our software with your existing systems, minimizing disruptions and optimizing workflows.",
  },
];

const MoreInfoText:FC = () => {
  return (
    <>
      <article className="moreInfoText">
        <div className="moreInfoText__inner">
          <h2 className='moreInfoText__heading'>Get More Information</h2>

          <p className="moreInfoText__subheading">
            We provide innovative software solutions that empower businesses to thrive in the digital era.
          </p>

           <ul className="moreInfoText__solutions">

            {solutions.map((solution, index) => (
              <li className="moreInfoText__solution" key={index}>
                <i className="moreInfoText__solutionCheck">
                  <FaCheck />
                </i>
                <span className="moreInfoText__solutionText">
                  <span className="moreInfoText__solutionSpan">
                    {solution.title}
                  </span>{" "}
                  {solution.description}
                </span>
              </li>
            ))}
            
        </ul>
        </div>
      </article>
      
    </>
  )};

export default MoreInfoText;