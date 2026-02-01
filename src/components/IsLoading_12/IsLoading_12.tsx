import { type FC } from "react";
import "./IsLoading_12.scss";


// four balls spinning and merging
const IsLoading_12: FC = () => {
  return (
    <>
      <div className="isLoading_12">
        <div className="wrapper">
          <ul className="loader-list">
            <li>
              <div className="loader-ball center"><span></span></div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )};

export default IsLoading_12;