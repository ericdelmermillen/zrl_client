import { type FC, useEffect } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { scrollToTop } from "../../../utils/utils";
import "./Admin.scss"
import WelcomeEmail from "../../components/WelcomeEmail/WelcomeEmail";


const Admin: FC<ChildrenPropsInterface> = ({ children }) => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // useEffect to update title of page
  useEffect(() => {
      document.title = "Zidgy Road Lab's Admin Page";
  }, []);
    
  
  return (
    <>
      <div className="admin">
        <div className="admin__inner">
          { children }

          <WelcomeEmail />          
          <div className="admin__content">
          </div>

        </div>        
      </div>
    </>
  )};

export default Admin;