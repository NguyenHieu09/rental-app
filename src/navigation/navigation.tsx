// navigation.tsx
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkLoginStatus } from '../redux-toolkit/slices/userSlice';
import { AppDispatch, RootState } from '../redux-toolkit/store';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import RegisterScreen from '../screens/registerScreen/RegisterScreen';
import WelcomeScreen from '../screens/welcomeScreen/WelcomeScreen';
import DashboardOwner from '../screens/owner/dashBoard/DashBoardOwner';
import RenterTabs from './RenterTabs';
import PropertyScreen from '../screens/renter/PropertyScreen/PropertyScreen';
// import PropertyDetail from '../screens/renter/PropertyScreen/PropertyDetail';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
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

    if (isFirstLaunch === null || loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isFirstLaunch ? "Welcome" : user ? (user.userTypes.includes('owner') ? "DashboardOwner" : "RenterTabs") : "Login"}>
                {isFirstLaunch && (
                    <Stack.Screen
                        name="Welcome"
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
                <Stack.Screen name="RenterTabs" component={RenterTabs} options={{ headerShown: false }} />

                <Stack.Screen name="PropertyScreen" component={PropertyScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;