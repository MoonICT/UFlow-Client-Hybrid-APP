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
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
// Local Imports
//---> Screens
import initStore from '@Store/index';

import Global from '@Screeens/Global';
import LoginScreen from '@Screeens/Login';
import ForgotIDScreen from '@Screeens/ForgotID';
import ForgotPassScreen from '@Screeens/ForgotPass';
import HomeScreen from '@Screeens/Home';
import SampleScreen from '@Screeens/Sample';
import WebviewScreen from '@Screeens/Webview';
import CameraScreen from '@Screeens/Camera';
import Notification from '@Screeens/Notification';
import Geolocations from '@Screeens/Geolocations';
import TextFeild from '@Screeens/TextField';
import Pagination from '@Screeens/Pagination';
import Rating from '@Screeens/Rating';
import Progress from '@Screeens/Progress';
import Dialog from '@Screeens/Dialog';
import SnackBar from '@Screeens/SnackBar';
import Slider from '@Screeens/Slider';
import Switch from '@Screeens/Switch';
import AppBar from '@Screeens/AppBar';
import ToggleButton from '@Screeens/ToggleButton';
import Breadcrumb from '@Screeens/Breadcrumb';

//Custom Theme
import {theme} from '../themes';

const store = initStore();

// 메인 탭 옵션 설정.(Sample)
const TabScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    const routeName = route.name;
    console.log(routeName);
    let icon = '▲';

    if (routeName === 'Home') {
      icon = '⛺';
    } else if (routeName === 'Sample') {
      icon = '🛠';
    }
    return (
      <Text style={{color: (focused && '#46c3ad') || '#888'}}>{icon}</Text>
    );
  },
  tabBarOptions: {
    activeTintColor: '#46c3ad',
    inactiveTintColor: '#888',
  },
});

const Tab = createBottomTabNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sample" component={SampleScreen} />
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
                <AuthStack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{headerShown: false}}
                />
                <AuthStack.Screen
                  name="Home"
                  component={TabScreen}
                  options={{headerShown: false}}
                />
                <AuthStack.Screen
                  name="ForgotID"
                  component={ForgotIDScreen}
                  options={{headerShown: false}}
                />
                <AuthStack.Screen
                  name="TextFeild"
                  component={TextFeild}
                  options={{headerShown: false}}
                />
              </AuthStack.Navigator>
            ) : (
              <RootStack.Navigator>
                <RootStack.Screen
                  name="Home"
                  component={TabScreen}
                  options={{headerShown: false}}
                />
                <RootStack.Screen
                  name="Webview"
                  component={WebviewScreen}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Camera"
                  component={CameraScreen}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Notification"
                  component={Notification}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Geolocations"
                  component={Geolocations}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="TextFeild"
                  component={TextFeild}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Pagination"
                  component={Pagination}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Rating"
                  component={Rating}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Progress"
                  component={Progress}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Dialog"
                  component={Dialog}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="SnackBar"
                  component={SnackBar}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Slider"
                  component={Slider}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Switch"
                  component={Switch}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="AppBar"
                  component={AppBar}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="ToggleButton"
                  component={ToggleButton}
                  headerMode={true}
                  options={{headerShown: true}}
                />
                <RootStack.Screen
                  name="Breadcrumb"
                  component={Breadcrumb}
                  headerMode={true}
                  options={{headerShown: true}}
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
