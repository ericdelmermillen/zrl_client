import { type FC, useState, useRef } from 'react';
import { useAppContext } from "../../contexts/AppContext";
import { isValidEmail } from '../../../utils/utils';
// ***phone validation is crap: revise
import { isValidPhoneNumber } from "../../../utils/utils";
import LabelledCheckbox from '../LabelledCheckbox/LabelledCheckbox';
import toast from 'react-hot-toast';
import "./MoreInfoForm.scss";

// need to put the endpoint in env and import it
// need validation for phone number for as many possible countries/conventions possible


const MoreInfoForm: FC = () => {
  const { handleSetModalType } = useAppContext();

  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ phone, setPhone ] = useState<string>("");
  const [ agreeToTerms, setAgreeToTerms ] = useState<boolean>(true);

  // input validation state
  const [ initialFormCheck , setInitialFormCheck ] = useState<boolean>(false);
  
  const [ nameIsValid, setNameIsValid ] = useState<boolean>(true);
  const [ emailIsValid, setEmailIsValid ] = useState<boolean>(true);
  const [ phoneIsValid, setPhoneIsValid ] = useState<boolean>(true);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

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
    // setIsLoading(true);
    
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
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, MIN_LOADING_INTERVAL);
      return;
    };

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

          <LabelledCheckbox 
            labelId={"moreInfoFormTerms"}
            labelText={"Terms"}
            isChecked={agreeToTerms}
            setIsChecked={setAgreeToTerms}
            isValid={initialFormCheck}
            modalType={"privacy"}
            spanStub={"Agree to the "}
            spanLinkText={"privacy policy"}
            onSpanLinkClick={(modalType) => handleSetModalType(modalType)}
          />
      
          <div className="moreInfoForm__submit">
            <label htmlFor="moreInfoFormTerms" className="moreInfoForm__label">
              Submit
            </label>
              
            <button 
              className={`moreInfoForm__submitButton ${!agreeToTerms ? "disabled" : ""}`}
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