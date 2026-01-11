import { type FC } from "react";
import { type DetailProps } from "../../typing/interfaces/interfaces";
import BulletCheck from "../BulletCheck/BulletCheck";
import "./Detail.scss";


const Detail: FC<DetailProps> = ({
  detailHeading,
  detailLead,
  bullets,
  detailImg,
  idx,
  imgDesc
}) => {

  const isEven = idx % 2 === 0;


  return (
    <div className={`detail ${!isEven && "detail--odd"}`} >

      <div className={`detail__text ${isEven ? "detail__text--even" : "detail__text--odd"}`}>
        <h3 className="detail__heading">{detailHeading}</h3>
        <p className="detail__lead">{detailLead}</p>

        <ul className="detail__points">
          {bullets.map((bullet, idx) => (
            <BulletCheck
              key={idx}
              bulletHeadingShort={bullet.bulletHeadingShort}
              bulletHeadingFull={bullet.bulletHeadingFull}
              bulletBlurb={bullet.bulletBlurb}
            />
          ))}
        </ul>
      </div>

      <div className="detail__cardImage">
        <img className="detail__image" src={detailImg} alt={imgDesc} />
      </div>
    </div>
  )};

export default Detail;