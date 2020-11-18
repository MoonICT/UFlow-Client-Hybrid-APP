/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-04 15:28:22
 * @modify date 2020-11-17 18:06:20
 * @desc [description]
 */

import { DefaultTheme, configureFonts } from 'react-native-paper';
import { color } from './colors';

const fontConfig = {
  default: {
    black: {
      fontFamily: 'NotoSansCJKkr-Black',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'NotoSansCJKkr-Bold',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'NotoSansCJKkr-Medium',
      fontWeight: 'normal',
    },
    regular: {
      fontFamily: 'NotoSansCJKkr-Regular',
      fontWeight: 'normal',
    },
    demilight: {
      fontFamily: 'NotoSansCJKkr-DemiLight',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'NotoSansCJKkr-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'NotoSansCJKkr-Thin',
      fontWeight: 'normal',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  dark: true, //(boolean): whether this is a dark theme or light theme.
  mode: 'adaptive', // ('adaptive' | 'exact'): color mode for dark theme (See Dark Theme).
  roundness: 3, //roundness of common elements, such as buttons.
  colors: {
    ...DefaultTheme.colors,
    primary: color.primary.main, //primary color for your app, usually your brand color.
    accent: color.primary.main, //secondary color for your app which complements the primary color.
    // background: '#f1c40f', //background color for pages, such as lists.
    // surface: '#ffff', //background color for elements containing content, such as cards.
    // text: color.primary.dark, //text color for content.
    // disabled: color.primary.light, //color for disabled elements.
    // placeholder: color.primary.light, //color for placeholder text, such as input placeholder.
    // backdrop: color.primary.light, //color for backdrops of various components such as modals.
  },
  fonts: configureFonts(fontConfig),
  //   animation: {scale:},
};
