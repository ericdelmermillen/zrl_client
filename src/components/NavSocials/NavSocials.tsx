import { type FC } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import "./NavSocials.scss";

const NavSocials: FC = () => {
  return (
    <>
      <ul className="navSocials">
        <li className="navSocials__social navSocials__social--facebook">
          <a 
            href="https://www.facebook.com/ZidgyRoadLabs"
            className="navSocials__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="navSocials__icon navSocials__icon--facebook" />
          </a>
        </li>

        <li className="navSocials__social navSocials__social--twitter-x">
          <a 
            href="https://x.com/zidgyroadlabs"
            className="navSocials__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiTwitterXLine className="navSocials__icon navSocials__icon--twitter-x" />
          </a>
        </li>
      </ul>
    </>
  )};

export default NavSocials;