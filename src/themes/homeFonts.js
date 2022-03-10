/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-05 10:52:47
 * @LastEditTime: 2022-01-19 18:19:52
 * @LastEditors: jiawen.wang
 */

import CinzelRegularOTF from "../assets/new_home/Cinzel-Regular.otf";
import CinzelBlackOTF from "../assets/new_home/Cinzel-Black.otf";
import CinzelBoldOTF from "../assets/new_home/Cinzel-Bold.otf";
import SquareWOFF from "../assets/new_home/Cinzel-Regular.otf";

const cinzel = {
  fontFamily: "Cinzel",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
          local('EuclidCinzel'),
          local('EuclidCinzel-Regular'),
          url(${CinzelRegularOTF}) format('woff')
      `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};
const cinzelBold = {
  fontFamily: "Cinzel-Bold",
  fontStyle: "bold",
  fontDisplay: "swap",
  fontWeight: 700,
  src: `
          local('Cinzel-Bold'),
          local('Cinzel-Bold'),
          url(${CinzelBoldOTF}) format('woff')
      `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};
// const cinzel = {
//   fontFamily: "Cinzel",
//   fontStyle: "normal",
//   fontDisplay: "swap",
//   fontWeight: 400,
//   src: `
// 		local('Cinzel'),
// 		local('Cinzel-Regular'),
// 		url(${CinzelRegularOTF}) format('otf')
// 	`,
//   unicodeRange:
//     "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
// };
const cinzelBlack = {
  fontFamily: "Cinzel-Black",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
		local('Cinzel-Black'),
		local('Cinzel-Black'),
		url(${CinzelBlackOTF}) format('otf')
	`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const fonts = [cinzel, cinzelBlack, cinzelBold];

export default fonts;
