import { type FC, useEffect } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { useAppContext, useDocumentTitle, usePageLoading, useScrollToTopOnPageMount } from "../../hooks/hooks";
import BackButton from "../../components/BackButton/BackButton";
import "./NotFound.scss";

const NotFound: FC<ChildrenPropsInterface> = ({ children }) => {
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
      <div className="notFound">
        <div className="notFound__inner">
          <BackButton />
          {children}

          <div className="notFound__text">
          <h1 className="notFound__h1">Ain't nothin' here, yo'!</h1>
            <h2 className="notFound__heading">Error 404</h2>
            <h3 className="notFound__sub-heading">Page Not Found</h3>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default NotFound;