/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-21 10:01:32
 * @LastEditTime: 2022-01-21 10:27:19
 * @LastEditors: jiawen.wang
 */
import { Typography } from "@material-ui/core";
import "../styles/partnerPart.scss";
export default function PartnerPart() {
  const partnerGnosis = require("../../../assets/home/partner/partner-gnosis.png");
  const partnerBox = require("../../../assets/home/partner/partner-box.png");
  const partnerAvalanche = require("../../../assets/home/partner/partner-avalanche.png");
  const partnerOpenZeppe = require("../../../assets/home/partner/partner-openzepple.png");
  return (
    <div className="info-element">
      <Typography variant="h2" component="h2" className="how-word-title">
        Our <span style={{ color: "#fff" }}>Partners</span>
      </Typography>

      <div className="partners">
        <img className="partner-img img-margin" src={partnerGnosis.default} alt="" />
        <img className="partner-img1 img-margin" src={partnerBox.default} alt="" />
        <img className="partner-img2 img-margin" src={partnerAvalanche.default} alt="" />
        <img className="partner-img3 img-margin" src={partnerOpenZeppe.default} alt="" />
      </div>
    </div>
  );
}
