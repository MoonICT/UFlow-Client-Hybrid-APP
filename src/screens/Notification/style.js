/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';
import { color } from '../../themes/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  boxSection: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop:60,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    letterSpacing: -0.5,
    textAlign: 'center',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
    color: '#000000',
    marginTop: 10,
  },
  titleSmall:{
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.5,
    textAlign: 'center',
    color: '#000000',
    marginTop:60
  },
  boxTarget: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingLeft: 20,
  },
  iconArrowRight: {
    paddingRight: 0,
  },
  textTarget: {
    color: '#ff6d00',
    fontSize: 14,
  },
  image: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    resizeMode: 'cover',
    marginTop:30,
    justifyContent: 'center',
  },
});
