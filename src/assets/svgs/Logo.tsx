import { type FC } from "react";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <>
      <div className={className}>ZRL</div>
    </>
  );
};

export default Logo;