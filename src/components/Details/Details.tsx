import { type FC } from 'react';
import "./Details.scss"

const Details:FC = () => {
  return (
    <>
      <div className="details" id="details">
        <div className="details__inner">
          <h2 className="details__heading">
            Details
          </h2>

          <div className="detail">
            <div className="header__accentBar"></div>

          </div>

        </div>
      </div>
      
    </>
  )};

export default Details;