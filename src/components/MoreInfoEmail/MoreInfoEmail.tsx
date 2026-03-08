import React, { type FC, useState, useRef, useEffect } from "react";
import { useAppContext } from "../../hooks/hooks";
import { staggerToastsByInterval } from "../../../utils/utils";
import { toast } from "react-toastify";
import "./MoreInfoEmail.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

// component needs componentIsLoading to show loading in middle of text box
// finish email updating logic
// set up skeletons
// lock out cancel and save when user is submiting
// toasts need to be dismissable

const MoreInfoEmail:FC = () => {
  const { setAppIsLoading, handleSetShowAppIsLoadingFalse } = useAppContext();
  
  const [ subject, setSubject ] = useState<string>("");
  const [ greeting, setGreeting ] = useState<string>("");
  const [ emailContent, setEmailContent ] = useState<string>("");

  const [ companyName, setCompanyName ] = useState<string>("");
  const [ copyRight, setCopyRight ] = useState<string>("");
  const [ isEditing, setIsEditing ] = useState<boolean>(false);

  const [ initialFormCheck, setInitialFormCheck ] = useState<boolean>(false);

  const [ subjectIsValid, setSubjectIsValid ] = useState<boolean>(true);
  const [ greetingIsValid, setGreetingIsValid ] = useState<boolean>(true);
  const [ emailContentIsValid, setEmailContentIsValid ] = useState<boolean>(true);


  const subjectRef = useRef<HTMLInputElement | null>(null);
  const greetingRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);


  const handleSetIsEditingTrue = (): void => {
    setIsEditing(true);
    toast("More Info Email Template ready to edit.");
    
      setTimeout(() => {
        subjectRef.current?.focus();
        subjectRef.current?.setSelectionRange(0, 0);
    }, MIN_LOADING_INTERVAL);
  ;}


  const getMoreInfoEmail = async (): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/moreinfo`, {
        method: "GET",
        credentials: "include"
      });

      const { subject, greeting, body_content, companyName, copyRight } = await response.json();

      setSubject(subject);
      setGreeting(greeting);
      setEmailContent(body_content.replace(/\n/g, '\n\n')); // ← Add this
      setCompanyName(companyName)
      setCopyRight(copyRight)
      
    } catch (error) {
      console.error("Failed to fetch more info email:", error);
      toast.error("Failed to fetch More Info Email Template")
    };
  };

  const handleSubjectChange = (): boolean => {
    const subjectValue = subjectRef.current?.value ?? "";
    const isValidLength = subjectValue.trim().length >= 2;

    setSubject(subjectValue);
    setSubjectIsValid(isValidLength);

    return isValidLength;
  };

  const handleGreetingChange = (): boolean => {
    const greetingValue = greetingRef.current?.value ?? "";
    const isValidLength = greetingValue.trim().length >= 2;

    setGreeting(greetingValue);
    setGreetingIsValid(isValidLength);

    return isValidLength;
  };

  const handleContentChange = (): boolean => {
    const contentValue = contentRef.current?.value ?? "";
    const isValidLength = contentValue.trim().length >= 15;

    setEmailContent(contentValue);
    setEmailContentIsValid(isValidLength);

    return isValidLength;
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if(e.key === "Enter" && isEditing) {
      e.preventDefault();
      handleSubmit();
    };
  };

  const handleSubmit = async (): Promise<void> => {
    setAppIsLoading(true);
    setInitialFormCheck(true);
    
    let errors = 0;
    
    if(!handleSubjectChange()) {
      staggerToastsByInterval("Email subject is invalid", "error", errors);
      errors++;
    };
    
    if(!handleGreetingChange()) {
      staggerToastsByInterval("Email greeting is invalid", "error", errors);
      errors++;
    };
    
    if(!greeting.includes("<name>")) {
      staggerToastsByInterval("Greeting must include \"<name>\".", "error", errors);
      errors++;
    };

    if(!handleContentChange()) {
      staggerToastsByInterval("Email content is invalid", "error", errors);
      errors++;
    };
    

    if(errors) {
      setAppIsLoading(false);
      return;
    };

    try {
      const formattedContent = emailContent.replace(/\n\n/g, '\n');
      
      const response = await fetch(`${BASE_URL}/moreinfo/edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject,
          greeting,
          body_content: formattedContent
        })
      });

      const data = await response.json();

      if(!response.ok || !data.success) {
        toast.error(data.message || "Failed to update email template.");
        setAppIsLoading(false);
        return;
      };

      toast.success("Email template updated successfully");
      
      // Update state with returned values
      setSubject(data.subject);
      setGreeting(data.greeting);
      setEmailContent(data.body_content.replace(/\n/g, '\n\n'));
      setCompanyName(data.companyName);
      setCopyRight(data.copyRight);
      
      setIsEditing(false);
      setInitialFormCheck(false);
      
    } catch(error) {
      console.error("Failed to update email template:", error);
      toast.error("Server error while updating email template");
    };
    
    handleSetShowAppIsLoadingFalse();
  };

  const handleCancel = async (): Promise<void> => {
  setAppIsLoading(true);
  
  try {
    await getMoreInfoEmail();
    
    setIsEditing(false);
    setInitialFormCheck(false);
    
    // Reset validation states
    setSubjectIsValid(true);
    setGreetingIsValid(true);
    setEmailContentIsValid(true);
    toast("Editing cancelled...")
    
  } catch(error) {
    console.error("Failed to refresh email template:", error);
    toast.error("Failed to refresh email template");
  };
  
  handleSetShowAppIsLoadingFalse();
};


  // useEffect to call for initial MoreInfoEmail content
  useEffect(() => {
    getMoreInfoEmail();
  }, []);
  
  return (
    <>
      <section className={`moreInfoEmail ${isEditing ? "editable" : ""}`}>
        <div className="moreInfoEmail__inner">

          <h2 className="moreInfoEmail__heading">
            More Info Email
          </h2>

          <p className={"moreInfoEmail__admin-explainer"}>
            {isEditing ? "Editing mode enabled." : "Edit the form to update the More Info Template"}
          </p>

          <form
            name="moreInfoEmailForm"
            className="moreInfoEmail__form"
            onSubmit={(e) => e.preventDefault()}
            onKeyDown={(e) => handleEnterPress(e)}
          >
            <div className={`moreInfoEmail__text ${isEditing ? "editable" : ""}`}>

              <label 
                htmlFor="moreInfoEmailSubject" 
                className="moreInfoEmail__label"
              >
                Email Subject
              </label>

              {isEditing 

                ? <input
                    id="moreInfoEmailSubject"
                    className={`moreInfoEmail__subject ${isEditing && !initialFormCheck
                      ? "editable" 
                      : isEditing && !subjectIsValid
                      ? "editable invalid"
                      : "editable"
                    }`}
                    type="text"
                    placeholder="Enter subject for email"
                    ref={subjectRef}
                    value={subject}
                    onChange={handleSubjectChange}
                  />
                : <p className="moreInfoEmail__subject" id="moreInfoEmailSubject">
                    {subject}
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
                    className={`moreInfoEmail__greeting ${isEditing && !initialFormCheck
                      ? "editable" 
                      : isEditing && !greetingIsValid 
                      ? "editable invalid"
                      : "editable"
                    }`}
                    type="text"
                    placeholder="Enter greeting for email"
                    value={greeting}
                    ref={greetingRef}
                    onChange={handleGreetingChange}
                  />
                : <p 
                    id="moreInfoEmailGreeting"
                    className="moreInfoEmail__greeting" 
                    >
                      {greeting}
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
                    className={`moreInfoEmail__body-content ${isEditing && !initialFormCheck
                      ? "editable" 
                      : isEditing && !emailContentIsValid
                      ? "editable invalid"
                      : "editable"
                    }`}
                    value={emailContent}
                    ref={contentRef}
                    onChange={handleContentChange}
                  />
                : <div id="moreInfoEmailBodyContent" className="moreInfoEmail__body-content">
                    {emailContent.split("\n\n").filter(p => p.trim() !== "").map((paragraph, idx) => (
                      <p key={idx} className="moreInfoEmail__paragraph">{paragraph}</p>
                    ))}
                  </div>

              }

              <div className={`moreInfoEmail__companyInfo ${isEditing ? "editable" : ""}`}>

                <div className="moreInfoEmail__companyName">
                  {companyName}
                </div>

                <div className="moreInfoEmail__copyRight">
                  {copyRight}
                </div>
              </div>
 
            </div>

            <div className={`moreInfoEmail__button-container ${isEditing ? "editable" : ""}`}>

              {isEditing

                ? (
                    <button 
                      className="moreInfoEmail__button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )
                : null
                
              }
            
              <button 
                className="moreInfoEmail__button"
                onClick={isEditing ? handleSubmit : handleSetIsEditingTrue}
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