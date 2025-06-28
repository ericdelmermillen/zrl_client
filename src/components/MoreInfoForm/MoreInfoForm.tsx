import { 
  type FC,
  type ChangeEvent,
  useState, 
  useRef
} from 'react';
import { isValidEmail } from '../../../utils/utils';
// ***phone validation is crap: revise
import { isValidPhoneNumber } from "../../../utils/utils";
import toast from 'react-hot-toast';
import { useAppContext } from "../../contexts/AppContext";
import "./MoreInfoForm.scss";

// need to put the endpoint in env and import it
// need validation for phone number for as many possible countries/conventions possible


const MoreInfoForm: FC = () => {

  const { handleSetModalType } = useAppContext()

  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ phone, setPhone ] = useState<string>("");
  const [ agreeToTerms, setAgreeToTerms ] = useState<boolean>(true);

  // input validation state
  const [ initialFormCheck , setInitialFormCheck ] = useState<boolean>(false);
  
  const [ nameIsValid, setNameIsValid ] = useState<boolean>(true);
  const [ emailIsValid, setEmailIsValid ] = useState<boolean>(true);
  const [ phoneIsValid, setPhoneIsValid ] = useState<boolean>(true);


  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
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

const handleTermsChange = (e: ChangeEvent<HTMLInputElement>): boolean => {
  setAgreeToTerms(e.target.checked);

  // return phoneNumberIsValid;
  return true;
};

const handleAgreeToTerms = (): void => {
  handleSetModalType("privacy")
}


  // ***

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
      <section className="moreInfoForm__section">
            
        <form 
          className="moreInfoForm__form" 
          onSubmit={(e) => {e.preventDefault()}}
          name="moreInfoForm"
        >

          <div className="moreInfoForm__name">
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
                  }` }
              autoComplete="name"
              placeholder="Enter Name"
              value={name}
              ref={nameRef}
              onChange={handleNameChange}
            />

          </div>

          <div className="moreInfoForm__email">

            <label htmlFor="moreInfoFormEmail" className="moreInfoForm__label">
              Email
            </label>

            <input
              id="moreInfoFormEmail"
              type="email"
              name="email"
              className={`moreInfoForm__input moreInfoForm__input--email ${initialFormCheck && !emailIsValid ? "invalid" : ""}`}
              autoComplete="email"
              placeholder="Enter Email"
              value={email}
              ref={emailRef}
              onChange={handleEmailChange}
            />
          </div>

          <div className="moreInfoForm__phone">

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

          <div className="moreInfoForm__terms">

            <label htmlFor="moreInfoFormTerms" className="moreInfoForm__label">
              Terms
            </label>

            <input 
              id="moreInfoFormTerms"
              type="checkbox" 
              className={`moreInfoForm__input moreInfoForm__input--terms
                ${initialFormCheck && !agreeToTerms
                  ? "invalid" : ""
                }`} 
              checked={agreeToTerms}
              onChange={handleTermsChange}
            />
            <span className="moreInfoForm__termsText">
              Agree to the{" "}
              <span
                className="moreInfoTerms__privacy"
                onClick={handleAgreeToTerms}
              >
                privacy policy
              </span>
            </span>

          </div>
      
          <div className="moreInfoForm__submit">
            <label htmlFor="moreInfoFormTerms" className="moreInfoForm__label">
              Submit
            </label>
              
            <button 
              className={`moreInfoForm__submitButton ${!agreeToTerms ? "disabled" : ""}`}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

        </form>
      </section>

    </>
  )};

export default MoreInfoForm;