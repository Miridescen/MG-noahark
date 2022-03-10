/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-17 11:24:44
 * @LastEditTime: 2022-01-24 16:10:51
 * @LastEditors: jiawen.wang
 */
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import fonts from "./fonts";
import commonSettings, { handleBackdropFilter } from "./global.js";
import { purple } from "@material-ui/core/colors";
const breakpointValues = {
  xs: 0,
  sm: 596,
  md: 800,
  lg: 1000,
  xl: 1333,
};

const homeTheme = {
  background: "rgba(212, 212, 212, 0.45)",
  primaryButtonBG: "#AF845A",
  primaryButtonHoverBG: "#FFD5AC",
  primaryButtonColor: "#391E07",
  paperBg: "rgba(255, 255, 255, 0.6)",
};

let theme = createTheme(
  {
    palette: {
      direction: "rtl",

      primary: {
        // Purple and green play nicely together.
        main: "#AF845A",
        contrastText: homeTheme.primaryButtonColor,
      },
      background: {
        default: "#080808",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
    shape: {
      // borderRadius: 50,
    },
    spacing: 8,
    typography: {
      // fontSize: 16,
      // htmlFontSize: 16,
      button: {
        fontFamily: "Cinzel-Black",
        fontSize: 27,
        borderRadius: 50,
        fontWeight: 700,
      },
      h1: {
        fontFamily: "Cinzel-Bold",
        fontSize: 100,
        lineHeight: 0.9,
      },
      h2: {
        fontFamily: "Cinzel-Black",
        fontSize: "3.75rem",
        fontWeight: 600,
        letterSpacing: "1.3px",
        lineHeight: 1,
      },
      h3: {
        fontFamily: "Cinzel-Black",
        fontSize: "2.25rem",
      },
      h4: {
        fontSize: "1.5rem",
      },
      body1: {
        fontFamily: "Cinzel",
        fontSize: "1.63rem",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": fonts,
          breakpoints: { values: breakpointValues },
          body: {
            background: homeTheme.background,
          },
        },
      },
      MuiButton: {
        root: {
          maxHeight: "75px",
        },
        containedPrimary: {
          // fontFamily: "Cinzel",
          // color: homeTheme.primaryButtonColor,
          // backgroundColor: homeTheme.primaryButtonBG,
          borderRadius: 50,
          "&:hover": {
            backgroundColor: homeTheme.primaryButtonHoverBG,
          },
          "@media (hover:none)": {
            color: homeTheme.color,
            backgroundColor: homeTheme.primaryButtonBG,
            "&:hover": {
              backgroundColor: homeTheme.primaryButtonHoverBG,
            },
          },
        },
        containedSizeLarge: {
          padding: "0 22px",
        },
        containedSecondary: {
          color: homeTheme.gold,
          backgroundColor: homeTheme.paperBg,
          border: "1px solid",
          "&:hover": {
            color: "#FCFCFC",
            backgroundColor: `${homeTheme.containedSecondaryButtonHoverBG} !important`,
          },
          "@media (hover:none)": {
            color: homeTheme.gold,
            backgroundColor: homeTheme.paperBg,
            "&:hover": {
              color: "#FCFCFC",
              backgroundColor: `${homeTheme.containedSecondaryButtonHoverBG} !important`,
            },
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          color: "#ffffff",
          fontFamily: "Cinzel-Black",
          borderRadius: 50,
          backgroundColor: "rgba(31, 26, 33, 1)",
          // "&:placehoder": {
          //   fontFamily: "Cinzel",
          // },
        },
        // notchedOutline: {
        //   borderColor: `#F8CC82 !important`,
        //   borderWidth: "0",
        //   "&:hover": {
        //     borderColor: `"F8CC82 !important`,
        //   },
        // },
      },
      MuiTypography: {
        // variantMapping: {
        //   h1: "h2",
        //   h2: "h2",
        //   h3: "h2",
        //   h4: "h2",
        //   h5: "h2",
        //   h6: "h2",
        //   subtitle1: "h2",
        //   subtitle2: "h2",
        //   body1: "span",
        //   body2: "span",
        // },
      },
    },
  },
  // commonSettings,
);
let options = {
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
};
export const home = responsiveFontSizes(theme, options);
