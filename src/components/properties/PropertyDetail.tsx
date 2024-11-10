import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';


import { AntDesign } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import { Linking } from 'react-native';
import { RootStackParamList } from '../../types/navigation';
import { IProperty } from '../../types/property';
import { IReview } from '../../types/review';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { fetchPropertyDetail, fetchPropertyReviews } from '../../api/api';
import { commonStyles } from '../../styles/theme';
import { formatPrice } from '../../utils/formattedPrice';
import PropertyReviews from '../review/Review';



const { width: screenWidth } = Dimensions.get('window');

const PropertyDetail: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'PropertyScreen'>>();
    const { slug } = route.params;
    const [property, setProperty] = useState<IProperty | null>(null);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const loadPropertyDetail = async () => {
            try {
                const data = await fetchPropertyDetail(slug);
                setProperty(data);
            } catch (err: any) {
                console.error('Error fetching property detail:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const loadReviews = async () => {
            try {
                const reviewsData = await fetchPropertyReviews(slug);
                setReviews(reviewsData);
            } catch (err: any) {
                console.error('Error fetching property reviews:', err);
                setError(err.message);
            }
        };

        loadPropertyDetail();
        loadReviews();
    }, [slug]);

    if (loading) {
        return (
            <View style={commonStyles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    if (!property) {
        return (
            <View>
                <Text>Không tìm thấy bài viết</Text>
            </View>
        );
    }

    const { images, title, description, address, minDuration, price, deposit, rentalConditions, owner } = property;
    const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
    const formattedPrice = formatPrice(price);
    const formattedDeposit = formatPrice(deposit);

    const area = rentalConditions.find((condition) => condition.type === 'Diện tích')?.value;
    const bed = rentalConditions.find((condition) => condition.type === 'Phòng ngủ')?.value;
    const bath = rentalConditions.find((condition) => condition.type === 'Phòng tắm')?.value;
    const floors = rentalConditions.find((condition) => condition.type === 'Số tầng')?.value;
    const furniture = rentalConditions.find((condition) => condition.type === 'Nội thất')?.value;

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.carouselItem}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );

    return (
        <FlatList
            data={[{ key: 'property' }, { key: 'reviews' }]}
            renderItem={({ item }) => {
                if (item.key === 'property') {
                    return (
                        <View style={commonStyles.container}>
                            <FlatList
                                data={images}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                            />
                            <View style={styles.detailsContainer}>
                                <Text style={styles.title}>{title}</Text>
                                <View style={styles.infoItem}>
                                    <Text style={styles.price}>Tiền thuê: </Text>
                                    <Text style={styles.price}>{formattedPrice}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.price}>Tiền cọc: </Text>
                                    <Text style={styles.price}>{formattedDeposit}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={{ fontSize: 14, fontWeight: '500' }}>Thời gian thuê tối thiểu: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: '500' }}>{minDuration} tháng</Text>
                                </View>
                                <View style={styles.locationContainer}>
                                    <AntDesign name="enviromento" size={20} color="black" style={styles.icon} />
                                    <Text style={styles.location}>{location}</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.infoItem}>
                                        <Icon name="bed" size={20} color="black" />
                                        <Text style={styles.infoText}>{bed} ngủ</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="bathtub" size={20} color="black" />
                                        <Text style={styles.infoText}>{bath} tắm</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="height" size={20} color="black" />
                                        <Text style={styles.infoText}>{floors}</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="area-chart" size={20} color="black" />
                                        <Text style={styles.infoText}>{area}</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Icon name="chair" size={20} color="black" />
                                        <Text style={styles.infoText}>{furniture}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 14 }}>Mô tả: {description}</Text>
                                </View>
                            </View>




                        </View>
                    );
                } else if (item.key === 'reviews') {
                    return (
                        <View style={commonStyles.container}>
                            <Text style={styles.sectionTitle}>Đánh giá</Text>
                            <PropertyReviews reviews={reviews} />
                        </View>
                    );
                }
                return null;
            }}
            keyExtractor={(item) => item.key}
        />
    );
};

const styles = StyleSheet.create({
    container: {},
    carouselItem: {
        width: screenWidth,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    detailsContainer: {
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6347',
        marginBottom: -4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    location: {
        fontSize: 16,
        color: 'gray',
        flex: 1,
    },
    icon: {
        marginRight: 8,
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: 'black',
        marginLeft: 8,
    },
    favoriteButton: {
        alignSelf: 'flex-end',
    },
    reviewContainer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: 8,
    },
    reviewerName: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    reviewerRole: {
        color: 'gray',
        marginBottom: 8,
    },
    reviewText: {
        marginBottom: 8,
    },
    rating: {
        fontSize: 16,
        color: '#FFD700',
    },
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: 8,
    },
    ownerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    ownerInfo: {
        flex: 1,
    },
    ownerName: {
        fontWeight: 'bold',
        width: 600,
    },
    ownerRole: {
        color: 'gray',
    },
    requestButton: {
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    media: {
        width: 100,
        height: 100,
        marginVertical: 8,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    content: {}
});

export default PropertyDetail;