import { type FC } from 'react';
import Solution from '../Solution/Solution';
import solution_1 from "../../assets/images/solution-1.jpg"
import solution_2 from "../../assets/images/solution-2.jpg"
import solution_3 from "../../assets/images/solution-3.jpg"
import solution_4 from "../../assets/images/solution-4.jpg"
import "./Solutions.scss";

interface SolutionData {
  image: string;
  title: string;
  text: string;
  tag: string;
};

const solutions: SolutionData[] = [
  { 
    image: solution_1, 
    title: "ERP Solutions",
    text: "Our ERP software solution streamlines your business processes and enhances operational efficiency. With integrated modules for finance, human resources, and more, you can make data-driven decisions.",
    tag: "MANAGEMENT",
  },
  { 
    image: solution_2, 
    title: "CRM Software Solutions",
    text: "Our CRM software solution helps you build stronger customer relationships and drive sales growth. Manage leads, track interactions, and deliver personalized experiences to maximize customer satisfaction and loyalty.",
    tag: "MARKETING",
  },
  { 
    image: solution_3, 
    title: "SFA Software Solutions",
    text: "Our SFA software solution empowers your sales team with the tools they need to drive revenue growth. Streamline sales processes, track performance, and enhance collaboration to close deals faster.",
    tag: "MANAGEMENT",
  },
  { 
    image: solution_4, 
    title: "WMS Software Solutions",
    text: "Our WMS software solution optimizes your warehouse operations and improves inventory management. Gain real-time visibility, automate processes, and reduce costs to ensure efficient logistics.",
    tag: "MARKETING",
  }
];

const Solutions: FC = () => {
  return (
    <>
      <section className="solutions" id="solutions">
        <div className="solutions__inner">
          <h2 className="solutions__heading">
            Solutions
          </h2>
          <p className="solutions__subheading">
            Zidgy Road Labs Provides Software Solutions For Business Acceleration
          </p>

          <div className="solutions__container">

            {solutions.map((solution, idx) =>

              <Solution 
                key={idx}
                img={solution.image}
                title={solution.title}
                text={solution.text}
                tag={solution.tag}
              />
            )}

          </div>

        </div>

      </section>
      
    </>
  )};

export default Solutions;