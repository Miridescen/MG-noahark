import twitterImg from "../../../assets/new_home/bottom-twitter.png";
import telementImg from "../../../assets/new_home/bottom-telement.png";
import discoverImg from "../../../assets/new_home/bottom-discover.png";
import githubImg from "../../../assets/new_home/bottom-github.png";
import docImg from "../../../assets/new_home/bottom-doc.png";
import "../styles/homeLinkList.scss";

function HomeLinkList() {
  const link = [
    {
      id: 1,
      name: "twitter",
      href: "https://twitter.com/NoahArkDAO",
      lightImg: twitterImg,
    },
    {
      id: 2,
      name: "telegram",
      href: "https://t.me/NoahArkDAO",
      lightImg: telementImg,
    },
    {
      id: 3,
      name: "discord",
      href: "https://discord.com/invite/KaTFSdmj9f",
      lightImg: discoverImg,
    },
    {
      id: 4,
      name: "github",
      href: "https://github.com/NoahArkDAO",
      lightImg: githubImg,
    },
    {
      id: 5,
      name: "white paper",
      href: "https://docs.noahark.money/",
      lightImg: docImg,
    },
  ];
  const buttonGround = function (url) {
    return {
      backgroundImage: "url(" + url + ")",
    };
  };
  const turnPage = url => {
    window.open(url);
  };
  return (
    <nav className="home-link">
      {link.map((item, index) => {
        return (
          <button
            key={index}
            className="link-button"
            style={buttonGround(item.lightImg)}
            onClick={() => turnPage(item.href)}
            alt=""
          ></button>
        );
      })}
    </nav>
  );
}

export default HomeLinkList;
