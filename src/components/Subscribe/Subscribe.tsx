import { type FC, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import "./Subscribe.scss";

// need email validation handling including invalid stylings
// need api call logic

const Subscribe: FC = () => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast("yup")

    // TODO: Add submission logic (e.g. API call or toast message)
    console.log("Subscription form submitted");
  };

  return (
    <>
      <div className="subscribe">
        <div className="subscribne__inner">

          <h2 className="subscribe__heading">
            Subscribe & Follow
          </h2>
          <p className="subscribe__lead">
            Stay updated with our latest news and announcements. Subscribe to our newsletter and follow us on social media for valuable insights and exciting updates.
          </p>

          <form className="subscribe__form" onSubmit={handleSubmit}>
            <label htmlFor="subscribe" className="subscribe__label">Subscribe</label>

          <input
            id="subscribe"
            // type="email"
            className="subscribe__input"
            placeholder="Enter your email"
            required
          />

            <button 
              type="submit"
              className="subscribe__submit"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
      
    </>
  )};

export default Subscribe;