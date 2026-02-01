import { type FC } from "react";
import "./IsLoading_1.scss";


// flipping cards
const IsLoading_1: FC = () => {
  return (
    <>
      <div className="isLoading_1">

        <div className="grid">
          <article className="card">
            <div className="box">
              <div className="loader" aria-label="Loading">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </article>
        </div>

      </div>
    </>
  )};

export default IsLoading_1;