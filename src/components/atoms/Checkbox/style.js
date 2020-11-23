/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import { StyleSheet } from 'react-native';
import { theme } from '@Themes';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkbox: {
    borderWidth: 2,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  unchecked: {
    borderColor: 'rgba(0, 0, 0, 0.54)',
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(0, 0, 0, 0.2)'
  },
  icon: {
    marginLeft: -2,
    color: '#fff',
    fontSize: 20,
    lineHeight: 18,
  },
  label: {
    lineHeight: 20,
    marginLeft: 12,
    color: 'rgba(0, 0, 0, 0.87)',
  }
});
