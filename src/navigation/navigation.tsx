// import React, { useEffect, useState } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { ActivityIndicator, TouchableOpacity } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { checkLoginStatus } from '../redux-toolkit/slices/userSlice';
// import { AppDispatch, RootState } from '../redux-toolkit/store';
// import LoginScreen from '../screens/loginScreen/LoginScreen';
// import RegisterScreen from '../screens/registerScreen/RegisterScreen';
// import WelcomeScreen from '../screens/welcomeScreen/WelcomeScreen';
// import DashboardOwner from '../screens/owner/dashBoard/DashBoardOwner';
// import RenterTabs from './RenterTabs';
// import PropertyScreen from '../screens/renter/PropertyScreen/PropertyScreen';
// import { IconOutline } from '@ant-design/icons-react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import OwnerTabs from './OwnerTabs';
// import ManageProperty from '../screens/owner/property/ManageProperty';
// import ManageRequestRental from '../screens/owner/ManageRequestRental/ManageRequestRental';
// import ContractScreen from '../screens/owner/Contract/ContractScreen ';
// import WalletManagement from './WalletManagement';
// import ManageContract from '../screens/owner/manageContract/ManageContract';
// import PaymentScreen from '../screens/renter/payment/PaymentScreen';
// import ContractDetails from '../screens/contractDetails/ContractDetails';
// import AuthenticationScreen from '../screens/authentication/AuthenticationScreen';
// import ManageCancelContract from '../screens/cancelContract/ManageCancelContract';
// import ChatDetail from '../components/chat/ChatDetail';
// // import PropertyDetail from '../screens/renter/PropertyScreen/PropertyDetail';

// const Stack = createStackNavigator();

// const Navigation: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { user, loading } = useSelector((state: RootState) => state.user);
//     const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
//     const [isBookmarked, setIsBookmarked] = useState(false);

//     useEffect(() => {
//         const checkFirstLaunch = async () => {
//             const hasLaunched = await AsyncStorage.getItem('hasLaunched');
//             if (hasLaunched === null) {
//                 await AsyncStorage.setItem('hasLaunched', 'true');
//                 setIsFirstLaunch(true);
//             } else {
//                 setIsFirstLaunch(false);
//             }
//         };

//         const checkLogin = async () => {
//             const email = await AsyncStorage.getItem('email');
//             if (email) {
//                 dispatch(checkLoginStatus());
//             }
//         };

//         checkFirstLaunch();
//         checkLogin();
//     }, [dispatch]);

//     if (isFirstLaunch === null || loading) {
//         return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
//     }

//     // Hàm để thay đổi trạng thái khi click
//     const toggleBookmark = () => {
//         setIsBookmarked(!isBookmarked);
//     };

//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName={isFirstLaunch ? "Welcome" : user ? (user.userTypes.includes('owner') ? "DashboardOwner" : "RenterTabs") : "Login"}>
//                 {isFirstLaunch && (
//                     <Stack.Screen
//                         name="Welcome"
//                         component={WelcomeScreen}
//                         options={{ headerShown: false }}
//                     />
//                 )}
//                 <Stack.Screen
//                     name="Login"
//                     component={LoginScreen}
//                     options={{ headerShown: false }}
//                 />
//                 <Stack.Screen
//                     name="Register"
//                     component={RegisterScreen}
//                     options={{ headerShown: false }}
//                 />

//                 <Stack.Screen name="RenterTabs" component={RenterTabs} options={{ headerShown: false }} />
//                 <Stack.Screen name="OwnerTabs" component={OwnerTabs} options={{ headerShown: false }} />

//                 <Stack.Screen name="PropertyScreen" component={PropertyScreen} options={{
//                     title: 'Thông tin bất động sản',
//                     headerTitleStyle: {
//                         fontWeight: 500,
//                         fontSize: 20,
//                         color: '#333', // Custom color
//                     },
//                     headerStyle: {
//                         // backgroundColor: '#f8f8f8', // Custom background color
//                     },
//                     headerRight: () => (
//                         <TouchableOpacity onPress={toggleBookmark} style={{ marginRight: 16 }}>
//                             <FontAwesome
//                                 name={isBookmarked ? "bookmark" : "bookmark-o"}  // bookmark-o là biểu tượng outline, bookmark là fill
//                                 size={30}
//                                 color={isBookmarked ? "blue" : "black"} // Đổi màu nếu được chọn
//                             />
//                         </TouchableOpacity>
//                     ),
//                 }} />

//                 <Stack.Screen name="ManageProperty" component={ManageProperty}
//                     options={{ title: 'Tài Sản Của Tôi' }}
//                 />
//                 <Stack.Screen name="ManageRequestRental" component={ManageRequestRental}
//                     options={{ title: 'Yêu cầu thuê nhà' }}
//                 />
//                 <Stack.Screen name="ContractScreen" component={ContractScreen}
//                     options={{ title: 'Tạo hợp đồng' }}
//                 />
//                 <Stack.Screen name="WalletManagement" component={WalletManagement}
//                     options={{ title: 'Quản lý ví' }}
//                 />

