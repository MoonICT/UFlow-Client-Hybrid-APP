/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import { StyleSheet } from 'react-native';
import { theme } from '@Themes';
import { color } from "../../../themes/colors";

const variables = {
  height: 48,
}

export const styles = StyleSheet.create({
  // ============ Parent Styles ============
  container: {
    position: 'absolute',
    top: 48,
    zIndex: 1,
    width: '100%',
  },
  animatedView: {
    zIndex: 1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // backgroundColor: 'red',
  },
  btnFilter: {
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  // ============ Child Styles (Filter detail) ============
  // ===== Gird =====
  // Button Grid
  gridRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  gridColumn: {
    width: '50%',
    paddingHorizontal: 6,
  },
  // ===== Button =====
  // Button Default
  btn: {
    height: 36,
    borderRadius: 30,
    width: '100%',
    // alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  btnLabel: {
    lineHeight: 20,
    fontSize: 15,
    textAlignVertical: 'top',
  },
  // Button variant
  btnPrimary: {
    backgroundColor: theme.colors.primary,
  },
  btnPrimaryOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  // Button label variant
  btnLabelPrimary: {
    color: '#fff',
  },
  // ===== Filter =====
  // Filter label
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterLabelWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterLabel: {
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 10,
  },
  filterLabelMain: {
    fontFamily: theme.fonts.medium.fontFamily,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  filterLabelSub: {
    fontFamily: theme.fonts.regular.fontFamily,
    color: 'rgba(0, 0, 0, 0.54)',
    marginLeft: 6,
  },
  filterCheckWrap: {
    paddingVertical: 16
  },
  filterDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 24,
    marginHorizontal: -16,
  },
  // ===== Only other filter =====
  filterOtherContainer: {
    position: 'absolute',
    // flex: 1,
    elevation: 15,
    zIndex: 15,
    width: '100%',
    height: '100%',
    top: -48,
    bottom: 0,
    backgroundColor: '#fff',
  },
  filterOtherHeader: {
    height: 48,
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
  filterOtherHeaderTitle: {
    fontSize: 16,
  },
  filterOtherHeaderSubTitle: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.47)',
    textAlign: 'right',
    marginRight: 16,
  },
  filterOtherHeaderContainer: {
    paddingLeft: 0,
  },
  filterOtherScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterOtherBtn: {
  }
});
