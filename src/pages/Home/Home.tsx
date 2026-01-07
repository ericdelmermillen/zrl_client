import { type FC, useEffect,} from "react";
// import Header_1 from "../../components/Header_1/Header_1";
import Details from "../../components/Details/Details";
import Expertise from "../../components/Expertise/Expertise";
import Header_2 from "../../components/Header_2/Header_2";
import MoreInfo from "../../components/MoreInfo/MoreInfo";
// import Partners from "../../components/Partners/Partners";
import Solutions from "../../components/Solutions/Solutions";
import Subscribe from "../../components/Subscribe/Subscribe";
import "./Home.scss";

const Home: FC = () => {

  // useEffect to set page's title
  useEffect(() => {
    document.title = "Zidgy Road Labs | Professional Web Development Services";
  }, []);
    
  
  return (
    <>
      <div className="home">

        <div className="home__inner">
          {/* <Header_1 /> */}
          <Header_2 />
          <main className="home__main">
            {/* <Partners /> */}
            <MoreInfo />
            <Solutions />
            <Details />
            <Expertise />
            {/* <Values /> */}
            <Subscribe />
          </main>
        </div>
      </div>
    </>
  )};

export default Home;