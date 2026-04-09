import { type FC, type RefObject, useState, useRef, useEffect } from "react";
import type { ModalInput } from "@/typing/types/types";
import { useAppContext, useModalContext } from "../../hooks/hooks";
import { 
  focusInputStart, 
  handleFormEnterPress, 
  staggerToastsByN, 
  parseParagraphLink, 
  addClassToDiv,
  removeClassFromDiv,
  isValidEmail
} from "../../../utils/utils";
import { toast } from "react-toastify";
import "./MoreInfoEmail.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const MoreInfoEmail:FC = () => {
  const { 
    appIsLoading, 
    setAppIsLoading, 
    handleSetShowIsLoadingTrue,
    // 
    handleSetShowAppIsLoadingFalse,
  } = useAppContext();
  
  const { 
    setModalConfirmCallback,
    handleClearModal,
    handleOpenModal,
    setModalInitialFormCheck
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
  const modalFormInitialCheckRef = useRef<boolean>(false);

  const modalInputs: ModalInput[] = [
    { 
      id: "nameTestModal", 
      label: "Name", 
      placeholder: "Enter Name", 
      ref: testNameRef,
      onChange: () => handleTestNameChange()
    },
    { 
      id: "emailTestModal", 
      label: "Email", 
      placeholder: "Enter Email", 
      ref: testEmailRef,
      onChange: () => handleTestEmailChange()
    }
  ];

  const handleTestNameChange = (): boolean => {
    const nameValue = testNameRef.current?.value ?? "";
    const isValidLength = nameValue.trim().length >= 2;

    if (modalFormInitialCheckRef.current) {
      if (!isValidLength) {
        addClassToDiv("nameTestModal", "invalid");
      } else {
        removeClassFromDiv("nameTestModal", "invalid");
      };
    };

    return isValidLength;
  };

 const handleTestEmailChange = (): boolean => {
  const emailValue = testEmailRef.current?.value ?? "";
  const emailIsValid = isValidEmail(emailValue);

    if (modalFormInitialCheckRef.current) {
      if (!emailIsValid) {
        addClassToDiv("emailTestModal", "invalid");
      } else {
        removeClassFromDiv("emailTestModal", "invalid");
      };
    };

    return emailIsValid;
  };

const handleSetIsEditingTrue = (
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement | null>
): void => {

  handleSetShowIsLoadingTrue(setAppIsLoading, "appIsLoading");
  
  setTimeout(() => {
    
    setTimeout(() => {
      setIsEditing(true);
      toast.info("More Info Email Template ready to edit.");
      
      setTimeout(() => {
        focusInputStart(ref);
      }, 0);
      
      handleSetShowAppIsLoadingFalse();
    }, MIN_LOADING_INTERVAL);
  }, MIN_LOADING_INTERVAL);
};

  const getMoreInfoEmail = async (): Promise<void> => {
    if (!appIsLoading) {
      handleSetShowIsLoadingTrue(setAppIsLoading, "appIsLoading");
    };
    
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
    setInitialFormCheck(true);
    
    let errors = 0;
    
    if (!handleSubjectChange()) {
      staggerToastsByN("Email subject is invalid", "error", errors);
      errors++;
    };
    
    if (!handleGreetingChange()) {
      staggerToastsByN("Email greeting is invalid", "error", errors);
      errors++;
    };
    
    if (!greeting.includes("<name>")) {
      staggerToastsByN("Greeting must include <name>.", "error", errors);
      errors++;
    };

    if (!handleContentChange()) {
      staggerToastsByN("Email content is invalid", "error", errors);
      errors++;
    };

    if (errors) {
      toast.error("Please fix the errors before proceeding to test the email.")
      return;
    };

    setModalConfirmCallback(() => sendTestEmail);
    const modalTitle = "Preview Email";
    const modalText = "Enter a name, email and optional phone number to receive a test version of the email template you are editing.";
    handleOpenModal("sendTest", modalTitle, modalText, modalInputs);
  };

  const sendTestEmail = async () => {
    setModalInitialFormCheck(true);

    let errors = 0;
    
    if (!handleTestNameChange()){
      staggerToastsByN("Name for Test Email is invalid.", "error", errors);
      errors++;
    };

    if (!handleTestEmailChange()) {
      staggerToastsByN("Email for Test Email is invalid.", "error", errors);
      errors++;
    };
  
    if (errors) {
      return;
    };

    let success = false;

    try {
      const response = await fetch(`${BASE_URL}/moreinfo/sendtest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: testNameRef.current?.value,
          email: testEmailRef.current?.value,
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
      if (success) {
        staggerToastsByN("Test email successfully sent to ___", "success", 0)
        staggerToastsByN("Don't forget to hit save if you like how it looks.", "success", 1);
        setTimeout(() => {
          handleClearModal();
        }, 100000);
      };
    };
  };

  const handleSubmit = async (): Promise<void> => {
    handleSetShowIsLoadingTrue(setAppIsLoading, "appIsLoading");
    setInitialFormCheck(true);
    
    let errors = 0;
    
    if (!handleSubjectChange()) {
      staggerToastsByN("Email subject is invalid", "error", errors);
      errors++;
    };
    
    if (!handleGreetingChange()) {
      staggerToastsByN("Email greeting is invalid", "error", errors);
      errors++;
    };
    
    if (!greeting.includes("<name>")) {
      staggerToastsByN("Greeting must include <name>.", "error", errors);
      errors++;
    };

    if (!handleContentChange()) {
      staggerToastsByN("Email content is invalid", "error", errors);
      errors++;
    };

    if (errors){
      handleSetShowAppIsLoadingFalse();
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

      if (!response.ok || !data.success) {
        toast.error(data.message || "Failed to update email template.");
        // handleSetShowAppIsLoadingFalse();
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
      // handleSetShowAppIsLoadingFalse();
    };
  };

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
                    className={`moreInfoEmail__link-button ${
                      !subjectIsValid || !greetingIsValid || !emailContentIsValid
                        ? "disabled" 
                        : ""
                    }`}
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
                onClick={isEditing 
                  ? handleSubmit 
                  : () => handleSetIsEditingTrue(subjectRef)}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

          </form>
          
        </div>
        
      </section>
    </>
  );
};

export default MoreInfoEmail;