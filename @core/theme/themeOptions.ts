import UserThemeOptions from "@/layouts/UserThemeOptions";
import { PaletteMode, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { Settings } from "../context/settingsContext";

import breakpoints from './breakpoints';
import overrides from './overrides';
import palette from './palette';
import shadows from './shadows';
import spacing from './spacing';
import typography from './typography';

const themeOptions = (settings: Settings, overrideMode: PaletteMode): ThemeOptions => {
  const { skin, mode, direction, themeColor } = settings;

  const userThemeConfig: ThemeOptions = Object.assign({}, UserThemeOptions());

  const mergedThemeConfig: ThemeOptions = deepmerge(
    {
      breakpoints: breakpoints(),
      direction,
      components: overrides(settings),
      palette: palette(mode === 'semi-dark' ? overrideMode : mode, skin),
      ...spacing,
      shape: {
        borderRadius: 10,
      },
      mixins: {
        toolbar: {
          minHeight: 64,
        },
      },
      shadows: shadows(mode === 'semi-dark' ? overrideMode : mode),
      typography,
    },
    userThemeConfig,
  );

  // Ensure the background color for dark theme is set to #f8f9fa
  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...(mergedThemeConfig.palette
          ? mergedThemeConfig.palette[themeColor]
          : palette(mode === 'semi-dark' ? overrideMode : mode, skin).primary),
      },
      background: {
        default: '#f8f9fa',
        paper: '#f8f9fa',
      },
    },
  });
};

export default themeOptions;
