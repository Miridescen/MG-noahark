import React, { useEffect, useState, useCallback } from "react";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import twitterImg from '../assets/home/bottom-twitter.png'
import telementImg from '../assets/home/bottom-telement.png'
import discoverImg from '../assets/home/bottom-discover.png'
import githubImg from '../assets/home/bottom-github.png'
import docImg from '../assets/home/bottom-doc.png'

import twitterDarkImg from '../assets/home/twitter-dark.png'
import telementDarkImg from '../assets/home/telement-dark.png'
import discoverDarkImg from '../assets/home/disccard-dark.png'
import githubDarkImg from '../assets/home/github-dark.png'
import docDarkImg from '../assets/home/doc-dark.png'
import { NavLink } from "react-router-dom";
import { itemType } from "src/views/TreasuryDashboard/treasuryData";

function HomeLinkList({dark}){
  const link = [
    {
      id:1,
      name:'twitter',
      href:"https://twitter.com/NoahArkDAO",
      lightImg:twitterImg,
      darkImg:twitterDarkImg,
    },
    {
      id:2,
      name:'telegram',
      href:"https://t.me/NoahArkDAO",
      lightImg: telementImg,
      darkImg: telementDarkImg,
    },
    {
      id:3,
      name:'discord',
      href:"https://discord.gg/nak",
      lightImg:discoverImg,
      darkImg:discoverDarkImg,
    },
    {
      id:4,
      name:'github',
      href:"https://github.com/NoahArkDAO",
      lightImg:githubImg,
      darkImg:githubDarkImg,
    },
    {
      id:5,
      name:'white paper',
      href:"https://docs.noahark.money/",
      lightImg:docImg,
      darkImg:docDarkImg,
    },
  ]
  const buttonGround = function(url){
    return {
      backgroundImage:'url('+url+')',
    }
  }
  const turnPage = (url)=>{
    window.open(url)
  }
  return (
    <div className="home-link">
    {
      link.map((item, index) =>{return  <button key={index} className="link-button" style={buttonGround(dark==="dark"?item.darkImg:twitterImg)} onClick={()=>turnPage(item.href)} alt=""></button>})
    }
    </div>   
  )
}

export default HomeLinkList;