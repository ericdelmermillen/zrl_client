import { type FC } from 'react';
import "./ExpertiseItem.scss";

interface ExpertiseItemProps {
  Icon: FC<{ className?: string; 'aria-label'?: string }>;
  iconClassModifier: string;
  name: string;
  desc: string;
}

const ExpertiseItem: FC<ExpertiseItemProps> = ({ Icon, iconClassModifier, name, desc }) => {
  return (
    <li className="expertiseItem">
      <Icon
        className={`expertiseItem__icon expertiseItem__icon--${iconClassModifier}`}
        aria-label={name}
      />
      <h3 className="expertiseItem__heading">{name}</h3>
      <div className="expertiseItem__desc">{desc}</div>
    </li>
  )};

export default ExpertiseItem;
