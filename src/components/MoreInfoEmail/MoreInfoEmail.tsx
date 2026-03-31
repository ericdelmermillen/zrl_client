import React, { type FC, useState, useRef, useEffect } from "react";
import type { ModalInput } from "@/typing/types/types";
import { useAppContext, useModalContext } from "../../hooks/hooks";
import { 
  focusInputStart, 
  handleFormEnterPress, 
  staggerToastsByN, 
  parseParagraphLink, 
  isValidEmail
} from "../../../utils/utils";
import { toast } from "react-toastify";
import "./MoreInfoEmail.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;



// finish email updating logic
// set up skeletons
// adjust responsive styling
// add Send Test Email --> opens Modal (requires name, email address: can use /send with param or query string to send variation with TEST MESSAGE before subject)

const MoreInfoEmail:FC = () => {
  const { 
    appIsLoading, 
    setAppIsLoading, 
    handleSetShowAppIsLoadingFalse,
  } = useAppContext();
  
  const { 
    setModalConfirmCallback,
    handleClearModal,
    handleOpenModal
  } = useModalContext();
  
  const [ subject, setSubject ] = useState<string>("");
  const [ greeting, setGreeting ] = useState<string>("");
  const [ content, setContent ] = useState<string>("");

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

  const testNameRef = useRef<HTMLInputElement | null>(null);
  const testEmailRef = useRef<HTMLInputElement | null>(null);
  const testPhoneRef = useRef<HTMLInputElement | null>(null);

  const modalInputs: ModalInput[] = [
    { 
      id: "name", 
      label: "Name", 
      placeholder: "Enter Name", 
      value: "",
      isValid: true,
      ref: testNameRef,
      onChange: (value: string) => value.trim().length > 2
    },
    { 
      id: "email", 
      label: "Email", 
      placeholder: "Enter Email", 
      value: "",
      isValid: true,
      ref: testEmailRef,
      onChange: isValidEmail
    },
    { 
      id: "phone", 
      label: "Phone", 
      placeholder: "Enter Phone Number", 
      value: "",
      isValid: true,
      ref: testPhoneRef,
      onChange: (value: string) => /^[\d\s\-\+\(\)]{7,}$/.test(value)
    }
  ];


  const handleSetIsEditingTrue = (): void => {
    if (window.getSelection()?.toString()) {
      return;
    };

    setAppIsLoading(true);
    
    setTimeout(() => {
      handleSetShowAppIsLoadingFalse();
      
      setTimeout(() => {
        setIsEditing(true);
        toast.info("More Info Email Template ready to edit.");

        setTimeout(() => {
          focusInputStart(subjectRef);
        }, 0);

      }, MIN_LOADING_INTERVAL * 2);
    }, MIN_LOADING_INTERVAL);
  };


  const getMoreInfoEmail = async (): Promise<void> => {
    setAppIsLoading(true);
    
    try {
      const response = await fetch(`${BASE_URL}/moreinfo`, {
        method: "GET",
        credentials: "include"
      });

      const { subject, greeting, body_content, companyName, copyRight } = await response.json();

      setSubject(subject);
      setGreeting(greeting);
      setContent(body_content.replace(/\n/g, '\n\n'));
      setCompanyName(companyName);
      setCopyRight(copyRight);
      
    } catch (error) {
      console.error("Failed to fetch more info email:", error);
      toast.error("Failed to fetch More Info Email Template");
    } finally {
      handleSetShowAppIsLoadingFalse();
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
    const includesName = greetingValue.includes("<name>");
    const isValid = isValidLength && includesName;

    setGreeting(greetingValue);
    setGreetingIsValid(isValid);
    return isValid;
  };

  const handleContentChange = (): boolean => {
    const contentValue = contentRef.current?.value ?? "";
    const isValidLength = contentValue.trim().length >= 15;

    setContent(contentValue);
    setEmailContentIsValid(isValidLength);
    return isValidLength;
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    handleFormEnterPress(e, isEditing, handleSubmit)
  };

  const handleReceiveTestEmail = ():void => {
    if (!inputsAreValid()) {
      toast.error("Please fix the errors before proceeding to test the email.")
      return;
    };

    setModalConfirmCallback(() => sendTestEmail);
    const modalTitle = "Preview Email";
    const modalText = "Enter a name, email and optional phone number to receive a test version of the email template you are editing.";
    handleOpenModal("sendTest", modalTitle, modalText, modalInputs);
  };

  const sendTestEmail = async () => {
    setAppIsLoading(true);
    let success = false;

    try {
      const response = await fetch(`${BASE_URL}/moreinfo/sendtest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: "GenericEric",
          email: "ericdelmermillen@gmail.com",
          subject: subject,
          greeting: greeting,
          body_content: content
        })
      });

      const data = await response.json();
      success = true;

      console.log(data);

    } catch (error) {
      console.error("Failed to send test email:", error);
    } finally {

      if(success) {
        staggerToastsByN("Test email successfully sent to ___", "success", 0)
        staggerToastsByN("Don't forget to hit save if you like how it looks.", "success", 1);
        setTimeout(() => {
          handleClearModal();
        // }, MIN_LOADING_INTERVAL);
        }, 100000);
      };
      // setTimeout(() => {
      //   setAppIsLoading(false);
      // }, 1000)
    };
  };

  const inputsAreValid = (): boolean => {
    setInitialFormCheck(true);
    
    let errors = 0;
    
    if(!handleSubjectChange()) {
      staggerToastsByN("Email subject is invalid", "error", errors);
      errors++;
    };
    
    if(!handleGreetingChange()) {
      staggerToastsByN("Email greeting is invalid", "error", errors);
      errors++;
    };
    
    if(!greeting.includes("<name>")) {
      staggerToastsByN("Greeting must include <name>.", "error", errors);
      errors++;
    };

    if(!handleContentChange()) {
      staggerToastsByN("Email content is invalid", "error", errors);
      errors++;
    };
    
    return errors < 1;
  }

  const handleSubmit = async (): Promise<void> => {
    setAppIsLoading(true);

    if (!inputsAreValid()){
      setAppIsLoading(false);
      return;
    };

    try {
      const formattedContent = content.replace(/\n\n/g, '\n');
      
      const response = await fetch(`${BASE_URL}/moreinfo/edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject: subject,
          greeting: greeting,
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
      
      setSubject(data.subject);
      setGreeting(data.greeting);
      setContent(data.body_content.replace(/\n/g, '\n\n'));
      setCompanyName(data.companyName);
      setCopyRight(data.copyRight);
      
      setIsEditing(false);
      setInitialFormCheck(false);
    } catch(error) {
      console.error("Failed to update email template:", error);
      toast.error("Server error while updating email template");
    } finally {
      handleSetShowAppIsLoadingFalse();
    };
  };

  const handleCancel = async (): Promise<void> => {
    setAppIsLoading(true);
  
    try {
      await getMoreInfoEmail();
      
      setInitialFormCheck(false);
      setSubjectIsValid(true);
      setGreetingIsValid(true);
      setEmailContentIsValid(true);
      
      setTimeout(() => {
        setIsEditing(false);
        toast.info("Editing cancelled...")
      }, MIN_LOADING_INTERVAL * 2);
      
    } catch(error) {
      console.error("Failed to refresh email template:", error);
      toast.error("Failed to refresh email template");
    } finally {
      handleSetShowAppIsLoadingFalse();
    };
  };

  // useEffect to call for initial MoreInfo email templat content
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
            {isEditing ? "Editing mode enabled." : "Edit below to update."}
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
                : <p 
                    className="moreInfoEmail__subject" 
                    id="moreInfoEmailSubject"
                    onMouseUp={handleSetIsEditingTrue}
                  >
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
                    onMouseUp={handleSetIsEditingTrue}
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
                    value={content}
                    ref={contentRef}
                    onChange={handleContentChange}
                  />
                : <div 
                    id="moreInfoEmailBodyContent" 
                    className="moreInfoEmail__body-content"
                    onMouseUp={handleSetIsEditingTrue}
                  >
                    {content.split("\n\n").filter(p => p.trim() !== "").map((paragraph, idx) => (
                      <p key={idx} className="moreInfoEmail__paragraph">
                        {parseParagraphLink(paragraph)}
                      </p>
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

              {isEditing
                ? (
                    <p 
                      className="moreInfoEmail__link-button"
                      onClick={handleReceiveTestEmail}
                    >
                      Recieve Test Email
                    </p>
                  )
                : ""
              }

            <div className={`moreInfoEmail__button-container ${isEditing ? "editable" : ""}`}>

              {isEditing

                ? (
                    <button 
                      className={`moreInfoEmail__button ${appIsLoading ? "disabled" : ""}`}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )
                : null
                
              }
            
              <button 
                className={`moreInfoEmail__button ${appIsLoading ? "disabled" : ""}`}
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
