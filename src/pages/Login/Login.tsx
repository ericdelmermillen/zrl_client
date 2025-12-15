import { type FC, type ReactNode, useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./Login.scss"

interface LoginProps {
  children?: ReactNode;
}

const Login: FC<LoginProps> = ({ children }) => {

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

          <h1 className="login__h1">Login Page</h1>
          
        </div>
        
      </div>
    </>
  )};

export default Login;