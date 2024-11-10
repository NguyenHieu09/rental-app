

// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
// // import { IContractDetail } from '../../types/contractDetail';
// // import { getStatusInVietnamese } from '../../utils/contract';
// // import { fetchContractReviews } from '../../api/api';
// // import { IReview } from '../../types/review';

// // const ContractDetailTab: React.FC<{ contract: IContractDetail }> = ({ contract }) => {
// //     const [reviews, setReviews] = useState<IReview[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);

// //     useEffect(() => {
// //         const loadReviews = async () => {
// //             try {
// //                 setLoading(true);
// //                 const data = await fetchContractReviews(contract.contractId);

// //                 console.log('Data received from API:', data); // Kiểm tra dữ liệu từ API

// //                 // Nếu `data` có `children`, dùng `children`, nếu không thì đặt mảng rỗng
// //                 setReviews(data.children || []);
// //             } catch (err: any) {
// //                 setError(err.message);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         loadReviews();
// //     }, [contract.contractId]);

// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.label}>Mã hợp đồng:</Text>
// //             <Text style={styles.value}>{contract.contractId}</Text>
// //             <Text style={styles.label}>Chủ nhà:</Text>
// //             <Text style={styles.value}>{contract.owner.name}</Text>
// //             <Text style={styles.label}>Người thuê:</Text>
// //             <Text style={styles.value}>{contract.renter.name}</Text>
// //             <Text style={styles.label}>Ngày bắt đầu:</Text>
// //             <Text style={styles.value}>{new Date(contract.startDate).toLocaleDateString()}</Text>
// //             <Text style={styles.label}>Ngày kết thúc:</Text>
// //             <Text style={styles.value}>{new Date(contract.endDate).toLocaleDateString()}</Text>
// //             <Text style={styles.label}>Giá thuê:</Text>
// //             <Text style={styles.value}>{contract.monthlyRent.toLocaleString()} đ/tháng</Text>
// //             <Text style={styles.label}>Tiền cọc:</Text>
// //             <Text style={styles.value}>{contract.depositAmount.toLocaleString()} đ</Text>
// //             <Text style={styles.label}>Trạng thái:</Text>
// //             <Text style={styles.status}>{getStatusInVietnamese(contract.status)}</Text>

// //             {/* Reviews Section */}
// //             <Text style={styles.reviewsLabel}>Đánh giá:</Text>

// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 20,
// //         backgroundColor: '#fff',
// //     },
// //     label: {
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         marginTop: 5,
// //     },
// //     value: {
// //         fontSize: 16,
// //         marginBottom: 5,
// //     },
// //     status: {
// //         fontSize: 16,
// //         marginBottom: 5,
// //         color: 'red',
// //     },
// //     reviewsLabel: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         marginTop: 20,
// //     },
// //     reviewContainer: {
// //         padding: 10,
// //         backgroundColor: '#f9f9f9',
// //         borderBottomWidth: 1,
// //         borderBottomColor: '#ccc',
// //         marginBottom: 10,
// //         borderRadius: 5,
// //     },
// //     reviewerName: {
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //     },
// //     rating: {
// //         fontSize: 14,
// //         color: '#555',
// //     },
// //     comment: {
// //         fontSize: 14,
// //         marginVertical: 5,
// //     },
// //     date: {
// //         fontSize: 12,
// //         color: '#888',
// //     },
// //     noReviews: {
// //         textAlign: 'center',
// //         fontSize: 14,
// //         color: '#888',
// //         marginTop: 10,
// //     },
// //     error: {
// //         color: 'red',
// //         textAlign: 'center',
// //         marginTop: 10,
// //     },
// // });

// // export default ContractDetailTab;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
// import { IContractDetail } from '../../types/contractDetail';
// import { getStatusInVietnamese } from '../../utils/contract';
// import { fetchContractReviews } from '../../api/api';
// import { IReview } from '../../types/review';
// import PropertyReviews from '../review/Review';

