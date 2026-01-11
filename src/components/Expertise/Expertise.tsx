import { type FC } from "react";
import ExpertiseItem from "../ExpertiseItem/ExpertiseItem";
import { 
  FaLightbulb, 
  FaGlasses, 
  FaGraduationCap, 
  FaChartBar, 
  FaCloud 
} from "react-icons/fa6";
import { MdMonitor } from "react-icons/md";
import { PiWifiMediumBold } from "react-icons/pi";
import { TbSettingsFilled } from "react-icons/tb";
import "./Expertise.scss";

const expertises = [
  {
    icon: FaLightbulb,
    iconClassModifier: "bulb",
    name: "Flexible Services",
    desc: "We adapt to your needs with agile, scalable, and cost-effective solutions tailored to your business."
  },
  {
    icon: MdMonitor,
    iconClassModifier: "monitor",
    name: "Modern Web Apps",
    desc: "We build responsive, high-performance web applications that provide a seamless user experience across all devices."
  },
  {
    icon: PiWifiMediumBold,
    iconClassModifier: "wifi",
    name: "Connectivity",
    desc: "We ensure your systems are connected, secure, and efficient through smart integrations and APIs."
  },
  {
    icon: TbSettingsFilled,
    iconClassModifier: "settings",
    name: "Automation",
    desc: "We streamline operations by automating repetitive processes to boost productivity and reduce costs."
  },
  {
    icon: FaGlasses,
    iconClassModifier: "glasses",
    name: "Insight & Strategy",
    desc: "We analyze and interpret data to give you clear insights for smarter decision-making."
  },
  {
    icon: FaGraduationCap,
    iconClassModifier: "learning",
    name: "Continuous Learning",
    desc: "Our team constantly evolves with the latest technologies to deliver innovative solutions."
  },
  {
    icon: FaChartBar,
    iconClassModifier: "analytics",
    name: "Data Analytics",
    desc: "We turn raw data into actionable insights that drive measurable results."
  },
  {
    icon: FaCloud,
    iconClassModifier: "cloud",
    name: "Cloud Solutions",
    desc: "We architect scalable cloud solutions that support your business growth and resilience."
  }
];


const Expertise: FC = () => {
  return (
    <>
      <section className="expertise" id="expertise">
        <div className="expertise__inner">
          <h2 className="expertise__heading">Expertise</h2>
          <p className="expertise__lead">
            We take pride in our expertise. With years of experience and a dedicated team, we deliver exceptional software solutions tailored to your needs. Our strong points include:
          </p>

          <ul className="expertise__items">

            {expertises.map((item, idx) => (

              <ExpertiseItem
                key={idx}
                Icon={item.icon}
                iconClassModifier={item.iconClassModifier}
                name={item.name}
                desc={item.desc}
              />

            ))}

          </ul>
        </div>
      </section>
    </>
  )};

export default Expertise;