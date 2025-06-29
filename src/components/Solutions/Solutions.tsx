import { type FC } from 'react';
import "./Solutions.scss";
import Solution from '../Solution/Solution';

const Solutions:FC = () => {
  return (
    <>
      <div className="solutions" id="solutions">
        <div className="solutions__inner">
          <h2 className="solutions__heading">
            Solutions
          </h2>
          <p className="solutions__subheading">
            Zidgy Road Labs Provides Software Solutions For Business Acceleration
          </p>

          <div className="solutions__solution-container">
            <Solution />
            <Solution />
            <Solution />
            <Solution />

          </div>

        </div>

      </div>
      
    </>
  )};

export default Solutions;