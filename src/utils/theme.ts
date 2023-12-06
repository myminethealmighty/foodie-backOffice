{
  /* import { PaletteMode, createTheme } from "@mui/material";
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#4C4C6D",
          },
          secondary: {
            main: "#FFE194",
          },
          info: {
            main: "#E8F6EF",
          },
          success: {
            main: "#1B9C85",
          },
        }
      : {
          primary: {
            main: "#e63946",
          },
          secondary: {
            main: "#a8dadc",
          },
          info: {
            main: "#f1faee",
          },
          success: {
            main: "#1d3557",
          },
        }),
  },
});

export const theme = createTheme(getDesignTokens("light")); */
}

import { store } from "@/store";
import { createTheme } from "@mui/material/styles";

const getDesignTokens = () => {
  const state = store.getState();
  const theme = state.app.theme;
  if (theme === "light") {
    return {
      palette: {
        primary: {
          main: "#4C4C6D",
        },
        secondary: {
          main: "#FFE194",
        },
        info: {
          main: "#E8F6EF",
        },
        success: {
          main: "#1B9C85",
        },
      },
    };
  } else {
    return {
      palette: {
        primary: {
          main: "#e63946",
        },
        secondary: {
          main: "#a8dadc",
        },
        info: {
          main: "#f1faee",
        },
        success: {
          main: "#1d3557",
        },
      },
    };
  }
};

export const theme = createTheme(getDesignTokens());
