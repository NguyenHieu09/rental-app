import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchIncomeExpenditure } from '../../api/contract';
import { commonStyles } from '../../styles/theme';
import { IIncomeExpenditure } from '../../types/dashboard';

// Get screen width
const screenWidth = Dimensions.get('window').width;

const IncomeExpenditureChart = () => {
    const chartRef = useRef<ScrollView>(null);
    const [data, setData] = useState<IIncomeExpenditure[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchIncomeExpenditure();
                setData(response);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const scrollToMonth = (index: number) => {
        chartRef.current?.scrollTo({
            x: index * (screenWidth / data.length), // Adjust this value based on actual spacing
            animated: true,
        });
    };

    if (loading) {
        return <ActivityIndicator size='large' color='#0000ff' />;
    }

    if (error) {
        return (
            <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        );
    }

    // Prepare data for the chart
    const incomeLineData = data.map((item) => ({
        value: item.income,
        label: `Thg ${item.month}`,
    }));

    const expenditureLineData = data.map((item) => ({
        value: item.expenditure,
        label: `Thg ${item.month}`,
    }));

    const netIncomeLineData = data.map((item) => ({
        value: item.income - item.expenditure,
        label: `Thg ${item.month}`,
    }));

    const formatYAxisLabel = (value: number) => {
        if (value >= 1000000000 || value <= -1000000000) {
            return `${(value / 1000000000).toFixed(1)} Tỷ`; // Convert to billions
        } else if (value >= 1000000 || value <= -1000000) {
            return `${(value / 1000000).toFixed(1)} Tr`; // Convert to millions
        }
        return `${value}`; // Show raw value for smaller numbers
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={{ paddingHorizontal: 5 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    Biến động thu nhập theo tháng/2024
                </Text>

                {/* Month selection buttons */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginVertical: 30 }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                        }}
                    >
                        {data.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => scrollToMonth(index)}
                                style={{
                                    padding: 8,
                                    marginHorizontal: 4,
                                    backgroundColor: '#007BFF',
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{ color: 'white', fontSize: 14 }}
                                >{`Thg ${item.month}`}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <ScrollView
                    ref={chartRef}
                    horizontal
                    contentContainerStyle={{ width: screenWidth * 2 }} // Adjust width to allow horizontal scrolling
                    showsHorizontalScrollIndicator={false}
                >
                    <View
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            overflow: 'hidden', // This ensures the border radius works correctly
                        }}
                    >
                        <LineChart
                            data={incomeLineData}
                            data2={expenditureLineData}
                            data3={netIncomeLineData}
                            width={screenWidth * 2 - 40} // Adjust width to allow horizontal scrolling
                            height={300} // Increase height to provide more space for x-axis labels
                            noOfSections={4}
                            // stepValue={350000000}
                            showYAxisIndices={true}
                            isAnimated
                            // yAxisLabelTexts={[
                            //     formatYAxisLabel(-350000000),
                            //     formatYAxisLabel(0),
                            //     formatYAxisLabel(350000000),
                            //     formatYAxisLabel(700000000),
                            //     formatYAxisLabel(1050000000),
                            // ]}
                            xAxisLabelTexts={data.map(
                                (item) => `Thg ${item.month}`,
                            )}
                            color1='#2a9d90' // Income color
                            color2='#e76e50' // Expenditure color
                            color3='#2563eb' // Net income color
                            thickness={2}
                            hideDataPoints={false}
                            curved
                            yAxisLabelWidth={60}
                            adjustToWidth={true}
                            yAxisTextStyle={{
                                fontSize: 12,
                                textAlign: 'center',
                            }}
                            // yAxisOffset={-350000000}
                            initialSpacing={10}
                            spacing={100} // Adjust spacing between data points
                            animateOnDataChange
                            xAxisLabelTextStyle={{
                                fontSize: 12,
                                textAlign: 'center',
                                width: 120, // Reduce width of the labels
                                // transform: [{ rotate: '45deg' }], // Rotate labels to avoid overlap
                            }}
                        />
                    </View>
                </ScrollView>

                {/* Legend */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 10,
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                    >
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: '#2a9d90',
                                marginRight: 5,
                            }}
                        />
                        <Text>Tổng thu</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                    >
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: '#e76e50',
                                marginRight: 5,
                            }}
                        />
                        <Text>Tổng chi</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                    >
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: '#2563eb',
                                marginRight: 5,
                            }}
                        />
                        <Text>Thu nhập ròng</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default IncomeExpenditureChart;
