import {
    NavigationProp,
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import {
    fetchNewestProperties,
    suggestPropertiesService,
} from '../../../api/api';
import CustomButton from '../../../components/customButton/CustomButton';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
import Properties from '../../../components/properties/Properties';
import PropertyCard from '../../../components/propertyCard/PropertyCard';
import { RootState } from '../../../redux-toolkit/store';
import { COLORS, commonStyles } from '../../../styles/theme';
import { RootStackParamList } from '../../../types/navigation';
import { IProperty } from '../../../types/property';

const HomeScreen: React.FC = () => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [nearbyProperties, setNearbyProperties] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState<string>('TP. Hồ Chí Minh');
    const [district, setDistrict] = useState<string>('');
    const ITEMS_PER_PAGE = 10;
    const user = useSelector((state: RootState) => state.user.user);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [suggestProperties, setSuggestProperties] = useState<IProperty[]>([]);

    // useEffect(() => {
    //     const initialize = async () => {
    //         console.log('Component mounted, loading properties');
    //         await new Promise((res, rej) => {
    //             getLocation()
    //                 .then(res)
    //                 .then(() => res('Error'));
    //             setTimeout(() => res('Timeout'), 3000);
    //         });
    //         console.log('Component mounted, loading properties');
    //     };

    //     initialize();
    // }, [city, district]);

    useFocusEffect(
        useCallback(() => {
            const refreshScreen = async () => {
                await loadProperties(city, district);
            };

            refreshScreen();
        }, [city, district]),
    );

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        let reverseGeocode = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });
        if (reverseGeocode.length > 0) {
            const { formattedAddress } = reverseGeocode[0];
            if (formattedAddress) {
                const addressParts = formattedAddress
                    .split(',')
                    .map((part) => part.trim());
                const city = addressParts[addressParts.length - 2] || '';
                const district = addressParts[addressParts.length - 3] || '';
                console.log('Extracted City:', city);
                console.log('Extracted District:', district);

                setCity(city);
                setDistrict(district);
                loadProperties(city, district);
                return;
            } else {
            }
        } else {
        }

        loadProperties();
    };

    const loadProperties = async (city?: string, district?: string) => {
        try {
            setLoading(true);

            const queries = [
                fetchNewestProperties(ITEMS_PER_PAGE, 0),
                suggestPropertiesService(),
            ];

            if (city)
                queries.push(
                    fetchNewestProperties(ITEMS_PER_PAGE, 0, district, city),
                );

            const [
                dataWithoutCity,
                suggestProperties,
                dataWithCityAndDistrict,
            ] = await Promise.all(queries);

            // Fetch properties with city
            if (city) {
                if (dataWithCityAndDistrict.properties?.length > 0)
                    setNearbyProperties(dataWithCityAndDistrict.properties);
            }

            setProperties(dataWithoutCity.properties);
            setSuggestProperties(suggestProperties);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePressProperty = (property: IProperty) => {
        navigation.navigate('PropertyScreen', { slug: property.slug });
    };

    const handlePress = (label: string) => {
        navigation.navigate('ExploreScreen', { city: label, isNoFilter: true });
    };

    // const lastName = user?.name ? user.name.split(' ').pop() : 'Guest';
    const avatar = user?.avatar;

    const locations = [
        {
            title: 'Hà Nội',
            src: require('../../../../assets/img/ha-noi-location.webp'),
        },
        {
            title: 'TP. Hồ Chí Minh',
            src: require('../../../../assets/img/bat-dong-san-hcm.webp'),
        },
        {
            title: 'Đà Nẵng',
            src: require('../../../../assets/img/bat-dong-san-da-nang.webp'),
        },
        {
            title: 'Cần Thơ',
            src: require('../../../../assets/img/bat-dong-san-can-tho.webp'),
        },
        {
            title: 'Bà Rịa - Vũng Tàu',
            src: require('../../../../assets/img/bat-dong-san-ba-ria-vung-tau.webp'),
        },
        {
            title: 'Bình Dương',
            src: require('../../../../assets/img/bat-dong-san-binh-duong.webp'),
        },
        {
            title: 'Đồng Nai',
            src: require('../../../../assets/img/bat-dong-san-dong-nai.webp'),
        },
        {
            title: 'Hải Phòng',
            src: require('../../../../assets/img/bat-dong-san-hai-phong.webp'),
        },
    ];

    if (loading) {
        return (
            <SafeAreaView
                style={[
                    commonStyles.container,
                    { justifyContent: 'center', alignItems: 'center', flex: 1 },
                ]}
            >
                <ActivityIndicator size='large' color='#0000ff' />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={commonStyles.container}>
            <HomeHeader avatar={avatar} />

            <TouchableOpacity style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Tìm kiếm nhà, căn hộ...'
                    onFocus={() => {
                        navigation.navigate('ExploreScreen', {});
                    }}
                />
                <TouchableOpacity>
                    <AntDesign name='search1' size={20} color='#000' />
                </TouchableOpacity>
            </TouchableOpacity>

            <ScrollView scrollEventThrottle={400}>
                <Text style={styles.sectionTitle}>Địa điểm hàng đầu</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}
                >
                    {locations.map((location, index) => (
                        <CustomButton
                            key={index} // hoặc sử dụng một giá trị duy nhất khác như location.title
                            imageSource={location.src} // Đảm bảo rằng thuộc tính này trỏ tới đường dẫn hình ảnh đúng
                            label={location.title}
                            onPress={() => handlePress(location.title)}
                        />
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Bất động sản cho bạn</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.featuredContainer}
                    contentContainerStyle={{
                        gap: 8,
                    }}
                >
                    {suggestProperties.map(
                        (property: IProperty, index: number) => (
                            <Properties
                                key={`${property.propertyId}-${index}`}
                                property={property}
                                onPress={() => handlePressProperty(property)}
                            />
                        ),
                    )}
                </ScrollView>

                <Text style={styles.sectionTitle}>Bất động sản mới nhất</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.featuredContainer}
                    contentContainerStyle={{
                        gap: 8,
                    }}
                >
                    {properties.map((property: IProperty, index: number) => (
                        <Properties
                            key={`${property.propertyId}-${index}`}
                            property={property}
                            onPress={() => handlePressProperty(property)}
                        />
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>
                    Khám phá bất động sản gần đây
                </Text>
                <View style={styles.nearbyContainer}>
                    <View style={styles.grid}>
                        {nearbyProperties.map(
                            (property: IProperty, index: number) => (
                                <PropertyCard
                                    key={`${property.propertyId}-${index}`}
                                    property={property}
                                    onPress={() =>
                                        handlePressProperty(property)
                                    }
                                />
                            ),
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
}: any) => {
    const paddingToBottom = 20;
    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};

const styles = StyleSheet.create({
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    subGreeting: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 8,
    },
    featuredContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    scrollView: {
        marginTop: 10,
        marginBottom: 10,
        gap: 8,
    },
    nearbyContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 5,
        color: 'gray',
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
});

export default HomeScreen;
