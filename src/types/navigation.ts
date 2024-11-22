import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IProperty } from './property';
import { IRentalRequest } from './rentalRequest';
import { IUser } from './user';
import { IConversation } from './chat';


export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    DashboardOwner: undefined;
    DashboardRenter: undefined;
    RenterTabs: undefined;
    OwnerTabs: undefined;
    PropertyScreen: { slug: string };
    ManageProperty: undefined;
    // ManageProperty: { properties: IProperty[] };
    ManageRequestRental: undefined;
    ContractScreen: { contractData: any, requestId: string };
    WalletManagement: undefined;
    Transactions: undefined;
    Wallet: { user: IUser };
    ManageContract: undefined;
    PaymentScreen: undefined;
    ContractDetails: { contractId: string };
    AuthenticationScreen: undefined;
    ManageCancelContract: undefined;
    ExploreScreen: { city?: string };
    PropertyDetail: { slug: string };
    ChatDetail: undefined;
    NotificationScreen: undefined;
    ChatBotScreen: undefined;
    StatisticsScreen: undefined;

};
