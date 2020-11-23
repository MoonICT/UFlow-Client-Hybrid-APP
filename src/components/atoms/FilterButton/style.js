/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import { StyleSheet } from 'react-native';
import { theme } from '@Themes';

export const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    height: 36,
    fontSize: 14,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginHorizontal: 3,
    borderRadius: 4,
  },
  buttonOn: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  buttonOff: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    color: 'rgba(0, 0, 0, 0.47)',
  },
  icon: {
    fontSize: 24,
  }
});
