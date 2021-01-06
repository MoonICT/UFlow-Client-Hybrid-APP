/**
 * Root Navigator
 * 분리된 역할의 네비게이터를 병합하여 구성.
 * 2020.06.05 Deokin.
 *
 * @format
 * @flow strict-local
 * */

// Global Imports
import React, { useMemo, useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';

// Local Imports
//---> Screens
import initStore from '@Store/index';
import { AuthContext } from '@Store/context';

import Global from '@Screeens/Global';
import LoginScreen from '@Screeens/Login';
import FindIDScreen from '@Screeens/FindID';
import FindPassWordScreen from '@Screeens/FindPassWord';
import HomeScreen from '@Screeens/Home';
import SearchScreen from '@Screeens/Search';
import SampleScreen from '@Screeens/Sample';
import WebviewScreen from '@Screeens/Webview';
import CameraScreen from '@Screeens/Camera';
import Notification from '@Screeens/Notification';
import Geolocations from '@Screeens/Geolocations';
import TextField from '@Screeens/TextField';
// import testScreen from '@Screeens/testScreen';
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
import FAQ from '@Screeens/FAQ';

import TenantMypage from '@Screeens/TenantMypage';
import QuotationTrust from '@Screeens/TenantMypage/QuotationTrust';
import AvaliableChate from '@Screeens/TenantMypage/AvaliableChate';
import ContractDetails from '@Screeens/TenantMypage/ContractDetails';
import Chatting from '@Screeens/Mypage/Chat';
import DetailsManager from '@Screeens/Mypage/DetailsManager';
import DetailsSettlement from '@Screeens/TenantMypage/DetailsSettlement';

import ProprietorMypage from '@Screeens/ProprietorMypage';

import Quotation from '@Screeens/Mypage/Quotation';
import ResponseQuotation from '@Screeens/Mypage/ResponseQuotation';
import StorageAgreement from '@Screeens/Mypage/StorageAgreement';
import Mypage from '@Screeens/Mypage';
import WithdrawalInformation from '@Screeens/Mypage/WithdrawalInformation';
import ConfirmPass from '@Screeens/Mypage/ConfirmPass';
import MypageInfo from '@Screeens/MypageInfo';
import Information from '@Screeens/Mypage/Information';
import RequestContract from '@Screeens/Mypage/RequestContract';
import More from '@Screeens/More';
import Consulting from '@Screeens/Consulting';
import Question from '@Screeens/Question';
import Inquiry from '@Screeens/Inquiry';
import DetailInquiry from '@Screeens/Inquiry/DetailInquiry';

import LogisticsKnowledge from '@Screeens/LogisticsKnowledge';

import { color } from '@Themes/colors';

//Custom Theme
import { theme } from '../themes';

//Contants
import { TOKEN } from '@Constant';

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
      case 'Mypage':
        icon = 'forum';
        break;
      case 'More':
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
      <Tab.Screen name="Mypage" component={Mypage} />
      <Tab.Screen
        name="More"
        component={More}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
};

// 전체 네비게이션 구조를 정의하고, 하위 네비게이션 구조는 별도 파일로 정의한다.
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(TOKEN).then(v => {
      // console.log('v==>', v);
      setIsLogin(v !== '' && v !== null);
    });
  }, []);

  // console.log('isLogin==>', isLogin);

  const authContext = useMemo(() => {
    return {
      getLoginStatus: () => {
        return isLogin;
      },
      login: () => {
        setIsLoading(true);
        setIsLogin(true);
      },
      signUp: () => {
        setIsLoading(false);
        setIsLogin(false);
      },
      signOut: () => {
        AsyncStorage.removeItem(TOKEN).then(() => {
          setIsLoading(false);
          setIsLogin(false);
        });
      },
    };
  }, []);

  // if (isLoading) return <Splash />;

  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Global>
              {isLogin === true ? (
                <AuthStack.Navigator>
                  <AuthStack.Screen
                    name="Home"
                    component={TabScreen}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Login"
                    component={LoginScreen}
                    headerMode={false}
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
                  <AuthStack.Screen
                    name="Webview"
                    component={WebviewScreen}
                    headerMode={true}
                    options={{ headerShown: true }}
                  />
                  <AuthStack.Screen
                    name="Camera"
                    component={CameraScreen}
                    headerMode={true}
                    options={{ headerShown: true }}
                  />
                  <AuthStack.Screen
                    name="Notification"
                    component={Notification}
                    headerMode={true}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Geolocations"
                    component={Geolocations}
                    headerMode={true}
                    options={{ headerShown: true }}
                  />
                  <AuthStack.Screen
                    name="TextField"
                    component={TextField}
                    headerMode={true}
                    options={{ headerShown: true }}
                  />
                  <AuthStack.Screen
                    name="RegisterWH"
                    component={RegisterWH}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="RegisterImage"
                    component={RegisterImage}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="RegisterInfo"
                    component={RegisterInfo}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="RegisterIntro"
                    component={RegisterIntro}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="RegisterMoreIntro"
                    component={RegisterMoreIntro}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="RegisterInfoFloor"
                    component={RegisterInfoFloor}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="RegisterContractConditions"
                    component={RegisterContractConditions}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="DetailsWH"
                    component={DetailsWH}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="DetailsLocationWH"
                    component={DetailsLocationWH}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="InquiryWH"
                    component={InquiryWH}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="DetailsInquiryWH"
                    component={DetailsInquiryWH}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="CreateInquiryWH"
                    component={CreateInquiryWH}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Annoucement"
                    component={Annoucement}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="DetailAnnoucement"
                    component={DetailAnnoucement}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="FAQ"
                    component={FAQ}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Quotation"
                    component={Quotation}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="QuotationTrust"
                    component={QuotationTrust}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="AvaliableChate"
                    component={AvaliableChate}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="ContractDetails"
                    component={ContractDetails}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="MypageInfo"
                    component={MypageInfo}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="WithdrawalInformation"
                    component={WithdrawalInformation}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="ConfirmPass"
                    component={ConfirmPass}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Inquiry"
                    component={Inquiry}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="DetailInquiry"
                    component={DetailInquiry}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Chatting"
                    component={Chatting}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="StorageAgreement"
                    component={StorageAgreement}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="DetailsManager"
                    component={DetailsManager}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="DetailsSettlement"
                    component={DetailsSettlement}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="ProprietorMypage"
                    component={ProprietorMypage}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="ResponseQuotation"
                    component={ResponseQuotation}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="TenantMypage"
                    component={TenantMypage}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="More"
                    component={More}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />

                  <AuthStack.Screen
                    name="Consulting"
                    component={Consulting}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="SampleScreen"
                    component={SampleScreen}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Question"
                    component={Question}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Mypage"
                    component={Mypage}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="RequestContract"
                    component={RequestContract}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Information"
                    component={Information}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="LogisticsKnowledge"
                    component={LogisticsKnowledge}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                </AuthStack.Navigator>
              ) : (
                <RootStack.Navigator initialRouteName="Home">
                  <RootStack.Screen
                    name="More"
                    component={More}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Home"
                    component={TabScreen}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="FindID"
                    component={FindIDScreen}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="FindPassWord"
                    component={FindPassWordScreen}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Login"
                    component={LoginScreen}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Register"
                    component={Register}
                    headerMode={false}
                    options={{ headerShown: false }}
                  />
                </RootStack.Navigator>
              )}
            </Global>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </AuthContext.Provider>
  );
};

export default App;
