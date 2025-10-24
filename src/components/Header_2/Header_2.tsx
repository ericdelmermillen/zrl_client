import { useAppContext } from "../../contexts/AppContext";
import { type FC, useState, useEffect } from "react";
import "./Header_2.scss";

const solutions: string[] = ["Small Business", "Enterprise", "Startups"];

const Header_2: FC = () => {
  const { windowWidth } = useAppContext();

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

          <div className="header__left">

            <div className="header__text">
              <h1 className="header__heading"><span className="header__software">Software</span> Solutions</h1>
              <h2 className="header__subheading">
                <span className="header__for">For </span><br className="header__break"></br><span className="header__solution">{solutions[solutionIdx] === "Small Business" && windowWidth < 480 
                  ? "SMEs"
                  : solutions[solutionIdx]
                }</span>
              </h2>
              <p className="header__lead">
                Build better, faster, smarter with software solutions crafted for your unique needs.
              </p>

              <a href="#moreInfo" className="header__button">
                LEARN MORE
              </a>
            </div>
            
          </div>
          <div className="header__right"></div>

        </div>
      </header>
      
    </>
  )};

export default Header_2;