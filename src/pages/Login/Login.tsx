import { type FC, useEffect } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { useDocumentTitle, usePageLoading, useScrollToTopOnPageMount, useAppContext } from "../../hooks/hooks";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.scss";

const Login: FC<ChildrenPropsInterface> = ({ children }) => {
  useDocumentTitle("Zidgy Road Lab's Admin Login Page");
  usePageLoading();
  useScrollToTopOnPageMount();

  const { appIsLoading, handleSetShowAppIsLoadingFalse } = useAppContext();

  useEffect(() => {
    if (appIsLoading) {
      handleSetShowAppIsLoadingFalse();
    };
  }, [appIsLoading]);


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