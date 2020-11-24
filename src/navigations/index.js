/**
 * Root Navigator
 * 분리된 역할의 네비게이터를 병합하여 구성.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */

// Global Imports
import React from 'react';
// import { Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Provider as PaperProvider,
  // Button,
  IconButton,
} from 'react-native-paper';
import { Provider } from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// Local Imports
//---> Screens
import initStore from '@Store/index';

import Global from '@Screeens/Global';
import LoginScreen from '@Screeens/Login';
import ForgotIDScreen from '@Screeens/ForgotID';
// import ForgotPassScreen from '@Screeens/ForgotPass';
import HomeScreen from '@Screeens/Home';
import SearchScreen from '@Screeens/Search';
import SampleScreen from '@Screeens/Sample';
import WebviewScreen from '@Screeens/Webview';
import CameraScreen from '@Screeens/Camera';
import Notification from '@Screeens/Notification';
import Geolocations from '@Screeens/Geolocations';
import TextFeild from '@Screeens/TextField';
import testScreen from '@Screeens/testScreen';
import RegisterWH from '@Screeens/RegisterWH';
import RegisterImage from '@Screeens/RegisterWH/RegisterImage';
import RegisterInfo from '@Screeens/RegisterWH/RegisterInfo';
import RegisterIntro from '@Screeens/RegisterWH/RegisterIntro';
import RegisterMoreIntro from '@Screeens/RegisterWH/MoreInfo';
import RegisterInfoFloor from '@Screeens/RegisterWH/RegisterInfoFloor';
import RegisterContractConditions from '@Screeens/RegisterWH/ContractConditions';
import Register from '@Screeens/Register';
import Terms from '@Screeens/Terms';

import DetailsWH from '@Screeens/DetailsWH';
import DetailsLocationWH from '@Screeens/DetailsWH/DetailsLocation';
import InquiryWH from '@Screeens/DetailsWH/InquiryWH';
import DetailsInquiryWH from '@Screeens/DetailsWH/DetailsInquiryWH';
import CreateInquiryWH from '@Screeens/DetailsWH/CreateInquiryWH';

import Annoucement from '@Screeens/Annoucement';
import DetailAnnoucement from '@Screeens/Annoucement/DetailAnnoucement';

// import CustomTabBar from '@Components/organisms/CustomTabBar';

import { color } from '@Themes/colors';

//Custom Theme
import { theme } from '../themes';

const store = initStore();

// 메인 탭 옵션 설정.(Sample)
const TabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, tColor, tSize }) => {
    const routeName = route.name;
    let icon = '';
    switch (routeName) {
      case 'Home':
        icon = 'home';
        break;
      case 'Search':
        icon = 'magnify';
        break;
      // TODO change route
      case 'RegisterWH':
        icon = 'forum';
        break;
      case 'SampleScreen':
        icon = 'dots-horizontal';
        break;
    }
    return focused ? (
      <IconButton size={24} color={color.primary.main} icon={icon} />
    ) : (
      <IconButton size={24} icon={icon} color={'rgba(0, 0, 0, 0.54)'} />
    );
  },
});
const TabBarOptions = {
  showLabel: false,
  tabStyle: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
};

const Tab = createBottomTabNavigator();
//{/** tabBar={props => <CustomTabBar {...props} />}>/*}
const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={TabScreenOptions}
      tabBarOptions={TabBarOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      {/* TODO Change route */}
      <Tab.Screen name="RegisterWH" component={RegisterWH} />
      <Tab.Screen
        name="SampleScreen"
        component={SampleScreen}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
};

// 전체 네비게이션 구조를 정의하고, 하위 네비게이션 구조는 별도 파일로 정의한다.
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

let isLogin = true;

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Global>
            {!isLogin ? (
              <AuthStack.Navigator>
                {/* <AuthStack.Screen
                  name="Home"
                  component={TabScreen}
                  options={{ headerShown: false }}
                /> */}
                <AuthStack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <AuthStack.Screen
                  name="ForgotID"
                  component={ForgotIDScreen}
                  options={{ headerShown: false }}
                />
                <AuthStack.Screen
                  name="testScreen"
                  component={TextFeild}
                  options={{ headerShown: false }}
                />
                <AuthStack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />
                <AuthStack.Screen
                  name="Terms"
                  component={Terms}
                  options={{ headerShown: false }}
                />
              </AuthStack.Navigator>
            ) : (
              <RootStack.Navigator>
                <RootStack.Screen
                  name="Home"
                  component={TabScreen}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="Webview"
                  component={WebviewScreen}
                  headerMode={true}
                  options={{ headerShown: true }}
                />
                <RootStack.Screen
                  name="Camera"
                  component={CameraScreen}
                  headerMode={true}
                  options={{ headerShown: true }}
                />
                <RootStack.Screen
                  name="Notification"
                  component={Notification}
                  headerMode={true}
                  options={{ headerShown: true }}
                />
                <RootStack.Screen
                  name="Geolocations"
                  component={Geolocations}
                  headerMode={true}
                  options={{ headerShown: true }}
                />
                <RootStack.Screen
                  name="TextFeild"
                  component={TextFeild}
                  headerMode={true}
                  options={{ headerShown: true }}
                />
                <RootStack.Screen
                  name="testScreen"
                  component={testScreen}
                  headerMode={true}
                  options={{ headerShown: true }}
                />
                <RootStack.Screen
                  name="RegisterWH"
                  component={RegisterWH}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="RegisterImage"
                  component={RegisterImage}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="RegisterInfo"
                  component={RegisterInfo}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="RegisterIntro"
                  component={RegisterIntro}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="RegisterMoreIntro"
                  component={RegisterMoreIntro}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="RegisterInfoFloor"
                  component={RegisterInfoFloor}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="RegisterContractConditions"
                  component={RegisterContractConditions}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="DetailsWH"
                  component={DetailsWH}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="DetailsLocationWH"
                  component={DetailsLocationWH}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="InquiryWH"
                  component={InquiryWH}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="DetailsInquiryWH"
                  component={DetailsInquiryWH}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="CreateInquiryWH"
                  component={CreateInquiryWH}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="Annoucement"
                  component={Annoucement}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen
                  name="DetailAnnoucement"
                  component={DetailAnnoucement}
                  headerMode={false}
                  options={{ headerShown: false }}
                />
              </RootStack.Navigator>
            )}
          </Global>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
