import { type FC, useEffect } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { scrollToTop } from "../../../utils/utils";
import Newsletter from "../../components/Newsletter/Newsletter";
import WelcomeEmail from "../../components/WelcomeEmail/WelcomeEmail";
import "./Admin.scss"


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

          <div className="admin__content">
            <WelcomeEmail />      
            <Newsletter />
          </div>

        </div>        
      </div>
    </>
  )};

export default Admin;