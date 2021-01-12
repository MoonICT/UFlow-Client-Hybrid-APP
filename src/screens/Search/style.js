/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:35:40
 */

import { StyleSheet } from 'react-native';
// import {color} from '../themes/colors';

export const styles = StyleSheet.create({
  appBar: {
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: -999,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingLeft: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingWrap: {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: '#f1f1f1',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  loadingInner: {
    width: '100%',
    height: 40,
  }
});
