import {type FC } from 'react';
import { type BulletCheckProps } from "../../typing/interfaces/interfaces"
import { FaCheck } from 'react-icons/fa6';
import "./BulletCheck.scss"


const BulletCheck: FC<BulletCheckProps> = ({ 
  bulletHeadingShort, 
  bulletHeadingFull, 
  bulletBlurb 
}) => {

  return (
    <>
      <li className="bulletCheck">

        <i className="bulletCheck__check">
          <FaCheck />
        </i>

        <div className="bulletCheck__text">
          <h3 className="bulletCheck__heading bulletCheck__heading--short">
            {bulletHeadingShort}
          </h3>
          <h3 className="bulletCheck__heading bulletCheck__heading--full">
            {bulletHeadingFull}
          </h3>
          <p className="bulletCheck__blurb">
          {bulletBlurb}
          </p>
        </div> 

      </li>
    </>
  )};

export default BulletCheck;