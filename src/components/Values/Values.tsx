import { type FC } from "react";
import "./Values.scss";

// unlisted video on my youtube to embed: viewable and embeddable but not discoverable

const YOUTUBE_VIDEO_ID = import.meta.env.VITE_YOUTUBE_VIDEO_ID;
const embedUrl = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`;



const Values: FC = () => {
  return (
    <>
      <div className="values" id="values">
        <div className="values__inner">
          <h3 className="values__heading">Values</h3>
          <p className="values__lead">
            We have the best most valuable corporate values you guys -- you won't believe it.
          </p>

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
            <li className="values__point">Point 1</li>
            <li className="values__point">Point 2</li>
            <li className="values__point">Point 3</li>
          </ul>
        </div>
      </div>
      
    </>
  )};

export default Values;