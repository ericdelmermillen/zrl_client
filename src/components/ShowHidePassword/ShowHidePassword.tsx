import { type FC } from "react";
import Hide from "../../assets/svgs/Hide";
import Show from "../../assets/svgs/Show";
import "./ShowHidePassword.scss";

type ShowHidePasswordProps = {
  handleTogglePasswordVisibility: () => void;
  showPassword: boolean;
};

const ShowHidePassword: FC<ShowHidePasswordProps> = ({ 
  handleTogglePasswordVisibility, 
  showPassword
 }) => {
  
  return (
    <>
      <div className="showHidePassword">
        <button
          type="button"
          className={`showHidePassword__icon`}
          onClick={handleTogglePasswordVisibility}
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
        >
          {showPassword ? (
            <Hide className="passwordInput__icon--hide" />
          ) : (
            <Show className="passwordInput__icon--show" />
          )}
        </button>
        
      </div>
    </>
  )};

export default ShowHidePassword;