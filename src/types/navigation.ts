import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type Address = {
    street: string;
    ward: string;
    district: string;
    city: string;
};

export type RentalCondition = {
    type: string;
    value: string;
};

export type Property = {
    propertyId: string;
    slug: string;
    images: string[];
    title: string;
    address: Address;
    price: number;
    description: string;
    rentalConditions: RentalCondition[];
    status: string;
    createdAt: string;
    updatedAt: string;
    deposit: number;
    minDuration: number;
    owner: {
        userId: string;
        name: string;
        avatar: string | null;
        email: string;
        phoneNumber: string | null;
    };
    type: {
        id: string;
        name: string;
    };
    attributes: {
        name: string;
        type: string;
    }[];
};

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    DashboardOwner: undefined;
    DashboardRenter: undefined;
    RenterTabs: undefined;
    OwnerTabs: undefined;
    PropertyScreen: { property: Property };
    ManageProperty: undefined;
};

type PropertyDetailRouteProp = RouteProp<RootStackParamList, 'PropertyScreen'>;
type PropertyDetailNavigationProp = StackNavigationProp<RootStackParamList, 'PropertyScreen'>;

export type PropertyDetailProps = {
    route: PropertyDetailRouteProp;
    // navigation: PropertyDetailNavigationProp;
};