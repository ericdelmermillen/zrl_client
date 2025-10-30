import {type FC } from 'react';
import { FaCheck } from 'react-icons/fa6';
import "./BulletCheck.scss"


interface BulletCheckProps {
  bulletHeading: string;
  bulletBlurb: string;
}


const BulletCheck: FC<BulletCheckProps> = ({ bulletHeading, bulletBlurb }) => {

  return (
    <>
      <li className="bulletCheck">

        <i className="bulletCheck__check">
          <FaCheck />
        </i>

        <div className="bulletCheck__text">
          <h3 className="bulletCheck__heading">
            {bulletHeading}
          </h3>{" "}
          <p className="bulletCheck__blurb">
          {bulletBlurb}
          </p>
        </div> 

      </li>
      
    </>
  )};

export default BulletCheck;