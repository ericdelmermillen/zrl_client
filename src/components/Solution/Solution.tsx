import { type FC } from 'react';
import "./Solution.scss";

interface SolutionProps {
  img: string;
  title: string;
  text: string;
  tag: string;
}

const Solution: FC<SolutionProps> = ({ img, title, text, tag }) => {
  return (
    <>
      <div className="solution">
        <div className="solution__inner">
          <img 
            className="solution__image"
            src={img} 
            alt={title} 
          />
          <h3 className="solution__title">{title}</h3>
          <p className="solution__text">{text}</p>
          <span className="solution__tag">{tag}</span>
        </div>

      </div>
      
    </>
  )};

export default Solution;