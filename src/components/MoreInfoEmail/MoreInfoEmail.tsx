import { type FC, useEffect } from "react";
import "./MoreInfoEmail.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MoreInfoEmail:FC = () => {

     const getMoreInfoEmail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/moreinfo`, {
          method: "GET",
          credentials: "include"
        });

        const { subject, greeting, body_content } = await response.json();
        
        console.log(subject);
        console.log(greeting);
        console.log(body_content);
        
      } catch (error) {
        console.error("Failed to fetch more info email:", error);
      };
    };

  // useEffect to get content for moreInfoEmail form to edit
  useEffect(() => {
    getMoreInfoEmail();
  }, []);
  
  return (
    <>
      <section className="moreInfoEmail" >
        <div className="moreInfoEmail__inner">

          <h2 className="moreInfoEmail__heading">
            More Info Email
          </h2>
          
        </div>
        
      </section>
    </>
  )};

export default MoreInfoEmail;