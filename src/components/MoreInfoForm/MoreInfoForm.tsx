import { type FC, useState, useRef } from "react";
import { useAppContext } from "../../hooks/hooks";
import { isValidEmail } from "../../../utils/utils";
// ***phone validation is crap: revise
import { isValidPhoneNumber } from "../../../utils/utils";
// import IsLoading_6 from "../IsLoading_6/IsLoading_6";
// import IsLoading_7 from "../IsLoading_7/IsLoading_7";
// import IsLoading_10 from "../IsLoading_10/IsLoading_10";
import IsLoading_11 from "../IsLoading_11/IsLoading_11";
import LabelledCheckbox from "../LabelledCheckbox/LabelledCheckbox";
import toast from "react-hot-toast";
import "./MoreInfoForm.scss";

// need to put the endpoint in env and import it
// need validation for phone number for as many possible countries/conventions possible

// *** need validation state checking when user selects from auto fill
// *** add secont tickbox for subscribe to newsletter: can submit with subscribe false but not with Agree to terms false
// *** allow all submits to trigger new welcome email even if email is in database?
// *** if user also subscribes here but email is already in database should I just ignore it here but notify that email is already in database in subscribe?

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const MoreInfoForm: FC = () => {
  const { handleSetModalType } = useAppContext();

  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ phone, setPhone ] = useState<string>("");
  const [ agreeToNewsletter, setAgreeToNewsletter ] = useState<boolean>(true);
  const [ agreeToTerms, setAgreeToTerms ] = useState<boolean>(true);

  // input validation state
  const [ initialFormCheck , setInitialFormCheck ] = useState<boolean>(false);
  
  const [ nameIsValid, setNameIsValid ] = useState<boolean>(true);
  const [ emailIsValid, setEmailIsValid ] = useState<boolean>(true);
  const [ phoneIsValid, setPhoneIsValid ] = useState<boolean>(true);

  const [ componentIsLoading, setComponentIsLoading ] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  // const checkItems = [

  // ]

  const handleNameChange = () => {
    const nameValue = nameRef.current?.value ?? "";
    const isValidLength = nameValue.trim().length >= 2;
  
    setName(nameValue);
    setNameIsValid(isValidLength);
  
    return isValidLength;
  };

  const handleEmailChange = (): boolean => {
    const emailValue = emailRef.current?.value ?? "";
    const emailIsValid = isValidEmail(emailValue);

    setEmail(emailValue);
    setEmailIsValid(emailIsValid);

    return emailIsValid;
  };

  const handlePhoneChange = (): boolean => {
    const phoneValue = phoneRef.current?.value ?? "";
    const phoneNumberIsValid = isValidPhoneNumber(phoneValue);

    setPhone(phoneValue);
    setPhoneIsValid(phoneNumberIsValid);

    return phoneNumberIsValid;
  };


  const handleSubmit = (): void => {
    setInitialFormCheck(true);
    console.log("submitting")
    
    let errors = 0;

    if(!handleEmailChange()) {
      toast.error("Email is invalid");
      errors++;
    };

    if(!handleNameChange()) {
      toast.error("Name is invalid");
      errors++;
    };

    // need to get phone number with any non-numeric characters stripped when it is time to post
    if(!handlePhoneChange()) {
      toast.error("Phone is invalid");
      errors++;
    };
    
    if(!agreeToTerms) {
      toast.error("Please agree to the Privacy Policy");
      errors++;
    };

    if(errors) {
      return;
    };

    setComponentIsLoading(true);

    // success UI (email not in database)
    setTimeout(() => {
      toast.success("Thanks for reaching out. Check your Inbox for more info.");
      
      if(agreeToNewsletter) {
        setTimeout(() => {

          toast.success("Successfully subscribed to our Newsletter.");
        }, MIN_LOADING_INTERVAL * 2)
      };

      setName("")
      setEmail("")
      setPhone("")
      setInitialFormCheck(false);
      setNameIsValid(true);
      setEmailIsValid(true);
      setPhoneIsValid(true);
      setAgreeToNewsletter(true);
      setAgreeToTerms(true);
      emailRef.current?.blur();
      nameRef.current?.blur();
      phoneRef.current?.blur();

      setComponentIsLoading(false);
    }, 1500);
    
    // failure UI (email already in database)
    // setTimeout(() => {
    //   setComponentIsLoading(false);
    //   toast.error("That email is already in our database.");
    // }, 2000);

    // endpoint call if no errors
  };


  return (
    <>
      <article className="moreInfoForm__section">
          
        <form 
          className="moreInfoForm__form" 
          name="moreInfoForm"
          onSubmit={(e) => {e.preventDefault()}}
        >
          <div className="moreInfoForm__fields">

            <div className={`moreInfoForm__isLoading ${componentIsLoading ? "show": ""}`}>
              {/* <IsLoading_6 /> */}
              {/* <IsLoading_7 /> */}
              {/* <IsLoading_10 /> */}
              <IsLoading_11 />
            </div>

            <div className="moreInfoForm__field moreInfoForm__field--name">
              <label htmlFor="moreInfoFormName" className="moreInfoForm__label">
                Name
              </label>

              <input 
                id="moreInfoFormName"
                type="text" 
                className={
                  `moreInfoForm__input moreInfoForm__input--name
                    ${initialFormCheck && !nameIsValid
                        ? "invalid" : ""
                    }`}
                autoComplete="name"
                placeholder="Enter Name"
                value={name}
                ref={nameRef}
                onChange={handleNameChange}
              />

            </div>

            <div className="moreInfoForm__field moreInfoForm__field--email">

              <label htmlFor="moreInfoFormEmail" className="moreInfoForm__label">
                Email
              </label>

              <input
                id="moreInfoFormEmail"
                className={`moreInfoForm__input moreInfoForm__input--email ${initialFormCheck && !emailIsValid ? "invalid" : ""}`}
                name="email"
                autoComplete="email"
                placeholder="Enter Email"
                value={email}
                ref={emailRef}
                onChange={handleEmailChange}
                onBlur={handleEmailChange}
              />
            </div>

            <div className="moreInfoForm__field moreInfoForm__field--phone">

              <label htmlFor="moreInfoFormPhone" className="moreInfoForm__label">
                Phone
              </label>

              <input 
                id="moreInfoFormPhone"
                type="tel" 
                className={
                  `moreInfoForm__input moreInfoForm__input--phone
                    ${initialFormCheck && !phoneIsValid
                        ? "invalid" : ""}  
                `} 
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Enter Phone"
                value={phone}
                ref={phoneRef}
                onChange={handlePhoneChange}
              />
            
            </div>
          </div>
          <div className="moreInfoForm__checkboxes">

            <div className="moreInfoForm__checkboxes-inner">
              
              <LabelledCheckbox 
                labelId={"moreInfoFormNewsletter"}
                labelText={"Newsletter"}
                isChecked={agreeToNewsletter}
                setIsChecked={setAgreeToNewsletter}
                isValid={true}
                modalType={"newsletter"}
                spanStub={"Subscribe to our "}
                spanLinkText={"Newsletter"}
                onSpanLinkClick={(modalType) => handleSetModalType(modalType)}
              />

              <LabelledCheckbox 
                labelId={"moreInfoFormTerms"}
                labelText={"Terms"}
                isChecked={agreeToTerms}
                setIsChecked={setAgreeToTerms}
                isValid={true}
                modalType={"privacy"}
                spanStub={"Agree to our "}
                spanLinkText={"Privacy Policy"}
                onSpanLinkClick={(modalType) => handleSetModalType(modalType)}
              />
            </div>
          </div>
      
          <div className="moreInfoForm__submit">
            <label htmlFor="moreInfoFormTerms" className="moreInfoForm__label">
              Submit
            </label>
              
            <button 
              className={`moreInfoForm__submitButton ${!agreeToTerms || componentIsLoading ? "disabled" : ""}`}
              type="submit"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>

        </form>
      </article>

    </>
  )};

export default MoreInfoForm;