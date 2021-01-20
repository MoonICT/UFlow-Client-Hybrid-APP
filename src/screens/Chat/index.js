/**
 * TODO @Deprecated
 * @create
 * @modify
 * @desc [description]
 */
//
// // Global Imports
// import React, { Component, Fragment } from 'react';
// import {
//   SafeAreaView,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { connect } from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';
// import { Appbar, Text } from 'react-native-paper';
//
// // Local Imports
// import DefaultStyle from '@Styles/default';
// import Appbars from '@Components/organisms/AppBar';
// import TextField from '@Components/organisms/TextField';
// import ActionCreator from '@Actions';
// import { styles as S } from './style';
// import card from '@Assets/images/card-img.png';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// const data = [
//   {
//     name: 'Test1',
//     time: '4분 전',
//     avatar: card,
//     title: '네, 계약서 작성 진행하겠습니다.',
//   },
//   {
//     name: 'Test1',
//     time: '4분 전',
//     avatar: card,
//     title: '다음에 뵙겠습니다.',
//   },
//   {
//     name: 'Test1',
//     time: '4분 전',
//     avatar: card,
//     title: '넵 저희는 냉동 식품류 위주로 진행 하고있습…',
//   },
// ];
// class Consulting extends Component {
//   constructor(props) {
//     super(props);
//     this.webView = null;
//     this.state = {
//       dataUser: data,
//     };
//     this.navigation = props.navigation;
//   }
//
//   /** listener when change props */
//   shouldComponentUpdate(nextProps, nextState) {
//     return true;
//   }
//
//   /** when exits screen */
//   componentWillUnmount() {
//   //console.log('//::componentWillUnmount::');
//   }
//
//   showDialog = () => this.setState({ visible: true });
//
//   hideDialog = () => this.setState({ visible: false });
//
//   showConfirm = () => this.setState({ visibleConfirm: true });
//
//   hideConfirm = () => this.setState({ visibleConfirm: false });
//
//   render() {
//     const { imageStore, workComplete } = this.props;
//     const { dataUser } = this.state;
//
//     console.log('data :>> ', data);
//     let items =
//       dataUser &&
//       dataUser.map((item, index) => {
//         return (
//           <ScrollView style={S.listUser} horizontal={true} key={index}>
//             <TouchableOpacity
//               style={[DefaultStyle.btnItem, S.btnUser]}
//               onPress={() => this.navigation.navigate('Chatting')}>
//               <View style={S.user}>
//                 <View style={S.info}>
//                   <View>
//                     <Image source={item.avatar} style={S.avatar} />
//                     <View style={S.status} />
//                   </View>
//
//                   <View style={[DefaultStyle.leftItem, { marginLeft: 8 }]}>
//                     <View style={S.titleUser}>
//                       <Text style={S.name}>{item.name}</Text>
//                       <Text style={S.time}>{item.time}</Text>
//                     </View>
//
//                     <Text style={DefaultStyle.titleItem}>{item.title}</Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={S.btnDelete}
//               onPress={() => {
//                 let dataUpdate = dataUser.filter(
//                   (el, number) => number !== index,
//                 );
//                 this.setState({ dataUser: dataUpdate });
//               }}>
//               <Icon
//                 name="delete"
//                 size={12}
//                 color="rgba(0, 0, 0, 0.87)"
//                 style={S.iconDelete}
//               />
//             </TouchableOpacity>
//           </ScrollView>
//         );
//       });
//     return (
//       <SafeAreaView style={S.container}>
//         <Appbars>
//           <Appbar.Action
//             icon="arrow-left"
//             color="black"
//             onPress={() => this.navigation.goBack()}
//           />
//           <Appbar.Content
//             title="채팅"
//             color="black"
//             fontSize="12"
//             titleStyle={DefaultStyle.headerTitle}
//           />
//         </Appbars>
//         <ScrollView>{items}</ScrollView>
//       </SafeAreaView>
//     );
//   }
//
//   /** when after render DOM */
//   async componentDidMount() {
//     console.log('::componentDidMount::');
//     SplashScreen.hide();
//   }
//   componentWillUpdate(nextProps, nextState) {
//     console.log('Component WILL UPDATE!');
//   }
//   /** when update state or props */
//   componentDidUpdate(prevProps, prevState) {
//     console.log('::componentDidUpdate::');
//   }
// }
//
// /** map state with store states redux store */
// function mapStateToProps(state) {
//   // console.log('++++++mapStateToProps: ', state);
//   return {
//     imageStore: state.registerWH.pimages,
//     workComplete: state.registerWH.workComplete,
//   };
// }
//
// /** dispatch action to redux */
// function mapDispatchToProps(dispatch) {
//   return {
//     // countUp: diff => {
//     //   dispatch(ActionCreator.countUp(diff));
//     // },
//     // countDown: diff => {
//     //   dispatch(ActionCreator.countDown(diff));
//     // },
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Consulting);
