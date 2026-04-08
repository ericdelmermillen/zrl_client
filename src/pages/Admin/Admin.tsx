import { type FC } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { useDocumentTitle, usePageLoading, useScrollToTopOnPageMount } from "../../hooks/hooks";
// import Newsletter from "../../components/Newsletter/Newsletter";
import MoreInfoEmail from "../../components/MoreInfoEmail/MoreInfoEmail";
import "./Admin.scss";


const Admin: FC<ChildrenPropsInterface> = ({ children }) => {
  useDocumentTitle("Zidgy Road Lab's Admin Page");
  usePageLoading();
  useScrollToTopOnPageMount();    

  // in future handle using handleSetAppIsLoadingFalse via handlers in the components that cummulatively set state which triggers handleSetAppIsLoadingFalse
  
  return (
    <>
      <div className="admin">
        <div className="admin__inner">
            { children }
          <div className="admin__content">
            <MoreInfoEmail />      
            {/* <Newsletter /> */}
          </div>
        </div>        
      </div>
    </>
  )};

export default Admin;