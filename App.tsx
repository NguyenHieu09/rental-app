import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux-toolkit/store';
import LoginScreen from './src/screens/loginScreen/LoginScreen';
import RegisterScreen from './src/screens/registerScreen/RegisterScreen';
import WelcomeScreen from './src/screens/welcomeScreen/WelcomeScreen';
import DashboardOwner from './src/screens/owner/dashBoard/DashBoardOwner';
import DashboardRenter from './src/screens/renter/dashBoard/DashBoardRenter';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Wellcome">
          <Stack.Screen
            name="Wellcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashboardOwner"
            component={DashboardOwner}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashboardRenter"
            component={DashboardRenter}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});