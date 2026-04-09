import { type FC } from "react";
import { type FooterSocial } from "../../typing/interfaces/interfaces";
import { FaTwitter, FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import "./Footer.scss";

const footerSocials: FooterSocial[] = [
  { name: "LinkedIn", socialLink: "https://www.linkedin.com/company/zidgy-road-labs-inc/", socialIcon: FaLinkedinIn },
  { name: "Facebook", socialLink: "https://www.facebook.com/ZidgyRoadLabs", socialIcon: FaFacebook },
  { name: "Twitter", socialLink: "http://x.com/zidgyroadlabs", socialIcon: FaTwitter },
  { name: "Instagram", socialLink: "https://www.instagram.com/zidgyroadlabs/", socialIcon: GrInstagram }
];

const Footer: FC = () => {
  return (
    <>    
      <footer className="footer">
        <div className="footer__content">

          <p className="footer__copyright">
            Zidgy Road Labs Inc &copy; {new Date().getFullYear()}
          </p>

          <ul className="footer__socials">

            {footerSocials.map((social) => (

              <li key={social.name} className="footer__social">
                <a 
                  href={social.socialLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={social.name}
                  aria-label={social.name}
                >
                <social.socialIcon className="footer__social-icon"/>
                </a>
              </li>

          ))}

          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;