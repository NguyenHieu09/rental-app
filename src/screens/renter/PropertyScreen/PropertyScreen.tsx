import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import PropertyDetail from '../../../components/properties/PropertyDetail';
import { commonStyles } from '../../../styles/theme';

const PropertyScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'PropertyScreen'>>();
    const { property } = route.params;

    return (
        <View style={commonStyles.container}>
            <ScrollView>
                <PropertyDetail
                    property={property}
                />
            </ScrollView>
        </View>
    );
};

export default PropertyScreen;