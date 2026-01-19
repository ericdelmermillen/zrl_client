import { type FC } from "react";
import "./Values.scss";
import BulletCheck from "../BulletCheck/BulletCheck";

// unlisted video on my youtube to embed: viewable and embeddable but not discoverable

const YOUTUBE_VIDEO_ID = import.meta.env.VITE_YOUTUBE_VIDEO_ID;
const embedUrl = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`;

const values = [
  {
    bulletHeadingShort: "Corporate Value One", 
    bulletHeadingFull: "Longer Corporate Value One", 
    bulletBlurb: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus qui ad totam temporibus fuga officiis?" 
  },
  {
    bulletHeadingShort: "Corporate Value Two", 
    bulletHeadingFull: "Longer Corporate Value Two", 
    bulletBlurb: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus qui ad totam temporibus fuga officiis?" 
  },
  {
    bulletHeadingShort: "Corporate Value Three", 
    bulletHeadingFull: "Longer Corporate Value Three", 
    bulletBlurb: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus qui ad totam temporibus fuga officiis?" 
  }
]



const Values: FC = () => {
  return (
    <>
      <div className="values" id="values">
        <div className="values__inner">
          <h3 className="values__heading">Values</h3>

          <h2 className="values__lead">
            We have the best most valuable corporate values you guys -- you won't believe it.
          </h2>

          <div className="values__videoWrap">
            <iframe
              className="values__video"
              src={embedUrl}
              title="Zidgy Road Labs - Values"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <ul className="values__points">
            {values.map((value, idx) => (
              <BulletCheck
                key={idx}
                bulletHeadingShort={value.bulletHeadingShort}
                bulletHeadingFull={value.bulletHeadingFull}
                bulletBlurb={value.bulletBlurb}
              />
            ))}
          </ul>
          
        </div>
      </div>
      
    </>
  )};

export default Values;