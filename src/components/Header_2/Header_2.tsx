import { type FC, useState, useEffect } from "react";
import "./Header_2.scss";

const solutions: string[] = [" Small Business", "Enterprise", "Startups"];

const Header_2: FC = () => {
  const [ solutionIdx, setSolutionIdx ] = useState<number>(0);

  // useEffect to setInterval for rotating solutionIdx
useEffect(() => {
  const interval = setInterval(() => {
    setSolutionIdx(prev =>
      prev === solutions.length - 1 
        ? 0 
        : prev + 1
    );
  }, 2000);

  return () => clearInterval(interval);
}, []);

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <div className="header__overlay"></div>
          <div className="header__accentBar"></div>
          <div className="header__text">
            <h1 className="header__heading">Software Solutions</h1>
            <h2 className="header__subheading">
              For <span className="header__solution">{solutions[solutionIdx]}</span>
            </h2>
            <p className="header__lead">
              Boost your business with cutting-edge software solutions tailored to the needs of modern enterprises.
            </p>

            <a href="#moreInfo" className="header__button">
              Learn More
            </a>
          </div>

        </div>
      </header>
      
    </>
  )};

export default Header_2;