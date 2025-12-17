import { 
  useState, 
  useRef, 
  useEffect, 
  type FC, 
  type FormEvent, 
  type ChangeEvent 
} from "react";
import { type ChildrenPropsInterface } from "../../typing/interfaces/interfaces";
import { useAppContext } from "../../contexts/AppContext";
import { isValidEmail, isValidPassword } from "../../../utils/utils";
import { toast } from "react-hot-toast";
import Hide from "../../assets/svgs/Hide";
import Show from "../../assets/svgs/Show";
import "./LoginForm.scss";


const isSafari: boolean =
  navigator.userAgent.toLowerCase().includes("safari") &&
  !navigator.userAgent.toLowerCase().includes("chrome") &&
  !navigator.userAgent.toLowerCase().includes("mozilla");


const LoginForm: FC<ChildrenPropsInterface> = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [initialFormCheck, setInitialFormCheck] = useState<boolean>(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, loginUser } = useAppContext();

  /* ---------------------------------------------
     Handlers
  --------------------------------------------- */
  const handleTogglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  const handleEmailChange = (
    e?: ChangeEvent<HTMLInputElement>
  ): boolean => {
    const emailValue =
      e?.target.value ?? emailRef.current?.value ?? "";

    const valid = isValidEmail(emailValue);

    setEmail(emailValue);
    setEmailIsValid(valid);

    return valid;
  };

  const handlePasswordChange = (
    e?: ChangeEvent<HTMLInputElement>
  ): boolean => {
    const passwordValue =
      e?.target.value ?? passwordRef.current?.value ?? "";

    const valid = isValidPassword(passwordValue);

    setPassword(passwordValue);
    setPasswordIsValid(valid);

    return valid;
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setInitialFormCheck(true);

    if (!handleEmailChange()) {
      toast.error("Invalid email");
      return;
    }

    if (!handlePasswordChange()) {
      toast.error("Invalid password");
      return;
    }

    // await loginUser(email, password);
    loginUser()
  };

  /* ---------------------------------------------
     Effects
  --------------------------------------------- */
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  /* ---------------------------------------------
     Render
  --------------------------------------------- */
  return (
    <section className="loginForm">
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

          {/* ---------------- Email ---------------- */}
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

          {/* ---------------- Password ---------------- */}
          <div className="loginForm__field loginForm__field--password">
            <label htmlFor="password" className="loginForm__label">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="loginForm__input"
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

            <button
              type="button"
              className={`passwordInput__icon ${isSafari ? "hide" : ""}`}
              onClick={handleTogglePasswordVisibility}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <Hide className="passwordInput__icon--hide" />
              ) : (
                <Show className="passwordInput__icon--show" />
              )}
            </button>

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

          {/* ---------------- Submit ---------------- */}
          <div className="loginForm__submit">
            <button
              type="submit"
              className="loginForm__button"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </section>
  )};

export default LoginForm;