//                 <Stack.Screen name="ManageContract" component={ManageContract}
//                     options={{ title: 'Hợp đồng thuê nhà' }}
//                 />

//                 <Stack.Screen name="PaymentScreen" component={PaymentScreen}
//                     options={{ title: 'Thanh toán hóa đơn' }}
//                 />
//                 <Stack.Screen name="ContractDetails" component={ContractDetails}
//                     options={{ title: 'Chi tiết hợp đồng' }}
//                 />
//                 <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen}
//                     options={{ title: 'Xác thực tài khoản' }}
//                 />
//                 <Stack.Screen name="ManageCancelContract" component={ManageCancelContract}
//                     options={{ title: 'Yêu cầu hủy hợp đồng' }}
//                 />
//                 <Stack.Screen name="ChatDetail" component={ChatDetail}
//                     options={{ title: '' }}
//                 />


//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// };

// export default Navigation;


import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OwnerTabs from './OwnerTabs';
import ManageProperty from '../screens/owner/property/ManageProperty';
import ManageRequestRental from '../screens/owner/ManageRequestRental/ManageRequestRental';
import WalletManagement from './WalletManagement';
import ManageContract from '../screens/owner/manageContract/ManageContract';
import PaymentScreen from '../screens/renter/payment/PaymentScreen';
import ContractDetails from '../screens/contractDetails/ContractDetails';
import AuthenticationScreen from '../screens/authentication/AuthenticationScreen';
import ManageCancelContract from '../screens/cancelContract/ManageCancelContract';
import ChatDetail from '../components/chat/ChatDetail';
import ContractScreen from '../screens/owner/Contract/ContractScreen ';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import Transactions from '../components/transactions/Transactions';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.user);
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Kiểm tra lần đầu mở ứng dụng
                const hasLaunched = await AsyncStorage.getItem('hasLaunched');
                if (hasLaunched === null) {
                    await AsyncStorage.setItem('hasLaunched', 'true');
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }

                // Kiểm tra trạng thái đăng nhập
                const email = await AsyncStorage.getItem('email');
                if (email) {
                    dispatch(checkLoginStatus());
                }
            } catch (error) {
                console.error("Lỗi khi khởi tạo ứng dụng:", error);
            }
        };

        initializeApp();
    }, [dispatch]);

    if (isFirstLaunch === null || loading) {
        return (
            <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            />
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={
                    isFirstLaunch
                        ? "Welcome"
                        : user
                            ? (user.userTypes.includes('owner') ? "DashboardOwner" : "RenterTabs")
                            : "Login"
                }
            >
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
                <Stack.Screen name="RenterTabs" component={RenterTabs} options={{ headerShown: false }} />
                <Stack.Screen name="OwnerTabs" component={OwnerTabs} options={{ headerShown: false }} />
                <Stack.Screen
                    name="PropertyScreen"
                    component={PropertyScreen}
                    options={{
                        title: 'Thông tin bất động sản',
                        headerTitleStyle: {
                            fontWeight: '500',
                            fontSize: 20,
                            color: '#333',
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)} style={{ marginRight: 16 }}>
                                <FontAwesome
                                    name={isBookmarked ? "bookmark" : "bookmark-o"}
                                    size={30}
                                    color={isBookmarked ? "blue" : "black"}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen name="ManageProperty" component={ManageProperty} options={{ title: 'Tài Sản Của Tôi' }} />
                <Stack.Screen name="ManageRequestRental" component={ManageRequestRental} options={{ title: 'Yêu cầu thuê nhà' }} />
                <Stack.Screen name="ContractScreen" component={ContractScreen} options={{ title: 'Tạo hợp đồng' }} />
                <Stack.Screen name="WalletManagement" component={WalletManagement} options={{ title: 'Quản lý ví' }} />
                <Stack.Screen name="ManageContract" component={ManageContract} options={{ title: 'Hợp đồng thuê nhà' }} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Thanh toán hóa đơn' }} />
                <Stack.Screen name="ContractDetails" component={ContractDetails} options={{ title: 'Chi tiết hợp đồng' }} />
                <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen} options={{ title: 'Xác thực tài khoản' }} />
                <Stack.Screen name="ManageCancelContract" component={ManageCancelContract} options={{ title: 'Yêu cầu hủy hợp đồng' }} />
                <Stack.Screen name="ChatDetail" component={ChatDetail} options={{ title: '' }} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: true }} />
                <Stack.Screen
                    name="Transactions"
                    component={Transactions}
                    options={{ title: 'Lịch sử giao dịch' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
