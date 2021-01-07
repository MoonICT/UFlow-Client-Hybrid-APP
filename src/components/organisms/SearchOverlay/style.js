/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:37:47
 */

import { StyleSheet } from 'react-native';
import { theme } from '@Themes';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
  },
  searchBarWrap: {
    height: 48,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  searchBar: {
    width: '100%',
    overflow: 'hidden',
    height: 28,
    elevation: 0,
  },
  searchInput: {
    fontWeight: '400',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 16,
    marginTop: -10,
    marginBottom: -10,
  },
  searchListHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  searchListLabel: {
    fontSize: 12,
    alignItems: 'stretch',
  },
  searchListBtn: {
    alignItems: 'flex-end',
  },
  searchListBtnLabel: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  listItem: {
    paddingHorizontal: 7,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginBottom: 10,
  },
  listItemTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.87)',
    // fontFamily: theme.fonts.medium.fontFamily,
  },
  listItemDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  listItemIcon: {
    color: 'red',
    marginLeft: 0,
    marginRight: 16,
  }
});
