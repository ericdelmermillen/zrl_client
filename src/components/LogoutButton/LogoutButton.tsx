import { type FC } from "react";
import { useAppContext } from "../../hooks/hooks";
import { BiLogOutCircle } from "react-icons/bi";
import "./LogoutButton.scss";

// ***make this an async component as Logout call will be async

const LogoutButton: FC = () => {
  const { logoutUser } = useAppContext();

  return (
    <button
      className="logoutButton"
      onClick={logoutUser}
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