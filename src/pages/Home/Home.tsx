import type { FC } from "react";
import Header from "../../components/Header/Header";
import "./Home.scss";
import PartnerCarousel from "../../components/Partners/Partners";

const Home: FC = () => {
  return (
    <>
      <div className="home">
        <div className="home__inner">
          <Header />
          <main className="home__main">
            <PartnerCarousel />
          </main>
        </div>
      </div>
    </>
  )};

export default Home;