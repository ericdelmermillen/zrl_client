import type { FC } from "react";
import Header from "../../components/Header/Header";
import MoreInformation from "../../components/MoreInformation/MoreInformation";
import PartnerCarousel from "../../components/Partners/Partners";
import "./Home.scss";

const Home: FC = () => {
  return (
    <>
      <div className="home">
        <div className="home__inner">
          <Header />
          <main className="home__main">
            <PartnerCarousel />
            <MoreInformation />
          </main>
        </div>
      </div>
    </>
  )};

export default Home;