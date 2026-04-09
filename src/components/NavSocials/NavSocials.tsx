import { type FC } from "react";
import { type IconType } from "react-icons";
import { FaFacebookF } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import "./NavSocials.scss";

interface Social {
  name: string;
  href: string;
  Icon: IconType;
}

const socials: Social[] = [
  {
    name: "facebook",
    href: "https://www.facebook.com/ZidgyRoadLabs",
    Icon: FaFacebookF
  },
  {
    name: "twitter-x",
    href: "https://x.com/zidgyroadlabs",
    Icon: RiTwitterXLine
  }
];

const NavSocials: FC = () => {
  return (
    <>
      <ul className="navSocials">

        {socials.map(({ name, href, Icon }) => (

          <li key={name} className={`navSocials__social navSocials__social--${name}`}>
            <a
              href={href}
              className="navSocials__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className={`navSocials__icon navSocials__icon--${name}`} />
            </a>
          </li>

        ))}
        
      </ul>
    </>
  );
};

export default NavSocials;