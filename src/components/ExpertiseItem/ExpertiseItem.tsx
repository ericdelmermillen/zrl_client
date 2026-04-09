import { type FC } from "react";
import { type ExpertiseItemProps } from "../../typing/interfaces/interfaces"
import "./ExpertiseItem.scss";


const ExpertiseItem: FC<ExpertiseItemProps> = ({ 
  Icon, 
  iconClassModifier, 
  name, 
  desc 
}) => {

  return (
    <li className="expertiseItem">
      <Icon
        className={`expertiseItem__icon expertiseItem__icon--${iconClassModifier}`}
        aria-label={name}
      />
      <h3 className="expertiseItem__heading">{name}</h3>
      <div className="expertiseItem__desc">{desc}</div>
    </li>
  );
};

export default ExpertiseItem;