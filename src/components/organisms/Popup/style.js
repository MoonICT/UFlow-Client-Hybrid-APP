/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-06 16:54:09
 * @modify date 2020-11-16 11:26:59
 * @desc [description]
 */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 328,
    minHeight: 180,
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 4,
  },
  content: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  headContent: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 64,
  },
  textContent: {
    marginBottom: 19,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  action: {
    width: '100%',
    height: 52,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionButton: {
    flex: 1,
  },
  borderHave: {
    width: 1,
    height: '100%',
    backgroundColor: ' rgba(0, 0, 0, 0.1)',
  },
});
