/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:39:35
 */

import { StyleSheet } from 'react-native';
import { theme } from '@Themes';
import { color } from '@Themes/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(232, 244, 253)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  labelWrap: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 4,
    // fontFamily: theme.fonts.medium.fontFamily
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  iconClose: {
    fontSize: 20,
  },
  /************** Colors *************/
  bgWarning: {
    backgroundColor: color.warning.light,
  },
  bgSuccess: {
    backgroundColor: color.success.light,
  },
  bgInfo: {
    backgroundColor: color.info.light,
  },
  bgError: {
    backgroundColor: color.error.light,
  },
});
