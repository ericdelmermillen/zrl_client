import { useEffect, type FC } from "react";
import { scrollToTop } from "../../../utils/utils";
// import BackButton from "../../components/BackButton/BackButton";
import "./NotFound.scss";

const NotFound: FC = () => {


  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // update title of page
  useEffect(() => {
      document.title = "Zidgy Road Lab's Not Found Page";
  }, []);
  
  
  return (
    <>
      <div className="notFound">
        <div className="notFound__inner">

          <div className="notFound__text">
          <h1 className="notFound__h1">Ain't nothin' here, yo'!</h1>
            <h1 className="notFound__heading">Error 404</h1>
            <h3 className="notFound__sub-heading">Page Not Found</h3>
          </div>
        </div>
      </div>
    </>
  )};

export default NotFound;