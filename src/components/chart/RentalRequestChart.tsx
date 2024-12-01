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
import {
    fetchContractCancellationRate,
    fetchRentalRequestRating,
} from '../../api/contract';
import { commonStyles } from '../../styles/theme';
import {
    IGetContractCancellationRateByOwner,
    IGetRentalRequestRatingByOwner,
} from '../../types/dashboard';

// // Sample data
// const requestData = [
//     { month: 10, year: 2024, APPROVED: 24, PENDING: 1, REJECTED: 2 },
//     { month: 11, year: 2024, APPROVED: 6, PENDING: 0, REJECTED: 3 },
// ];

// const contractData = [
//     { month: 10, year: 2024, count: 36 },
//     { month: 11, year: 2024, count: 2 },
// ];

// // Combine data
// const combinedData = requestData.map(request => {
//     const contract = contractData.find(c => c.month === request.month && c.year === request.year);
//     return {
//         month: request.month,
//         year: request.year,
//         APPROVED: request.APPROVED,
//         REJECTED: request.REJECTED,
//         CANCELED: contract ? contract.count : 0,
//     };
// });

// // Prepare data for the chart
// const approvedLineData = combinedData.map(item => ({
//     value: item.APPROVED,
//     label: `Thg ${item.month}`,
// }));

// const rejectedLineData = combinedData.map(item => ({
//     value: item.REJECTED,
//     label: `Thg ${item.month}`,
// }));

// const canceledLineData = combinedData.map(item => ({
//     value: item.CANCELED,
//     label: `Thg ${item.month}`,
// }));

// Get screen width
const screenWidth = Dimensions.get('window').width;

const RentalRequestChart = () => {
    const [requestData, setRequestData] = useState<
        IGetRentalRequestRatingByOwner[]
    >([]);
    const [contractData, setContractData] = useState<
        IGetContractCancellationRateByOwner[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const chartRef = useRef<ScrollView>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const requestResponse = await fetchRentalRequestRating();
                const contractResponse = await fetchContractCancellationRate();
                setRequestData(requestResponse);
                setContractData(contractResponse);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Combine data
    const combinedData = requestData.map((request) => {
        const contract = contractData.find(
            (c) => c.month === request.month && c.year === request.year,
        );
        return {
            month: request.month,
            year: request.year,
            APPROVED: request.APPROVED,
            REJECTED: request.REJECTED,
            CANCELED: contract ? contract.count : 0,
        };
    });

    // Prepare data for the chart
    const approvedLineData = combinedData.map((item) => ({
        value: item.APPROVED,
        label: `Thg ${item.month}`,
    }));

    const rejectedLineData = combinedData.map((item) => ({
        value: item.REJECTED,
        label: `Thg ${item.month}`,
    }));

    const canceledLineData = combinedData.map((item) => ({
        value: item.CANCELED,
        label: `Thg ${item.month}`,
    }));

    if (loading) {
        return <ActivityIndicator size='large' color='#0000ff' />;
    }

    if (error) {
        return (
            <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        );
    }

    const scrollToMonth = (index: number) => {
        chartRef.current?.scrollTo({
            x: index * (screenWidth / combinedData.length), // Adjust this value based on actual spacing
            animated: true,
        });
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
                    Yêu cầu thuê nhà
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
                        {combinedData.map((item, index) => (
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
                    contentContainerStyle={{ width: screenWidth * 3 }} // Adjust width to allow horizontal scrolling
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
                            data={approvedLineData}
                            data2={rejectedLineData}
                            data3={canceledLineData}
                            width={screenWidth * 2 - 40} // Adjust width to allow horizontal scrolling
                            height={300} // Increase height to provide more space for x-axis labels
                            noOfSections={4}
                            // stepValue={10}
                            showYAxisIndices={true}
                            isAnimated
                            xAxisLabelTexts={combinedData.map(
                                (item) => `Thg ${item.month}`,
                            )}
                            color1='#2a9d90' // Approved color
                            color2='#e76e50' // Rejected color
                            color3='#2563eb' // Canceled color
                            thickness={2}
                            hideDataPoints={false}
                            curved
                            yAxisLabelWidth={30}
                            adjustToWidth={true}
                            yAxisTextStyle={{
                                fontSize: 12,
                                textAlign: 'center',
                            }}
                            initialSpacing={20}
                            spacing={125} // Adjust spacing between data points
                            animateOnDataChange
                            xAxisLabelTextStyle={{
                                fontSize: 12,
                                textAlign: 'center',
                                width: 140, // Reduce width of the labels
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
                        <Text>Phê duyệt</Text>
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
                        <Text>Từ chối</Text>
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
                        <Text>Hợp đồng bị hủy</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RentalRequestChart;
