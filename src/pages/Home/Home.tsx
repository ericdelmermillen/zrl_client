import type { FC } from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";

const Home: FC = () => {
  return (
    <>
      <div className="home">
        <div className="home__inner">
          <Header />
          <main className="home__main">
            <h1 className="home__h1">You're on home, yo'!</h1>      
            {/* <BlogFeed /> */}
            {/* <Services /> */}
            {/* <ContactForm /> */}
          </main>
        </div>
      </div>
    </>
  )};

export default Home;