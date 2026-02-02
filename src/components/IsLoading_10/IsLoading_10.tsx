import { type FC } from "react";
import "./IsLoading_10.scss";


// four balls spinning and merging
const IsLoading_10: FC = () => {
  return (
    <>
      <div className="isLoading_10">
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

export default IsLoading_10;