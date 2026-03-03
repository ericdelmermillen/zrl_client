import { type FC, useState, useEffect } from "react";
import { useAppContext } from "../../hooks/hooks";
import "./MoreInfoEmail.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// appIsLoading or componentIsLoading?
// 

const MoreInfoEmail:FC = () => {
  const { setAppIsLoading, handleSetShowAppIsLoadingFalse } = useAppContext()
  const [ moreInfoEmailSubject, setMoreInfoEmailSubject ] = useState<string>("");
  const [ moreInfoEmailGreeting, setMoreInfoEmailGreeting ] = useState<string>("");
  const [ moreInfoEmailContent, setMoreInfoEmailContent ] = useState<string>("");
  const [ companyName, setCompanyName ] = useState<string>("");
  const [ copyRight, setCopyRight ] = useState<string>("");
  const [ isEditing, setIsEditing ] = useState<boolean>(false);

  const handleSetIsEditingFalse = (): void => setIsEditing(false);
  const handleSetIsEditingTrue = (): void => setIsEditing(true);

  const saveUpdatedMoreInfoEmail = (): void => {
    setAppIsLoading(true);
    handleSetShowAppIsLoadingFalse();
    setIsEditing(false);
  };


  const getMoreInfoEmail = async () => {
    try {
      const response = await fetch(`${BASE_URL}/moreinfo`, {
        method: "GET",
        credentials: "include"
      });

      const { subject, greeting, body_content, companyName, copyRight } = await response.json();

      setMoreInfoEmailSubject(subject);
      setMoreInfoEmailGreeting(greeting);
      setMoreInfoEmailContent(body_content);
      setCompanyName(companyName)
      setCopyRight(copyRight)
      
    } catch (error) {
      console.error("Failed to fetch more info email:", error);
    };
  };


  // useEffect to call for initial MoreInfoEmail content
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

          <p className="moreInfoEmail__admin-explainer">
            Edit More Info form Email Template
          </p>

          <form
            name="moreInfoEmailForm"
            className="moreInfoEmail__form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="moreInfoEmail__text">

              <label 
                htmlFor="moreInfoEmailSubject" 
                className="moreInfoEmail__label"
              >
                Email Subject
              </label>

              {isEditing 

                ? <input
                    id="moreInfoEmailSubject"
                    className="moreInfoEmail__input"
                    type="text"
                    value={moreInfoEmailSubject}
                    onChange={(e) => setMoreInfoEmailSubject(e.target.value)}
                  />
                : <p className="moreInfoEmail__subject" id="moreInfoEmailSubject">
                    {moreInfoEmailSubject}
                  </p>

              }

              <label 
                htmlFor="moreInfoEmailGreeting" 
                className="moreInfoEmail__label"
              >
                Email greeting (* must include a &lt;name&gt; placeholder)
              </label>
              
              {isEditing

                ? <input
                    id="moreInfoEmailGreeting"
                    className="moreInfoEmail__input"
                    type="text"
                    value={moreInfoEmailGreeting}
                    onChange={(e) => setMoreInfoEmailGreeting(e.target.value)}
                  />
                : <p className="moreInfoEmail__greeting" id="moreInfoEmailGreeting">
                    {moreInfoEmailGreeting}
                  </p>

              }

              <label 
                htmlFor="moreInfoEmailBodyContent" 
                className="moreInfoEmail__label"
              >
                Email body content
              </label>
              
              {isEditing

                ? <textarea
                    id="moreInfoEmailBodyContent"
                    className="moreInfoEmail__textarea"
                    value={moreInfoEmailContent}
                    onChange={(e) => setMoreInfoEmailContent(e.target.value)}
                  />
                : <div id="moreInfoEmailBodyContent" className="moreInfoEmail__body-content">
                    {moreInfoEmailContent.split("\n").filter(p => p.trim() !== "").map((paragraph, idx) => (
                      <p key={idx} className="moreInfoEmail__paragraph">{paragraph}</p>
                    ))}
                  </div>

              }

              <div className="moreInfoEmail__companyInfo">              

                <div className="moreInfoEmail__companyName">
                  {companyName}
                </div>

                <div className="moreInfoEmail__copyRight">
                  {copyRight}
                </div>
              </div>
 
            </div>

            <div className="moreInfoEmail__button-container">

              {isEditing

                ? (
                    <button 
                      className="moreInfoEmail__button"
                      onClick={handleSetIsEditingFalse}
                    >
                      Cancel
                    </button>
                  )
                : null
                
              }
            
              <button 
                className="moreInfoEmail__button"
                onClick={isEditing ? saveUpdatedMoreInfoEmail : handleSetIsEditingTrue}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

          </form>
          
        </div>
        
      </section>
    </>
  )};

export default MoreInfoEmail;