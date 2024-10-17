import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
// import { Property } from '../../types/navigation';
import { AntDesign } from '@expo/vector-icons';
import { formatPrice } from '../../utils/formattedPrice';
import { IconOutline } from '@ant-design/icons-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-toolkit/store';
import RentalRequestModal from '../modal/RentalRequestModal';
import { IProperty } from '../../types/property';

interface PropertyDetailProps {
    property: IProperty;
}

const { width: screenWidth } = Dimensions.get('window');

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
    const { images, title, address, minDuration, price, deposit, rentalConditions, owner } = property;
    const [isModalVisible, setModalVisible] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const location = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
    const formattedPrice = formatPrice(price);
    const formattedDeposit = formatPrice(deposit);
    console.log(property.propertyId);


    const area = rentalConditions.find((condition) => condition.type === 'Diện tích')?.value;
    const bed = rentalConditions.find((condition) => condition.type === 'Phòng ngủ')?.value;
    const bath = rentalConditions.find((condition) => condition.type === 'Phòng tắm')?.value;
    const floors = rentalConditions.find((condition) => condition.type === 'Số tầng')?.value;
    const furniture = rentalConditions.find((condition) => condition.type === 'Nội thất')?.value;

    const renderItem = ({ item }: { item: string }) => {
        return (
            <View style={styles.carouselItem}>
                <Image source={{ uri: item }} style={styles.image} />
            </View>
        );
    };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
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
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>Thời gian thuê tối thiểu: </Text>
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>{minDuration} tháng</Text>
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
                <View style={[styles.ownerInfo, { marginLeft: 30 }]}>
                    <Text style={{ fontSize: 14, fontWeight: 700 }}>Số điện thoại</Text>
                    <Text style={styles.ownerRole}>{owner.phoneNumber}</Text>
                </View>


            </View>

            <View style={[styles.infoContainer, { justifyContent: 'space-evenly', }]}>
                <TouchableOpacity style={[styles.requestButton, { backgroundColor: 'white', borderColor: '#007BFF', borderWidth: 1 }]}>
                    <View style={styles.buttonContent}>
                        <Text style={[styles.buttonText, { color: '#007BFF' }]}>Liên hệ chủ nhà</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.requestButton, { backgroundColor: '#007BFF' }]} onPress={toggleModal}>
                    <View style={styles.buttonContent}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>Gửi yêu cầu thuê</Text>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={styles.reviewContainer}>
                <Text style={styles.reviewerName}>Milan Jack</Text>
                <Text style={styles.reviewerRole}>Home Owner/Broker</Text>
                <Text style={styles.reviewText}>
                    At the end of the day, we want a home that matches our lifestyle. RE/MAX knows that and promises clients their agents are ready and waiting to help find the perfect fit.
                </Text>
                <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>
            </View>

            <RentalRequestModal
                isVisible={isModalVisible}
                onClose={toggleModal}
                property={property}
                ownerId={owner.userId}
                userId={user?.userId || ''} // Replace with actual user ID
            />
        </View>
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
});

export default PropertyDetail;