// const ContractDetailTab: React.FC<{ contract: IContractDetail }> = ({ contract }) => {
//     const [reviews, setReviews] = useState<IReview[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const loadReviews = async () => {
//             try {
//                 setLoading(true);
//                 const data = await fetchContractReviews(contract.contractId);
//                 // console.log('Data received from API:', data); // Kiểm tra dữ liệu từ API

//                 setReviews(data)
//             } catch (err: any) {
//                 setError(err.message); // Xử lý lỗi nếu có
//             } finally {
//                 setLoading(false); // Khi hoàn thành, tắt loading
//             }
//         };

//         loadReviews(); // Gọi hàm khi component mount hoặc contractId thay đổi
//     }, [contract.contractId]);


//     return (
//         <View style={styles.container}>
//             <Text style={styles.label}>Mã hợp đồng:</Text>
//             <Text style={styles.value}>{contract.contractId}</Text>
//             <Text style={styles.label}>Chủ nhà:</Text>
//             <Text style={styles.value}>{contract.owner.name}</Text>
//             <Text style={styles.label}>Người thuê:</Text>
//             <Text style={styles.value}>{contract.renter.name}</Text>
//             <Text style={styles.label}>Ngày bắt đầu:</Text>
//             <Text style={styles.value}>{new Date(contract.startDate).toLocaleDateString()}</Text>
//             <Text style={styles.label}>Ngày kết thúc:</Text>
//             <Text style={styles.value}>{new Date(contract.endDate).toLocaleDateString()}</Text>
//             <Text style={styles.label}>Giá thuê:</Text>
//             <Text style={styles.value}>{contract.monthlyRent.toLocaleString()} đ/tháng</Text>
//             <Text style={styles.label}>Tiền cọc:</Text>
//             <Text style={styles.value}>{contract.depositAmount.toLocaleString()} đ</Text>
//             <Text style={styles.label}>Trạng thái:</Text>
//             <Text style={styles.status}>{getStatusInVietnamese(contract.status)}</Text>

//             {/* Đánh giá */}
//             <Text style={styles.reviewsLabel}>Đánh giá:</Text>
//             {loading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : error ? (
//                 <Text style={styles.error}>Lỗi: {error}</Text>
//             ) : (
//                 <PropertyReviews reviews={reviews} />
//                 // <FlatList
//                 //     data={reviews}
//                 //     keyExtractor={(item) => item.id.toString()}
//                 //     renderItem={renderReviewItem}
//                 //     ListEmptyComponent={<Text style={styles.noReviews}>Chưa có đánh giá nào</Text>}
//                 // />
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 5,
//     },
//     value: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     status: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: 'red',
//     },
//     reviewsLabel: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 20,
//     },
//     reviewContainer: {
//         padding: 10,
//         backgroundColor: '#f9f9f9',
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         marginBottom: 10,
//         borderRadius: 5,
//     },
//     reviewerName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     rating: {
//         fontSize: 14,
//         color: '#555',
//     },
//     comment: {
//         fontSize: 14,
//         marginVertical: 5,
//     },
//     date: {
//         fontSize: 12,
//         color: '#888',
//     },
//     noReviews: {
//         textAlign: 'center',
//         fontSize: 14,
//         color: '#888',
//         marginTop: 10,
//     },
//     error: {
//         color: 'red',
//         textAlign: 'center',
//         marginTop: 10,
//     },
// });

// export default ContractDetailTab;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { IContractDetail } from '../../types/contractDetail';
import { getStatusInVietnamese } from '../../utils/contract';
import { fetchContractReviews } from '../../api/api';
import { IReview } from '../../types/review';
import StarRating from 'react-native-star-rating-widget';
import { formatDate } from '../../utils/datetime';
import { getFirstAndLastName } from '../../utils/avatar';

