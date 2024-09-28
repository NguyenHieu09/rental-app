import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import PropertyDetail from '../../../components/properties/PropertyDetail';
import { commonStyles } from '../../../styles/theme';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
// import { RootStackParamList } from '../../types/navigation'; // Adjust the import path as needed

const PropertyScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'PropertyScreen'>>();
    const { property } = route.params; // Nhận thông tin property từ route params

    return (
        <View style={commonStyles.container}>
            {/* <Text>{property.title}</Text>
            <Image source={{ uri: property.images[0] }} style={{ width: '100%', height: 300 }} /> */}
            <ScrollView>
                <PropertyDetail
                    property={property} />
            </ScrollView>
        </View>
    );
};

export default PropertyScreen;