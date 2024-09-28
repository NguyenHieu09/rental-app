import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type Address = {
    street: string;
    ward: string;
    district: string;
    city: string;
};

export type Property = {
    slug: string;
    images: string[];
    title: string;
    address: Address;
    price: number;
};
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    DashboardOwner: undefined;
    DashboardRenter: undefined;
    RenterTabs: undefined;
    PropertyScreen: { property: Property };
};

type PropertyDetailRouteProp = RouteProp<RootStackParamList, 'PropertyScreen'>;
type PropertyDetailNavigationProp = StackNavigationProp<RootStackParamList, 'PropertyScreen'>;

export type PropertyDetailProps = {
    route: PropertyDetailRouteProp;
    // navigation: PropertyDetailNavigationProp;
};