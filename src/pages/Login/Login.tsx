import { type FC } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { useDocumentTitle, usePageLoading, useScrollToTopOnPageMount } from "../../hooks/hooks";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.scss";

const Login: FC<ChildrenPropsInterface> = ({ children }) => {
  useDocumentTitle("Zidgy Road Lab's Admin Login Page");
  usePageLoading();
  useScrollToTopOnPageMount();

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
  );
};

export default Login;