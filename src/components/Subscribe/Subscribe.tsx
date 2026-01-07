import { type FC, useState, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import LabelledCheckbox from "../LabelledCheckbox/LabelledCheckbox";
import { isValidEmail } from "../../../utils/utils";
import toast from "react-hot-toast";
import "./Subscribe.scss";

// need email validation handling including invalid stylings
// need api call logic
// agree to terms?

const Subscribe: FC = () => {
  const { handleSetModalType } = useAppContext();
  const [ initialFormCheck , setInitialFormCheck ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>("");
  const [ emailIsValid, setEmailIsValid ] = useState<boolean>(true);
  const [ agreeToPrivacy, setAgreeToPrivacy ] = useState<boolean>(true);

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
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, MIN_LOADING_INTERVAL);
      return;
    };

    // endpoint call if no errors

    // TODO: Add submission logic (e.g. API call or toast message)
    console.log("Subscription form submitted");
    setEmail("")
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

              <div className="subscribe__button-container">

                <button 
                  type="submit"
                  className="subscribe__submit"
                  onClick={handleSubmit}
                  disabled={!agreeToPrivacy}
                >
                  SUBMIT
                </button>

              </div>
            </div>

            <div className="subscribe__terms">

              <LabelledCheckbox 
                labelId={"subscribeFormTerms"}
                labelText={"privacy policy"}
                isChecked={agreeToPrivacy}
                setIsChecked={setAgreeToPrivacy}
                isValid={initialFormCheck}
                modalType={"privacy"}
                spanStub={"Agree to the "}
                spanLinkText={"privacy policy"}
                onSpanLinkClick={(modalType) => handleSetModalType(modalType)}
              />
              
            </div>
            
          </form>

        </div>
      </div>
      
    </>
  )};

export default Subscribe;