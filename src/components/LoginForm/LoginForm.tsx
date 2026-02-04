import { type FC, type FormEvent, type ChangeEvent, useState, useRef, useEffect } from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { useAppContext } from "../../hooks/hooks";
import { isValidEmail, isValidPassword } from "../../../utils/utils";
import { toast } from "react-hot-toast";
// import IsLoading_6 from "../IsLoading_6/IsLoading_6";
// import IsLoading_7 from "../IsLoading_7/IsLoading_7";
// import IsLoading_10 from "../IsLoading_10/IsLoading_10";
import IsLoading_11 from "../IsLoading_11/IsLoading_11";
import ShowHidePassword from "../ShowHidePassword/ShowHidePassword";
import "./LoginForm.scss";

const APP_ISLOADING_DELAY = Number(import.meta.env.VITE_APP_ISLOADING_DELAY);

const isSafari: boolean =
  navigator.userAgent.toLowerCase().includes("safari") &&
  !navigator.userAgent.toLowerCase().includes("chrome");


const LoginForm: FC<ChildrenPropsInterface> = ({ children }) => {
  const { loginUser } = useAppContext();

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ showPassword, setShowPassword ] = useState<boolean>(false);
  const [ initialFormCheck, setInitialFormCheck ] = useState<boolean>(false);
  const [ emailIsValid, setEmailIsValid ] = useState<boolean>(true);
  const [ passwordIsValid, setPasswordIsValid ] = useState<boolean>(true);

  const [ componentIsLoading, setComponentIsLoading ] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword(c => !c);
  };

  const handleEmailChange = (e?: ChangeEvent<HTMLInputElement>): boolean => {
    const emailValue: string =
      e?.target.value ?? emailRef.current?.value ?? "";

    const isValid: boolean = isValidEmail(emailValue);

    setEmail(emailValue);
    setEmailIsValid(isValid);

    return isValid;
  };

  const handlePasswordChange = (e?: ChangeEvent<HTMLInputElement>): boolean => {
    const passwordValue: string =
      e?.target.value ?? passwordRef.current?.value ?? "";

    const isValid: boolean = isValidPassword(passwordValue);

    setPassword(passwordValue);
    setPasswordIsValid(isValid);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<boolean> => {
    e.preventDefault();
    setInitialFormCheck(true);

    let invalidInputs: number = 0;

    if(!handleEmailChange()) {
      toast.error("Invalid email");
      invalidInputs += 1;
    };

    if(!handlePasswordChange()) {
      toast.error("Invalid password");
      invalidInputs += 1;
    };

    if(invalidInputs){
      return false;
    };
    
    setComponentIsLoading(true);
    
    setTimeout(() => {
      setComponentIsLoading(false);
    }, APP_ISLOADING_DELAY)
    
    return loginUser(email, password);
  };

  // useEffect to focus email input on load
  useEffect(() => {
    emailRef.current?.focus();
  }, []);


  return (
    <section className="loginForm">
      <div className={`loginForm__isLoading ${componentIsLoading ? "show": ""}`}>
        {/* <IsLoading_6 /> */}
        {/* <IsLoading_7 /> */}
        {/* <IsLoading_10 /> */}
        <IsLoading_11 />
      </div>
      <div className="loginForm__inner">
        <div className="loginForm__header">
          <h4 className="loginForm__heading">Admin Login</h4>
        </div>

        <form
          name="loginForm"
          className="loginForm__form"
          onSubmit={handleSubmit}
        >
          {children}

          <div className="loginForm__field">
            <label htmlFor="email" className="loginForm__label">
              Email Address
            </label>

            <input
              type="text"
              id="email"
              className="loginForm__input"
              name="email"
              placeholder="EMAIL"
              value={email}
              ref={emailRef}
              onChange={handleEmailChange}
              onBlur={handleEmailChange}
              aria-describedby="emailError"
              aria-invalid={
                !emailIsValid && initialFormCheck ? "true" : "false"
              }
            />

            {!emailIsValid && initialFormCheck && (
              <div
                id="emailError"
                className="loginForm__error"
                role="alert"
              >
                Invalid Email
              </div>
            )}
          </div>

          <div className="loginForm__field loginForm__field--password">
            <label htmlFor="password" className="loginForm__label">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="loginForm__input loginForm__input--password"
              name="password"
              placeholder="PASSWORD"
              value={password}
              ref={passwordRef}
              onChange={handlePasswordChange}
              onBlur={handlePasswordChange}
              aria-describedby="passwordError"
              aria-invalid={
                !passwordIsValid && initialFormCheck ? "true" : "false"
              }
            />

            {!isSafari
            
              ? (
                  <ShowHidePassword 
                    handleTogglePasswordVisibility={handleTogglePasswordVisibility}
                    showPassword={showPassword}
                  />
                )
              : null
            }

            {!passwordIsValid && initialFormCheck && (
              <div
                id="passwordError"
                className="loginForm__error"
                role="alert"
              >
                Invalid Password
              </div>
            )}
          </div>

          <div className="loginForm__submit">
            <button
              type="submit"
              className={`loginForm__button ${componentIsLoading ? "disabled" : ""}`}
              aria-busy={componentIsLoading}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </section>
  )};

export default LoginForm;