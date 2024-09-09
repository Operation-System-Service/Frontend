import { Skin } from '@/@core/layouts/type';
import { Palette, PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const DefaultPalette = (mode: PaletteMode, skin: Skin): Palette => {
  const whiteColor = '#FFF';
  const lightColor = '0, 0, 0';
  const darkColor = '234, 234, 255';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor;
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#f8f9fa';
    } else if (mode === 'light') {
      return '#f8f9fa';
    } else return '#f8f9fa';
  };

  // Creating a base theme to use for augmentColor and other utilities
  const baseTheme = createTheme();

  // Returning the palette object, first cast to 'unknown', then to 'Palette'
  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      darkBg: '#f8f9fa',
      lightBg: '#f8f9fa',
      bodyBg: '#f8f9fa', // Always #f8f9fa
      trackBg: '#f8f9fa',
      avatarBg: '#f8f9fa',
      tooltipBg: '#f8f9fa',
      tableHeaderBg: '#f8f9fa',
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor,
    },
    primary: {
      light: '#0082EF',
      main: '#0082EF',
      dark: '#0082EF',
      contrastText: whiteColor,
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
      contrastText: whiteColor,
    },
    error: {
      light: '#FF625F',
      main: '#FF4D49',
      dark: '#E04440',
      contrastText: whiteColor,
    },
    warning: {
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
      contrastText: whiteColor,
    },
    info: {
      light: '#40CDFA',
      main: '#26C6F9',
      dark: '#21AEDB',
      contrastText: whiteColor,
    },
    success: {
      light: '#83E542',
      main: '#72E128',
      dark: '#64C623',
      contrastText: whiteColor,
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161',
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: '#f8f9fa',
      default: defaultBgColor(),
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    getContrastText: baseTheme.palette.getContrastText,
    augmentColor: baseTheme.palette.augmentColor,
  } as unknown as Palette; // Cast to 'unknown' first, then 'Palette'
};

export default DefaultPalette;
