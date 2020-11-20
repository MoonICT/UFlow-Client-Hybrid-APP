/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import { StyleSheet } from 'react-native';
import { theme } from '@Themes';

export const styles = StyleSheet.create({
  container: {},
  slider: {
    width: '100%',
    height: 15,
  },
  trackStyle: {
    height: 2,
  },
  thumbStyle: {
    width: 12,
    height: 12,
  },
  labelWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  label: {
    lineHeight: 20,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.54)',
  }
});
