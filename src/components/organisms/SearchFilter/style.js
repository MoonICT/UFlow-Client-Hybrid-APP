/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:28:09
 */

import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { theme } from '@Themes';

const variables = {
  height: 48,
}

export const styles = StyleSheet.create({
  container: {
  },
  scrollViewWrap: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  scrollView: {
    // zIndex: 10,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingLeft: 13,
    paddingRight: 13 + variables.height,
    height: variables.height,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  reset: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: variables.height,
    width: variables.height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderBottomWidth: Platform.OS === 'android' ? 0 : 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  resetIcon: {
    fontSize: 24,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  linearGradient: {
    position: 'absolute',
    top: 1,
    right: variables.height,
    height: variables.height - 2,
    width: variables.height,
  },
});
