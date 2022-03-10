import { Typography } from "@material-ui/core";
import "../styles/DaoInformationElement.scss";
import { CSSTransition, Transition } from "react-transition-group";

function DaoInformationElement({ howTitleTwoFade }) {
  const elementData = [
    {
      title: "Bonds & LP fees",
      info: "Bond sales and LP Fees increase Treasury Revenue and lock in liquidity and help control NRK supply.",
      imgUrl: require("../../../assets/new_home/daoinfo-1.png"),
    },
    {
      title: "NoahArk Treasury",
      info: "Treasury inflow is used to increase Treasury Balance and back outstanding NRK tokens and regulate staking APY.",
      imgUrl: require("../../../assets/new_home/daoinfo-2.png"),
    },
    {
      title: "NRK Token",
      info: "Compounds yields automatically through a treasury backed currency with intrinsic value.",
      imgUrl: require("../../../assets/new_home/daoinfo-3.png"),
    },
  ];

  return (
    <div className="info-element">
      <Typography variant="h2" component="h2" className="how-word-title">
        How does <span style={{ color: "#fff" }}>NoahArkDAO</span> work ?
      </Typography>
      <CSSTransition in={howTitleTwoFade} timeout={800} classNames={"box"} unmountOnExit={true}>
        <div className="info">
          {elementData.map((item, index) => (
            <div className="element-content" key={index}>
              <img className="element-number" src={item.imgUrl.default} alt="" />
              <Typography variant="h3" component="h3" className="element-title">
                {item.title}
              </Typography>
              <Typography variant="body1" component="p" className="element-info">
                {item.info}
              </Typography>
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}
export default DaoInformationElement;
