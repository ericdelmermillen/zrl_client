import { type FC } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { usePageLoading, useDocumentTitle, useScrollToTopOnPageMount } from "../../hooks/hooks";
import Newsletter from "../../components/Newsletter/Newsletter";
import WelcomeEmail from "../../components/WelcomeEmail/WelcomeEmail";
import "./Admin.scss";


const Admin: FC<ChildrenPropsInterface> = ({ children }) => {
  usePageLoading();
  useDocumentTitle("Zidgy Road Lab's Admin Page");
  useScrollToTopOnPageMount();    
  
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