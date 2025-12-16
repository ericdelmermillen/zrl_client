import { type FC, type ReactNode, useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import BackButton from "../../components/BackButton/BackButton";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.scss"

interface LoginProps {
  children?: ReactNode;
}

const Login: FC<LoginProps> = ({ children }) => {

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
          <BackButton />
          { children }

          <div className="login__content">
            <LoginForm />
          </div>

          
        </div>
        
      </div>
    </>
  )};

export default Login;