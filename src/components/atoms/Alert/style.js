/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import { StyleSheet } from 'react-native';
import { color } from '@Themes/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(232, 244, 253)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  labelWrap: {
    flexDirection: 'row',
  },
  font: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
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
