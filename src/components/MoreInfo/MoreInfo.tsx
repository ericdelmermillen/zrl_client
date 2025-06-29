import { type FC } from 'react';
import MoreInfoForm from '../MoreInfoForm/MoreInfoForm';
import MoreInfoText from '../MoreInfoText/MoreInfoText';
import "./MoreInfo.scss";

const MoreInfo:FC = () => {
  return (
    <>
      <section 
        className="moreInfo" 
        aria-labelledby="more-info-heading"
        id="moreInfo"
        // id="solutions"
      >
        <div className="moreInfo__inner">
          <MoreInfoText />
          <MoreInfoForm />
        </div>
      </section>
    </>
  )};

export default MoreInfo;