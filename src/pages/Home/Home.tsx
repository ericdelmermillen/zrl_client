import { useEffect, type FC } from "react";
import Header from "../../components/Header/Header";
import MoreInfo from "../../components/MoreInfo/MoreInfo";
import PartnerCarousel from "../../components/Partners/Partners";
import "./Home.scss";

const Home: FC = () => {

  useEffect(() => {
    document.title = "Zidgy Road Labs | Professional Web Development Services";
  }, []);
    
  
  
  return (
    <>
      <div className="home">
        <div className="home__inner">
          <Header />
          <main className="home__main">
            <PartnerCarousel />
            <MoreInfo />
          </main>
        </div>
      </div>
    </>
  )};

export default Home;