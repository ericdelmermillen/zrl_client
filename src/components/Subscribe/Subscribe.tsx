import { type FC, useState, useRef } from "react";
import { useAppContext } from "../../hooks/hooks";
import LabelledCheckbox from "../LabelledCheckbox/LabelledCheckbox";
import { isValidEmail } from "../../../utils/utils";
import toast from "react-hot-toast";
import "./Subscribe.scss";
// import IsLoading_6 from "../IsLoading_6/IsLoading_6";
// import IsLoading_7 from "../IsLoading_7/IsLoading_7";
// import IsLoading_9 from "../IsLoading_9/IsLoading_9";
// import IsLoading_10 from "../IsLoading_10/IsLoading_10";
import IsLoading_11 from "../IsLoading_11/IsLoading_11";

// need email validation handling including invalid stylings
// need api call logic

const Subscribe: FC = () => {
  const { handleSetModalType } = useAppContext();
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
    // setEmail("")
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
                  {/* <IsLoading_6 /> */}
                  {/* <IsLoading_7 /> */}
                  {/* <IsLoading_9 /> */}
                  {/* <IsLoading_10 /> */}
                  <IsLoading_11 />
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
                  spanLinkText={"privacy policy"}
                  onSpanLinkClick={(modalType) => handleSetModalType(modalType)}
                />
              
              </div>
            </div>
            
          </form>

        </div>
      </div>
      
    </>
  )};

export default Subscribe;