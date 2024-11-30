import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import ChatDetail from '../components/chat/ChatDetail';
import PersonalInfo from '../components/profile/PersonalInfo';
import UpdatePassword from '../components/profile/UpdatePassword';
import PropertyDetail from '../components/properties/PropertyDetail';
import Transactions from '../components/transactions/Transactions';
import { checkLoginStatus } from '../redux-toolkit/slices/userSlice';
import { AppDispatch, RootState } from '../redux-toolkit/store';
import AccountInfo from '../screens/accountInfo/AccountInfo';
import AuthenticationScreen from '../screens/authentication/AuthenticationScreen';
import ManageCancelContract from '../screens/cancelContract/ManageCancelContract';
import ContractDetails from '../screens/contractDetails/ContractDetails';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import ContractScreen from '../screens/owner/Contract/ContractScreen ';
import ManageContract from '../screens/owner/manageContract/ManageContract';
import ManageRequestRental from '../screens/owner/ManageRequestRental/ManageRequestRental';
import ManageProperty from '../screens/owner/property/ManageProperty';
import RegisterScreen from '../screens/registerScreen/RegisterScreen';
import PaymentScreen from '../screens/renter/payment/PaymentScreen';
import PropertyScreen from '../screens/renter/PropertyScreen/PropertyScreen';
import WelcomeScreen from '../screens/welcomeScreen/WelcomeScreen';
import OwnerTabs from './OwnerTabs';
import RenterTabs from './RenterTabs';
import WalletManagement from './WalletManagement';
import EditPropertyScreen from '../screens/editProperty/EditProperty';
import CreateContractScreen from '../screens/owner/createContract/CreateContractScreen';
import MyReport from '../screens/report/MyReport';
import ReportManagement from '../screens/owner/reportManagement/ReportManagement';
import ReportDetails from '../screens/reportDetails/ReportDetails';
import AddReport from '../screens/renter/addReport/AddReport';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.user);
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            let isFirstLaunch = false;

            try {
                // Kiểm tra lần đầu mở ứng dụng
                const hasLaunched = await AsyncStorage.getItem('hasLaunched');
                if (hasLaunched === null) {
                    await AsyncStorage.setItem('hasLaunched', 'true');
                    isFirstLaunch = true;
                }

                // Kiểm tra trạng thái đăng nhập
                const email = await AsyncStorage.getItem('email');
                if (email) {
                    dispatch(checkLoginStatus());
                }
            } catch (error) {
                console.error('Lỗi khi khởi tạo ứng dụng:', error);
            } finally {
                setIsFirstLaunch(isFirstLaunch);
            }
        };

        initializeApp();
    }, [dispatch]);

    if (isFirstLaunch === null) {
        return (
            <ActivityIndicator
                size='large'
                color='#0000ff'
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={
                    isFirstLaunch
                        ? 'Welcome'
                        : user
                            ? user.userTypes.includes('owner')
                                ? 'DashboardOwner'
                                : 'RenterTabs'
                            : 'Login'
                }
            >
                {isFirstLaunch && (
                    <Stack.Screen
                        name='Welcome'
                        component={WelcomeScreen}
                        options={{ headerShown: false }}
                    />
                )}
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Register'
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='RenterTabs'
                    component={RenterTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='OwnerTabs'
                    component={OwnerTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='PropertyScreen'
                    component={PropertyScreen}
                    options={{
                        title: 'Thông tin bất động sản',
                        headerTitleStyle: {
                            fontWeight: '500',
                            fontSize: 20,
                            color: '#333',
                        },

                    }}
                />
                <Stack.Screen
                    name='ManageProperty'
                    component={ManageProperty}
                    options={{ title: 'Bất động sản' }}
                />
                <Stack.Screen
                    name='ManageRequestRental'
                    component={ManageRequestRental}
                    options={{ title: 'Yêu cầu thuê nhà' }}
                />
                <Stack.Screen
                    name='ContractScreen'
                    component={ContractScreen}
                    options={{ title: 'Tạo hợp đồng' }}
                />
                <Stack.Screen
                    name='WalletManagement'
                    component={WalletManagement}
                    options={{ title: 'Quản lý ví' }}
                />
                <Stack.Screen
                    name='ManageContract'
                    component={ManageContract}
                    options={{ title: 'Quản lý hợp đồng' }}
                />
                <Stack.Screen
                    name='PaymentScreen'
                    component={PaymentScreen}
                    options={{ title: 'Thanh toán hóa đơn' }}
                />
                <Stack.Screen
                    name='ContractDetails'
                    component={ContractDetails}
                    options={{ title: 'Chi tiết hợp đồng' }}
                />
                <Stack.Screen
                    name='AuthenticationScreen'
                    component={AuthenticationScreen}
                    options={{ title: 'Xác thực tài khoản' }}
                />
                <Stack.Screen
                    name='ManageCancelContract'
                    component={ManageCancelContract}
                    options={{ title: 'Yêu cầu hủy hợp đồng' }}
                />
                <Stack.Screen
                    name='ChatDetail'
                    component={ChatDetail}
                    options={{ title: '' }}
                />
                <Stack.Screen
                    name='NotificationScreen'
                    component={NotificationScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name='Transactions'
                    component={Transactions}
                    options={{ title: 'Lịch sử giao dịch' }}
                />

                <Stack.Screen
                    name='PropertyDetail'
                    component={PropertyDetail}
                    options={{
                        title: 'Thông tin bất động sản',
                        headerTitleStyle: {
                            fontWeight: '500',
                            fontSize: 20,
                            color: '#333',
                        },

                    }}
                />
                <Stack.Screen
                    name='AccountInfo'
                    component={AccountInfo}
                    options={{ title: 'Tài khoản và bảo mật' }}
                />
                <Stack.Screen
                    name='UpdatePassword'
                    component={UpdatePassword}
                    options={{ title: 'Tài khoản và bảo mật' }}
                />
                <Stack.Screen
                    name='PersonalInfo'
                    component={PersonalInfo}
                    options={{ title: 'Tài khoản và bảo mật' }}
                />

                <Stack.Screen
                    name='EditPropertyScreen'
                    component={EditPropertyScreen}
                    options={{
                        title: 'Cập nhật thông tin',
                    }}

                />

                <Stack.Screen
                    name='CreateContractScreen'
                    component={CreateContractScreen}
                    options={{
                        title: 'Tạo hợp đồng',
                    }}

                />

                <Stack.Screen
                    name='ReportManagement'
                    component={ReportManagement}
                    options={{
                        title: 'Quản lý báo cáo',
                    }}

                />

                <Stack.Screen
                    name='MyReport'
                    component={MyReport}
                    options={{
                        title: 'Báo cáo của tôi',
                    }}

                />

                <Stack.Screen
                    name='ReportDetails'
                    component={ReportDetails}
                    options={{
                        title: 'Chi tiết báo cáo',
                    }}

                />

                <Stack.Screen name="AddReport" component={AddReport} options={{ title: 'Thêm báo cáo sự cố & vi phạm' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
