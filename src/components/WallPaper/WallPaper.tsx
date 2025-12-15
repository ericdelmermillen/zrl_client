import { type FC, useEffect, useState, memo } from "react";
import { type IconType } from "../../types/types";
import { useAppContext } from "../../contexts/AppContext";
import { BsCpuFill, BsHddNetworkFill } from "react-icons/bs";
import { FaDatabase, FaServer } from "react-icons/fa";
import { FaCode, FaRegObjectUngroup } from "react-icons/fa6";
import { GrTechnology } from "react-icons/gr";
import { LiaMicrochipSolid } from "react-icons/lia";
import { LuBinary } from "react-icons/lu";
import { MdUsb } from "react-icons/md";
import { PiNetworkFill } from "react-icons/pi";
import { VscGitMerge } from "react-icons/vsc";
import "./WallPaper.scss";


interface WallPaperProps {
  customIcons?: IconType[];
}

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
        className={`wallpaper__item ${colorMode === "light" 
          ? "light" 
          : "dark"}`
        }
      >
        <IconComponent className="wallpaper__icon" />
      </div>

    ))}
  </div>
);

const WallPaper: FC<WallPaperProps> = memo(({ customIcons }) => {

  const [ iconsMatrix, setIconsMatrix ] = useState<IconType[][]>([]);
  const { colorMode } = useAppContext();

  const defaultIcons: IconType[] = [  
    BsCpuFill,
    BsHddNetworkFill,
    FaCode,
    FaDatabase,
    FaRegObjectUngroup,
    FaServer,
    GrTechnology,
    LiaMicrochipSolid,
    LuBinary,
    MdUsb,
    PiNetworkFill,
    VscGitMerge
  ];

  const iconOptions = customIcons || defaultIcons;

  const getRandomIconsForRow = (itemsPerRow: number): IconType[] =>
    Array.from({ length: itemsPerRow }, () => {
      const randomIdx = Math.floor(Math.random() * iconOptions.length);
      return iconOptions[randomIdx];
    }
  );


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
            className={(idx + 1) % 2 === 0 
              ? "wallpaper__row wallpaper__row--even" 
              : "wallpaper__row wallpaper__row--odd"
            }
            colorMode={colorMode}
            rowIcons={rowIcons}
          />
        ))}

      </div>
    </div>
  );
});

export default WallPaper;