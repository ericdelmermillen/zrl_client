import { type FC } from "react";
import "./IsLoading.scss";

const IsLoading: FC = () => {
  return (
    <>
      <div className="isLoading">
        <div className="isLoading__loader"></div>
      </div>
    </>
  );
};

export default IsLoading;