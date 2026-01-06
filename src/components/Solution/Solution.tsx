import { type FC } from 'react';
import type { SolutionProps } from "../../typing/interfaces/interfaces";
import "./Solution.scss";


const Solution: FC<SolutionProps> = ({ img, title, text, tag, alt }) => {
  return (
    <>
      <article className="solution">
        <div className="solution__inner">
          <img 
            className="solution__image"
            src={img} 
            alt={alt} 
          />
          <h3 className="solution__title">{title}</h3>
          <p className="solution__text">{text}</p>
          <span className="solution__tag">{tag}</span>
        </div>

      </article>
    </>
  )};

export default Solution;