import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from './src/redux-toolkit/store';
import LoginScreen from './src/screens/loginScreen/LoginScreen';
import RegisterScreen from './src/screens/registerScreen/RegisterScreen';
import WelcomeScreen from './src/screens/welcomeScreen/WelcomeScreen';
import DashboardOwner from './src/screens/owner/dashBoard/DashBoardOwner';
import DashboardRenter from './src/screens/renter/dashBoard/DashBoardRenter';
import { useEffect, useState } from 'react';
import { checkLoginStatus } from './src/redux-toolkit/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  });

  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
    dispatch(checkLoginStatus());
  }, [dispatch]);

  if (!fontsLoaded || isFirstLaunch === null || loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isFirstLaunch ? "Wellcome" : user ? (user.userTypes.includes('owner') ? "DashboardOwner" : "DashboardRenter") : "Login"}>
        {isFirstLaunch && (
          <Stack.Screen
            name="Wellcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
        )}
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
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
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