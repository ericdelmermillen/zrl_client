import { type FC } from "react";
import { type ClassNameInterface } from "../../typing/interfaces/interfaces";


const Logo: FC<ClassNameInterface> = ({ className }) => {
  return (
    <>
      <div className={className}>ZRL</div>
    </>
  );
};

export default Logo;