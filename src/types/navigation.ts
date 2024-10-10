import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IProperty } from './property';
import { IRentalRequest } from './rentalRequest';
import { IUser } from './user';

// export type Address = {
//     street: string;
//     ward: string;
//     district: string;
//     city: string;
// };

// export type RentalCondition = {
//     type: string;
//     value: string;
// };


// export interface Property {
//     propertyId: string;
//     slug: string;
//     images: string[];
//     title: string;
//     address: Address;
//     price: number;
//     description: string;
//     rentalConditions: RentalCondition[];
//     status: string;
//     createdAt: string;
//     updatedAt: string;
//     deposit: number;
//     minDuration: number;
//     owner: {
//         userId: string;
//         name: string;
//         avatar: string | null;
//         email: string;
//         phoneNumber: string | null;
//     };
//     type: {
//         id: string;
//         name: string;
//     };
//     attributes: {
//         name: string;
//         type: string;
//     }[];
// };

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    DashboardOwner: undefined;
    DashboardRenter: undefined;
    RenterTabs: undefined;
    OwnerTabs: undefined;
    PropertyScreen: { property: IProperty };
    ManageProperty: { properties: IProperty[] };
    ManageRequestRental: undefined;
    ContractScreen: { contractData: any, requestId: string };
    WalletManagement: undefined;
    Transactions: { user: IUser };
    Wallet: { user: IUser };
    ManageContract: undefined;
    PaymentScreen: undefined;
};

type PropertyDetailRouteProp = RouteProp<RootStackParamList, 'PropertyScreen'>;
// type PropertyDetailNavigationProp = StackNavigationProp<RootStackParamList, 'PropertyScreen'>;

export type PropertyDetailProps = {
    route: PropertyDetailRouteProp;
    // navigation: PropertyDetailNavigationProp;
};