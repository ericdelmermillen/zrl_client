import { type FC, useState, useRef } from "react";
import { useModalContext } from "../../hooks/hooks";
import LabelledCheckbox from "../LabelledCheckbox/LabelledCheckbox";
import { isValidEmail } from "../../../utils/utils";
import { PRIVACY_POLICY_TEXT, PRIVACY_POLICY_TITLE } from "../../textCopy/textCopy";
import { toast } from "react-toastify";
import "./Subscribe.scss";
import IsLoading from "../IsLoading/IsLoading";

// need email validation handling including invalid stylings
// need api call logic

const Subscribe: FC = () => {
  const { handleOpenModal } = useModalContext();
  const [ initialFormCheck , setInitialFormCheck ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>("");
  const [ emailIsValid, setEmailIsValid ] = useState<boolean>(true);
  const [ agreeToPrivacy, setAgreeToPrivacy ] = useState<boolean>(true);
  const [ componentIsLoading, setComponentIsLoading ] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleEmailChange = (): boolean => {
    const emailValue = emailRef.current?.value ?? "";
    const emailIsValid = isValidEmail(emailValue);

    setEmail(emailValue);
    setEmailIsValid(emailIsValid);

    return emailIsValid;
  };

  const handleSubmit = () => {
    setInitialFormCheck(true);

    let errors = 0;

    if(!handleEmailChange()) {
      toast.error("Email is invalid");
      errors++;
    };

    if(errors) {
      return;
    };

    setComponentIsLoading(true);

    setTimeout(() => {
      setComponentIsLoading(false);
      toast.success("Successfully subscribed to our Newsletter.");
      setEmail("");
      setEmailIsValid(true);
      setInitialFormCheck(false);
      setAgreeToPrivacy(true);
      emailRef.current?.blur();
    }, 1500);

    
    // endpoint call if no errors
    
    // TODO: Add submission logic (e.g. API call or toast message)
  };
  
  const handleOpenPrivacyModal = () => {
    handleOpenModal("privacy", PRIVACY_POLICY_TITLE, PRIVACY_POLICY_TEXT);
  };

  return (
    <>
      <div className="subscribe">
        <div className="subscribe__inner">

          <h2 className="subscribe__heading">
            Subscribe & Follow
          </h2>
          <p className="subscribe__lead">
            Stay updated with our latest news and announcements. Subscribe to our newsletter and follow us on social media for valuable insights and exciting updates.
          </p>

          <form className="subscribe__form" onSubmit={(e) => {e.preventDefault()}}>
            <div className="subscribe__form-field">

              <label htmlFor="subscribe" className="subscribe__label">Subscribe</label>

              <div className="subscribe__input-wrapper">

                <div className={`subscribe__isLoading ${componentIsLoading ? "show" : ""}`}>
                  <IsLoading />
                </div>

                <input
                  id="subscribe"
                  className={`subscribe__input ${initialFormCheck && !emailIsValid ? "invalid" : ""}`}
                  name="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  value={email}
                  ref={emailRef}
                  onChange={handleEmailChange}
                />
                
                </div>
              <div className="subscribe__button-container">

                <button 
                  type="submit"
                  className={`subscribe__submit ${!agreeToPrivacy || componentIsLoading ? "disabled" : ""}`}
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button>

              </div>
            </div>

            <div className="subscribe__terms">
              <div className="subscribe__terms-checkbox">

                <LabelledCheckbox 
                  labelId={"subscribeFormTerms"}
                  labelText={"privacy policy"}
                  isChecked={agreeToPrivacy}
                  setIsChecked={setAgreeToPrivacy}
                  isValid={true}
                  modalType={"privacy"}
                  spanStub={"Agree to the "}
                  spanLinkText={"Privacy Policy"}
                  onSpanLinkClick={handleOpenPrivacyModal}
                />
              
              </div>
            </div>
            
          </form>

        </div>
      </div>
      
    </>
  )};

export default Subscribe;