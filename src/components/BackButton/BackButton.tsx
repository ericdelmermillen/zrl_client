import { type FC, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import "./BackButton.scss";

const BackButton: FC = () => {
  const navigate = useNavigate();

  const handleBackClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };
  
  
  return (
    <>
      <button className="backButton" onClick={handleBackClick}>
        <span className="backButton__arrow">
          <IoArrowBackSharp />   
        </span>
      </button>
    </>
  )};

export default BackButton;