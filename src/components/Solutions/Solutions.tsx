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
    title: "Brand Identity and Product Design",
    text: "We design visual identities and interface systems that keep your product consistent across software, web, and marketing touchpoints. Branding and UI work together to create clarity and trust.",
    tag: "DESIGN",
  },
    { 
    image: solution_2,
    title: "Customer-Facing Web Applications",
    text: "We build modern web applications that help you engage customers and deliver clear, polished digital experiences. Interfaces are designed with usability, performance, and consistency in mind from the start.",
    tag: "EXPERIENCE",
  },
  { 
    image: solution_3,
    title: "Custom Internal Tools",
    text: "We design and build internal tools that simplify workflows, reduce manual effort, and improve visibility across your business. From dashboards to admin interfaces, everything is shaped around how your team actually works.",
    tag: "MANAGEMENT",
  },

  { 
    image: solution_4,
    title: "Sales and Workflow Automation",
    text: "We create focused tools that support sales workflows, automate repetitive tasks, and improve collaboration. The goal is to remove friction and give teams software they actually enjoy using.",
    tag: "OPERATIONS",
  },

];

const Solutions: FC = () => {
  return (
    <>
      <section className="solutions" id="solutions">
        <div className="solutions__inner">
          <h2 className="solutions__heading">
            Solutions
          </h2>
          <p className="solutions__lead">
            <span className="solutions__lead-stem">We Design and Build </span> Custom Software Tailored to Your Business
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