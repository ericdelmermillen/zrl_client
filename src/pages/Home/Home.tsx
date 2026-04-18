import { type FC } from "react";
import { useDocumentTitle, usePageLoading, useScrollToTopOnPageMount } from "../../hooks/hooks";
import Details from "../../components/Details/Details";
import Expertise from "../../components/Expertise/Expertise";
import Header from "../../components/Header/Header";
import MoreInfo from "../../components/MoreInfo/MoreInfo";
// import Partners from "../../components/Partners/Partners";
import Solutions from "../../components/Solutions/Solutions";
import Subscribe from "../../components/Subscribe/Subscribe";
import Values from "../../components/Values/Values";
import "./Home.scss";

const Home: FC = () => {
  useDocumentTitle("Zidgy Road Labs | Professional Web Development Services");
  usePageLoading();
  useScrollToTopOnPageMount();

  return (
    <>
      <div className="home">

        <div className="home__inner">
          <Header />
          <main className="home__main">
            {/* <Partners /> */}

            <div className="home__content">
              <MoreInfo />
              <Solutions />
              <Details />
              <Expertise />
              <Values />
              <Subscribe />
            </div>
            
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;