const ContractDetailTab: React.FC<{ contract: IContractDetail }> = ({ contract }) => {
    const [review, setReview] = useState<IReview | null>(null);  // Chỉ cần một đánh giá
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadReview = async () => {
            try {
                setLoading(true);
                const data = await fetchContractReviews(contract.contractId);
                setReview(data);  // Giả sử data là đối tượng đánh giá duy nhất
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadReview();
    }, [contract.contractId]);

    const getUserDetails = (userId: string) => {
        // Kiểm tra userId trong renter hoặc owner và trả về thông tin tương ứng
        if (userId === review?.renter.userId) {
            return review?.renter;
        }
        if (userId === review?.owner.userId) {
            return review.owner;
        }
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Mã hợp đồng:</Text>
            <Text style={styles.value}>{contract.contractId}</Text>
            <Text style={styles.label}>Chủ nhà:</Text>
            <Text style={styles.value}>{contract.owner.name}</Text>
            <Text style={styles.label}>Người thuê:</Text>
            <Text style={styles.value}>{contract.renter.name}</Text>
            <Text style={styles.label}>Ngày bắt đầu:</Text>
            <Text style={styles.value}>{new Date(contract.startDate).toLocaleDateString()}</Text>
            <Text style={styles.label}>Ngày kết thúc:</Text>
            <Text style={styles.value}>{new Date(contract.endDate).toLocaleDateString()}</Text>
            <Text style={styles.label}>Giá thuê:</Text>
            <Text style={styles.value}>{contract.monthlyRent.toLocaleString()} đ/tháng</Text>
            <Text style={styles.label}>Tiền cọc:</Text>
            <Text style={styles.value}>{contract.depositAmount.toLocaleString()} đ</Text>
            <Text style={styles.label}>Trạng thái:</Text>
            <Text style={styles.status}>{getStatusInVietnamese(contract.status)}</Text>

            <Text style={styles.reviewsLabel}>Đánh giá:</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.error}>Lỗi: {error}</Text>
            ) : review ? (

                <View>
                    <View style={styles.reviewContainer}>
                        {/* Avatar của người đánh giá chính */}
                        {review.renter.avatar ? (
                            <Image source={{ uri: review.renter.avatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.nameInitials}>
                                <Text style={styles.initials}>{getFirstAndLastName(review.renter.name)}</Text>
                            </View>
                        )}
                        <View>
                            <Text style={styles.reviewerName}>{review.renter.name}</Text>
                            <StarRating
                                rating={review.rating / 2}
                                onChange={() => { }}
                                starSize={25}
                                color="#f1c40f"
                            />
                            <Text style={styles.comment}>{review.content}</Text>
                            {review.medias?.length > 0 && review.medias.map((media, index) => (
                                <Image key={index} source={{ uri: media }} style={styles.media} />
                            ))}
                            <Text style={styles.date}>{formatDate(review.createdAt)}</Text>


                        </View>
                    </View>

                    {review.children.length > 0 ? (
                        review.children.map((child) => {
                            const userDetails = getUserDetails(child.userId);
                            return (
                                <View key={child.id} style={styles.reviewContainer}>
                                    {/* Avatar của người phản hồi */}
                                    <View>
                                        {userDetails?.avatar ? (
                                            <Image source={{ uri: userDetails.avatar }} style={styles.avatar} />
                                        ) : (
                                            <View style={styles.nameInitials}>
                                                <Text style={styles.initials}>
                                                    {getFirstAndLastName(userDetails?.name || '')}
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    <View>
                                        <Text style={styles.reviewerName}>{userDetails?.name}</Text>
                                        <StarRating
                                            rating={child.rating / 2}
                                            onChange={() => { }}
                                            starSize={25}
                                            color="#f1c40f"
                                        />
                                        <Text style={styles.comment}>{child.content}</Text>
                                        {child.medias?.length > 0 && child.medias.map((media, index) => (
                                            <Image key={index} source={{ uri: media }} style={styles.media} />
                                        ))}
                                        <Text style={styles.date}>{formatDate(child.createdAt)}</Text>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <Text style={styles.noReviews}>Chưa có phản hồi nào</Text>
                    )}


                </View>
            ) : (
                <Text style={styles.noReviews}>Chưa có đánh giá nào</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 5,
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
