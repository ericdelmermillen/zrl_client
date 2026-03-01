import { type FC, useState, useEffect } from "react";
import { useAppContext } from "../../hooks/hooks";
import "./MoreInfoEmail.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MoreInfoEmail:FC = () => {
  const { setAppIsLoading, handleSetShowAppIsLoadingFalse } = useAppContext()
  const [ moreInfoEmailSubject, setMoreInfoEmailSubject ] = useState<string>("");
  const [ moreInfoEmailGreeting, setMoreInfoEmailGreeting ] = useState<string>("");
  const [ moreInfoEmailContent, setMoreInfoEmailContent ] = useState<string>("");
  const [ isEditing, setIsEditing ] = useState<boolean>(false);

  const handleSetIsEditingFalse = (): void => setIsEditing(false);
  const handleSetIsEditingTrue = (): void => setIsEditing(true);

  const saveUpdatedMoreInfoEmail = (): void => {
    setAppIsLoading(true);
    handleSetShowAppIsLoadingFalse();
  };


  const getMoreInfoEmail = async () => {
    try {
      const response = await fetch(`${BASE_URL}/moreinfo`, {
        method: "GET",
        credentials: "include"
      });

      const { subject, greeting, body_content } = await response.json();
      
      setMoreInfoEmailSubject(subject);
      setMoreInfoEmailGreeting(greeting);
      setMoreInfoEmailContent(body_content);
      
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
          <p className="moreInfoEmail__lead">
            To customize the email visitors receive from the "More Info" section, edit the content below.
          </p>

          
            
          <div className="moreInfoEmail__content">

            {/* email subject */}
            <label htmlFor="moreInfoEmailSubject" className="moreInfoEmail__label">Email Subject</label>
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

            {/* email greeting */}
            <label htmlFor="moreInfoEmailGreeting" className="moreInfoEmail__label">
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

            {/* body content */}
            <label htmlFor="moreInfoEmailBodyContent" className="moreInfoEmail__label">
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
                  {moreInfoEmailContent.split("\\n").filter(p => p.trim() !== "").map((paragraph, idx) => (
                    <p key={idx} className="moreInfoEmail__paragraph">{paragraph}</p>
                  ))}
                </div>
            }

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
              onClick={isEditing 
                ? saveUpdatedMoreInfoEmail
                : handleSetIsEditingTrue
              }
            >
              {isEditing ? "Save" : "Edit"}
            </button>

            </div>

          </div>
          
        </div>
        
      </section>
    </>
  )};

export default MoreInfoEmail;