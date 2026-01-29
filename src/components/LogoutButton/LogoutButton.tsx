import { type FC } from "react";
import { useAppContext } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import "./LogoutButton.scss";

// ***make this an async component as Logout call will be async

const LogoutButton: FC = () => {
  const navigate = useNavigate();

  const { logoutUser } = useAppContext();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };


  return (
    <button
      className="logoutButton"
      onClick={handleLogout}
      type="button"
      aria-label="Logout"
    >
      <span className="logoutButton__content">
        <span className="logoutButton__text">LOGOUT</span>
        <span className="logoutButton__icon"><BiLogOutCircle /></span>
      </span>
    </button>
  )};

export default LogoutButton;