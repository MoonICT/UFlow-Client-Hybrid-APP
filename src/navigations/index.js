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
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
// Local Imports
import initStore from '@Store/index';
import HomeScreen from '@Screeens/Home';
import SampleScreen from '@Screeens/Sample';
import WebviewScreen from '@Screeens/Webview';
import CameraScreen from '@Screeens/Camera';
import Notification from '@Screeens/Notification';
import Geolocations from '@Screeens/Geolocations';

const store = initStore();

/**Custom Theme */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

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
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
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
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
