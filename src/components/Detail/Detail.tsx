import { type FC } from 'react';
import { useAppContext } from "../../contexts/AppContext";
import BulletCheck from '../BulletCheck/BulletCheck';
import "./Detail.scss";

interface Bullet {
  bulletHeading: string;
  bulletBlurb: string;
}

interface DetailProps {
  detailHeading: string;
  detailLead: string;
  bullets: Bullet[];
  detailImg: string;
  idx: number;
  imgDesc: string
}


const Detail: FC<DetailProps> = ({
  detailHeading,
  detailLead,
  bullets,
  detailImg,
  idx,
  imgDesc
}) => {

  const { windowWidth } = useAppContext()
  const isEven = idx % 2 === 0;

  const detailStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: windowWidth < 1080 ? "column" : isEven ? "row" : "row-reverse",
  };

  const accentBarStyle: React.CSSProperties = isEven ? { left: 0 } : { right: 0 };

  return (
    <div className="detail" style={detailStyle}>
      <div className="detail__accentBar" style={accentBarStyle}></div>

      <div className="detail__text">
        <h3 className="detail__heading">{detailHeading}</h3>
        <p className="detail__lead">{detailLead}</p>

        <ul className="detail__points">
          {bullets.map((bullet, idx) => (
            <BulletCheck
              key={idx}
              bulletHeading={bullet.bulletHeading}
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
