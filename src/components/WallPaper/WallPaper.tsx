import { type FC, useEffect, useState, memo } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { AiOutlineException } from "react-icons/ai";
import { BiSolidCommentError } from "react-icons/bi";
import { BsCpuFill, BsLightningChargeFill, BsShieldExclamation } from "react-icons/bs";
import { FaCogs, FaExclamationTriangle } from "react-icons/fa";
import { FaBugs, FaCode, FaMicrochip, FaRobot } from "react-icons/fa6";
import { GiLightningArc } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { LuBinary } from "react-icons/lu";
import { MdOutlineSyncProblem } from "react-icons/md";
import { TbError404 } from "react-icons/tb";
import "./WallPaper.scss";


type IconType = FC<{ className?: string }>;

const iconOptions: IconType[] = [  
  GrTechnology,
  FaCode,
  BsLightningChargeFill,
  BsShieldExclamation,
  GiLightningArc,
  TbError404,
  FaBugs,
  BiSolidCommentError,
  LuBinary,
  BsCpuFill,
  FaCogs,
  FaRobot,
  FaMicrochip,
  FaExclamationTriangle,
  MdOutlineSyncProblem,
  AiOutlineException
];

// Random icons for one row
const getRandomIconsForRow = (itemsPerRow: number): IconType[] =>
  Array.from({ length: itemsPerRow }, () => {
    const randomIdx = Math.floor(Math.random() * iconOptions.length);
    return iconOptions[randomIdx];
  });

// Props for a single row
interface WallPaperRowProps {
  className: string;
  colorMode: "light" | "dark";
  rowIcons: IconType[];
}

const WallPaperRow: FC<WallPaperRowProps> = ({ className, colorMode, rowIcons }) => (
  <div className={className}>

    {rowIcons.map((IconComponent, idx) => (
      <div
        key={idx}
        className={`wallpaper__item ${idx + 1 === 8 ? "x" : ""} ${colorMode === "light" ? "light" : "dark"}`}
      >
        <IconComponent className="wallpaper__icon" />
      </div>

    ))}
  </div>
);

const WallPaper: FC = memo(() => {
  const [ iconsMatrix, setIconsMatrix ] = useState<IconType[][]>([]);
  const { colorMode } = useAppContext();

  const itemsPerRow = (() => {
    const windowWidth = window.innerWidth;
    return windowWidth < 320
      ? 4
      : windowWidth <= 400
      ? 5
      : windowWidth <= 500
      ? 6
      : windowWidth <= 600
      ? 7
      : windowWidth <= 700
      ? 8
      : windowWidth <= 800
      ? 9
      : windowWidth <= 900
      ? 10
      : windowWidth <= 1000
      ? 11
      : 12;
  })();

  const numberOfRows = 15;

  const generateIconsMatrix = (): IconType[][] =>
    Array.from({ length: numberOfRows }, () => getRandomIconsForRow(itemsPerRow));

  useEffect(() => {
    setIconsMatrix(generateIconsMatrix());

    const interval = setInterval(() => setIconsMatrix(generateIconsMatrix()), 1000);

    return () => clearInterval(interval);
  }, [itemsPerRow]);

  return (
    <div className="wallpaper">
      <div className="wallpaper__inner">
        
        {iconsMatrix.map((rowIcons, idx) => (
          <WallPaperRow
            key={idx}
            className={(idx + 1) % 2 === 0 ? "wallpaper__row wallpaper__row--even" : "wallpaper__row wallpaper__row--odd"}
            colorMode={colorMode}
            rowIcons={rowIcons}
          />
        ))}

      </div>
    </div>
  );
});

export default WallPaper;