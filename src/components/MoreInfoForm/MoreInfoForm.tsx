import { 
  type FC,
  type ChangeEvent,
  useState, 
} from 'react';
import "./MoreInfoForm.scss";

// need to put the endpoint in env and import it
// need validation for input field data (name, email, phone)
// need styling for invalid inputs after first submit: must update isValid styles on update after initial submit


const MoreInfoForm: FC = () => {

  const [ name, setName ] =useState<string>("");
  const [ email, setEmail ] =useState<string>("");
  const [ phone, setPhone ] =useState<string>("");
  const [ agreeToTerms, setAgreeToTerms ] =useState<boolean>(true);


  const handleUpdateName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleUpdateEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleUpdatePhone = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const handleUpdateAgreeToTerms = (e: ChangeEvent<HTMLInputElement>): void => {
  setAgreeToTerms(e.target.checked);
};

  const handleSubmit = (): void => {
    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(agreeToTerms)

  };


  return (
    <>
      <section className="moreInfoForm__section">
            
        <form className="moreInfoForm__form" onSubmit={(e) => {e.preventDefault()}}>

          <div className="moreInfoForm__name">
            <label htmlFor="moreInfoFormName" className="moreInfoForm__label">
              Name
            </label>

            <input 
              id="moreInfoFormName"
              type="text" 
              className="moreInfoForm__input moreInfoForm__input--name" 
              autoComplete="name"
              placeholder="Enter Name"
              value={name}
              onChange={handleUpdateName}
            />

          </div>

          <div className="moreInfoForm__email">

            <label htmlFor="moreInfoFormEmail" className="moreInfoForm__label">
              Email
            </label>
            <input 
              id="moreInfoFormEmail"
              type="text" 
              className="moreInfoForm__input moreInfoForm__input--email" 
              autoComplete="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleUpdateEmail}
            />
          </div>

          <div className="moreInfoForm__phone">

            <label htmlFor="moreInfoFormPhone" className="moreInfoForm__label">
              Phone
            </label>

            <input 
              id="moreInfoFormPhone"
              type="tel" 
              className="moreInfoForm__input moreInfoForm__input--phone" 
              inputMode="numeric"
              autoComplete="tel"
              placeholder="Enter Phone"
              value={phone}
              onChange={handleUpdatePhone}
            />
          
          </div>

          <div className="moreInfoForm__terms">

            <label htmlFor="moreInfoFormTerms" className="moreInfoForm__label">
              Terms
            </label>

            <input 
              id="moreInfoFormTerms"
              type="checkbox" 
              className="moreInfoForm__input moreInfoForm__input--terms" 
              checked={agreeToTerms}
              onChange={handleUpdateAgreeToTerms}
            />

          </div>
      
          <button 
            className="moreInfoForm__submit"
            onClick={handleSubmit}
          >
            Submit
          </button>

        </form>
      </section>

    </>
  )};

export default MoreInfoForm;