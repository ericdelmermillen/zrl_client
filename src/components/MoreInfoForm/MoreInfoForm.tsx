import { type FC, useState, useRef } from "react";
import { useModalContext } from "../../hooks/hooks";
import { isValidEmail, staggerToastsByN, validatePhoneNumber } from "../../../utils/utils";
import type { CheckboxItem, ModalType } from "../../typing/types/types";
import { toast } from "react-toastify";
import { 
  PRIVACY_POLICY_TITLE, 
  PRIVACY_POLICY_TEXT, 
  NEWSLETTER_POLICY_TITLE, 
  NEWSLETTER_POLICY_TEXT 
} from "../../textCopy/textCopy";
import IsLoading from "../IsLoading/IsLoading";
import LabelledCheckbox from "../LabelledCheckbox/LabelledCheckbox";
import "./MoreInfoForm.scss";


// *** need validation state checking when user selects from auto fill
// *** if user also subscribes here but email is already in database should I just ignore it here but notify that email is already in database in subscribe?

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MoreInfoForm: FC = () => {
  const { handleOpenModal } = useModalContext();

  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ phone, setPhone ] = useState<string>("");
  const [ agreeToNewsletter, setAgreeToNewsletter ] = useState<boolean>(true);
  const [ agreeToTerms, setAgreeToTerms ] = useState<boolean>(true);

  const [ initialFormCheck , setInitialFormCheck ] = useState<boolean>(false);

  const [ nameIsValid, setNameIsValid ] = useState<boolean>(true);
  const [ emailIsValid, setEmailIsValid ] = useState<boolean>(true);
  const [ phoneIsValid, setPhoneIsValid ] = useState<boolean>(true);

  const [ componentIsLoading, setComponentIsLoading ] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);


  const checkboxItems: CheckboxItem[] = [
    {
      key: "agreeToNewsletter",
      labelId: "moreInfoFormNewsletter",
      labelText: "Newsletter",
      modalType: "newsletter",
      spanStub: "Subscribe to our ",
      spanLinkText: "Newsletter",
      isChecked: agreeToNewsletter,
      setIsChecked: setAgreeToNewsletter,
      isValid: true,
    },
    {
      key: "agreeToTerms",
      labelId: "moreInfoFormTerms",
      labelText: "Terms",
      modalType: "privacy",
      spanStub: "Agree to our ",
      spanLinkText: "Privacy Policy",
      isChecked: agreeToTerms,
      setIsChecked: setAgreeToTerms,
      isValid: true,
    },
  ];

  const handleNameChange = (): boolean => {
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
    const phoneNumberIsValid = validatePhoneNumber(phoneValue);

    setPhone(phoneValue);
    setPhoneIsValid(phoneNumberIsValid);

    return phoneNumberIsValid;
  };

  

  const handleSubmit = async (): Promise<void> => {
    setInitialFormCheck(true);
    
    let errors = 0;

    if(!handleEmailChange()) {
      staggerToastsByN("Email is invalid", "error", errors);
      errors++;
    };
    
    if(!handleNameChange()) {
      staggerToastsByN("Name is invalid", "error", errors);
      errors++;
    };
    
    if(phone.length && !handlePhoneChange()) {
      staggerToastsByN("Phone is invalid", "error", errors);
      errors++;
    };
    
    if(!agreeToTerms) {
      staggerToastsByN("Please agree to the Privacy Policy", "error", errors);
      errors++;
    };

    if(errors) {
      return;
    };

    setComponentIsLoading(true);

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    try {
      const response = await fetch(`${BASE_URL}/moreinfo/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          timezone,
          hasSubscribed: agreeToNewsletter
        })
      });

      if(!response.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      };

      toast.success("Thanks for reaching out. Check your Inbox for more info.");

      const { hasSubscribed } = await response.json();

      if(hasSubscribed) {
        staggerToastsByN("Successfully subscribed to our Newsletter.", "success", 2);
      };

      setName("");
      setEmail("");
      setPhone("");
      setInitialFormCheck(false);
      setNameIsValid(true);
      setEmailIsValid(true);
      setPhoneIsValid(true);
      setAgreeToNewsletter(true);
      setAgreeToTerms(true);
      emailRef.current?.blur();
      nameRef.current?.blur();
      phoneRef.current?.blur();

    } catch(error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setComponentIsLoading(false);
    };
  };

  const handleSetModalData = (modalType: ModalType) => {
    if(modalType === "newsletter") {
      handleOpenModal(modalType, NEWSLETTER_POLICY_TITLE, NEWSLETTER_POLICY_TEXT);
    };
    
    if(modalType === "privacy") {
      handleOpenModal(modalType, PRIVACY_POLICY_TITLE, PRIVACY_POLICY_TEXT);
    };
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
              <IsLoading />
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
                    ${initialFormCheck && !phoneIsValid && phone
                        ? "invalid" : ""}  
                `} 
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Enter Phone (Optional)"
                value={phone}
                ref={phoneRef}
                onChange={handlePhoneChange}
              />
            
            </div>
          </div>
          <div className="moreInfoForm__checkboxes">

            <div className="moreInfoForm__checkboxes-inner">

              {checkboxItems.map((item) => (
                <LabelledCheckbox
                  key={item.key}
                  labelId={item.labelId}
                  labelText={item.labelText}
                  isChecked={item.isChecked}
                  setIsChecked={item.setIsChecked}
                  isValid={item.isValid}
                  modalType={item.modalType}
                  spanStub={item.spanStub}
                  spanLinkText={item.spanLinkText}
                  onSpanLinkClick={(modalType) => handleSetModalData(modalType)}
                />
              ))}
              
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