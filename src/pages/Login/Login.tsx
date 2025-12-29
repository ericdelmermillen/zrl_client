import { type FC, useEffect } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { scrollToTop } from "../../../utils/utils";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.scss"


const Login: FC<ChildrenPropsInterface> = ({ children }) => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // useEffect to update title of page
  useEffect(() => {
      document.title = "Zidgy Road Lab's Admin Login Page";
  }, []);
    
  
  return (
    <>
      <div className="login">
        <div className="login__inner">
          { children }

          <div className="login__content">
            <LoginForm />
          </div>

        </div>        
      </div>
    </>
  )};

export default Login;