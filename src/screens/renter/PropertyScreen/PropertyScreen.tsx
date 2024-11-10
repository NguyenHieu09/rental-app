import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { commonStyles } from '../../../styles/theme';
import { IProperty } from '../../../types/property';
import { fetchPropertyDetail, fetchPropertyReviews } from '../../../api/api';
import { AntDesign } from '@expo/vector-icons';
import { formatPrice } from '../../../utils/formattedPrice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import RentalRequestModal from '../../../components/modal/RentalRequestModal';
import { maskPhoneNumber } from '../../../utils/maskPhoneNumber';
import { Linking } from 'react-native';
import { IConversation } from '../../../types/chat';
import { addConversation, setSelectedConversation } from '../../../redux-toolkit/slices/conversationSlice';
// import PropertyReviews from '../../components/review/PropertyReviews'; // Import PropertyReviews component
import { IReview } from '../../../types/review';
import PropertyReviews from '../../../components/review/Review';

const { width: screenWidth } = Dimensions.get('window');

const PropertyScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'PropertyScreen'>>();
    const { slug } = route.params;
    const [property, setProperty] = useState<IProperty | null>(null);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const conversations = useSelector((state: RootState) => state.conversations.conversations);
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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handlePhonePress = () => {
        if (owner.phoneNumber) {
            Linking.openURL(`tel:${owner.phoneNumber}`);
        }
    };

    const createChatConversation = (firstUser: string, secondUser: string) => {
        if (firstUser < secondUser) return `${firstUser}-${secondUser}`;

        return `${secondUser}-${firstUser}`;
    };

    const handleContactOwnerPress = () => {
        const conversationId = createChatConversation(user?.userId || '', property.owner.userId);
        const conversation: IConversation = conversations.find((c) => c.conversationId === conversationId) || {
            conversationId: createChatConversation(user?.userId || '', property.owner.userId),
            createdAt: new Date().toISOString(),
            deletedBy: [],
            participants: [user!, property.owner],
            updatedAt: new Date().toISOString(),
            receiver: property.owner,
            chats: [],
            unreadCount: 0,
        };

        if (!conversation) return;

        dispatch(addConversation(conversation));
        dispatch(setSelectedConversation(conversation));
        navigation.navigate('ChatDetail');
    };

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

                            {/* Owner Information Section */}
                            <View style={styles.ownerContainer}>
                                <Image
                                    source={{ uri: owner.avatar ?? 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg' }}
                                    style={styles.ownerImage}
                                />
                                <View style={styles.ownerInfo}>
                                    <Text style={[styles.ownerName]} numberOfLines={1} ellipsizeMode="tail">{owner.name}</Text>
                                    <Text style={styles.ownerRole}>Chủ sở hữu</Text>
                                </View>
                                <TouchableOpacity style={[styles.ownerInfo, { marginLeft: 80 }]} onPress={handlePhonePress}>
                                    <Text style={{ fontSize: 14, fontWeight: '700' }}>Số điện thoại</Text>
                                    <Text style={styles.ownerRole}>{maskPhoneNumber(owner.phoneNumber)}</Text>
                                    {/* <Text style={styles.ownerRole}>{owner.phoneNumber}</Text> */}
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.infoContainer, { justifyContent: 'space-evenly' }]}>
                                <TouchableOpacity style={[styles.requestButton, { backgroundColor: 'white', borderColor: '#007BFF', borderWidth: 1 }]} onPress={handleContactOwnerPress}>
                                    <View style={styles.buttonContent}>
                                        <Text style={[styles.buttonText, { color: '#007BFF' }]}>Liên hệ chủ nhà</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.requestButton, { backgroundColor: '#007BFF' }]} onPress={toggleModal}>
                                    <View style={styles.buttonContent}>
                                        <Text style={[styles.buttonText, { color: 'white' }]}>Gửi yêu cầu thuê</Text>
                                    </View>
                                </TouchableOpacity>
                                <RentalRequestModal
                                    isVisible={isModalVisible}
                                    onClose={toggleModal}
                                    property={property}
                                    ownerId={owner.userId}
                                    userId={user?.userId || ''}
                                />
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

export default PropertyScreen;

