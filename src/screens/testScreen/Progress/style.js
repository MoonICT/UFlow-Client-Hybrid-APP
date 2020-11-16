import {StyleSheet} from 'react-native';
// import {color} from '../themes/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 40,
    width: 40,
    // padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
  },
});
