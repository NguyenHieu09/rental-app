import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchContractReviews } from '../../api/api';
import { commonStyles } from '../../styles/theme';
import { IContractDetail } from '../../types/contractDetail';
import { IReview } from '../../types/review';
import { getContractColor } from '../../utils/colorTag';
import { getStatusInVietnamese } from '../../utils/contract';
import { formatDate } from '../../utils/datetime';
import { formatPrice } from '../../utils/formattedPrice';
import Review from '../review/Review';
import Tag from '../tag/Tag';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-toolkit/store';
import { fetchContractDetails } from '../../api/contract';
import { RootStackParamList } from '../../types/navigation';
import { IconOutline } from '@ant-design/icons-react-native';

const ContractDetailTab: React.FC<{ contractId: string }> = ({ contractId }) => {
    const [contract, setContract] = useState<IContractDetail | null>(null);
    const [review, setReview] = useState<IReview | null>(null); // Chỉ cần một đánh giá
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state: RootState) => state.user.user?.userId);
    const isRenter = contract?.renterId === userId;




    useFocusEffect(
        useCallback(() => {
            const loadContractDetails = async () => {
                try {
                    setLoading(true);
                    const contractData = await fetchContractDetails(contractId);
                    setContract(contractData);

                    const reviewData = await fetchContractReviews(contractId);
                    setReview(reviewData); // Giả sử data là đối tượng đánh giá duy nhất
                } catch (err: any) {
                    console.error('Error fetching contract details or reviews:', err);
                } finally {
                    setLoading(false);
                }
            };

            loadContractDetails();
        }, [contractId]),
    );

    const handlePress = () => {
        // navigation.navigate('ContractDetail', { contractId });
    };

    const shouldShowReview = contract && !['APPROVED_CANCELLATION', 'WAITING', 'DEPOSITED', 'ONGOING', 'PENDING_CANCELLATION'].includes(contract.status);

    if (loading) {
        return (
            <View style={commonStyles.container}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    if (!contract) {
        return (
            <View style={commonStyles.container}>
                <Text>Không tìm thấy hợp đồng</Text>
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={handlePress} style={styles.touchable}>
                    <Text style={styles.label}>
                        Mã hợp đồng:
                        <Text style={styles.value}>{contract.contractId}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Chủ nhà: &nbsp;
                        <Text style={styles.value}>{contract.owner.name}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Người thuê:&nbsp;
                        <Text style={styles.value}>{contract.renter.name}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Ngày bắt đầu:&nbsp;
                        <Text style={styles.value}>
                            {formatDate(contract.startDate)}
                        </Text>
                    </Text>
                    <Text style={styles.label}>
                        Ngày kết thúc:&nbsp;
                        <Text style={styles.value}>
                            {formatDate(contract.endDateActual)}
                        </Text>
                    </Text>
                    <Text style={styles.label}>
                        Giá:&nbsp;
                        <Text style={styles.value}>
                            {formatPrice(contract.monthlyRent)}
                        </Text>
                    </Text>
                    <Text style={styles.label}>
                        Tiền cọc:&nbsp;
                        <Text style={styles.value}>
                            {formatPrice(contract.depositAmount)}
                        </Text>
                    </Text>
                    <View
                        style={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Tag color={getContractColor(contract.status)}>
                            {getStatusInVietnamese(contract.status)}
                        </Tag>
                        <View style={{ flex: 1 }}></View>
                    </View>
                </TouchableOpacity>

                {shouldShowReview && (
                    <>
                        <Text style={styles.reviewsLabel}>Đánh giá</Text>
                        {loading ? (
                            <ActivityIndicator size='large' color='#0000ff' />
                        ) : (
                            <Review
                                setReview={setReview}
                                review={review}
                                isRenter={isRenter}
                                contractId={contract.contractId}
                                propertyId={contract.propertyId}
                            />
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    touchable: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
    },
    status: {
        fontSize: 16,
        marginBottom: 5,
        color: 'red',
    },
    reviewsLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    reviewContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fdfdfd',
        marginBottom: 10,
        borderRadius: 5,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 14,
        color: '#555',
    },
    comment: {
        fontSize: 14,
        marginVertical: 5,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    noReviews: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        marginTop: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    nameInitials: {
        backgroundColor: '#f4f4f5',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    initials: {
        fontSize: 16,
        fontWeight: '500',
        color: '#09090b',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    media: {
        width: 130,
        height: 140,
        margin: 8,
        resizeMode: 'cover',
    },
});

export default ContractDetailTab;