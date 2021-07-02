/**
 * @create
 * @modify
 * @desc [description]
 */

 import { StyleSheet, Dimensions } from 'react-native';
 import { color } from '@Themes/colors.js';
 
 const windowWidth = Dimensions.get('window').width;
 const windowHeight = Dimensions.get('window').height;
 
 export const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingRight: 5,
     paddingLeft: 5,
   },
   inputIntro: {
     borderWidth: 1,
     borderRadius: 4,
     borderColor: '#d7d7d7',
     lineHeight: 24,
     letterSpacing: 0.15,
     padding: 16,
     paddingRight: 24,
     color: 'rgba(0, 0, 0, 0.87)',
     // fontFamily: 'NotoSansCJKkr',
     fontSize: 16,
     textAlignVertical: 'top',
   },
   inputLoction: {
     height: 56,
     marginTop: 24,
     // fontFamily: 'NotoSansCJKkr',
   },
   inputArea: {
    width: windowWidth - 32,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 15,
    marginTop: 15,
   },
   dateInputArea: {
    width: windowWidth - 32,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
   },
   dateDv: {
     marginLeft:20, 
     marginRight:20, 
     color:'#cccccc',
    },
    inputIntro: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#d7d7d7',
      lineHeight: 24,
      letterSpacing: 0.15,
      padding: 16,
      paddingRight: 24,
      color: '#cccccc',
      // fontFamily: 'NotoSansCJKkr',
      fontSize: 16,
      textAlignVertical: 'top',
    },
    imageRegister: {
      backgroundColor: '#fafafa',
      height: 238,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textRepresentative: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 99,
      backgroundColor: '#2196f3',
    },
 });
 