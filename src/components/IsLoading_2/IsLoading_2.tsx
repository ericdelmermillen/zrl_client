import { type FC } from "react";
import "./IsLoading_2.scss";


// three rotating squares
const IsLoading_2: FC = () => {
  return (
    <>
      <div className="isLoading_2">

        <div className="container">
          <div className="square square1"></div>
          <div className="square square2"></div>
          <div className="square square3"></div>
        </div>
      </div>
    </>
  )};

export default IsLoading_2;
