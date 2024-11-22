import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomeExpenditureChart from '../../../components/chart/IncomeExpenditureChart';
import RentalRequestChart from '../../../components/chart/RentalRequestChart';

const Tab = createMaterialTopTabNavigator();

const StatisticsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator>
                <Tab.Screen name="Doanh thu" component={IncomeExpenditureChart} />
                <Tab.Screen name="Yêu cầu thuê" component={RentalRequestChart} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default StatisticsScreen;