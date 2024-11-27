import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { deleteReview } from '../../api/api';
import { RootState } from '../../redux-toolkit/store';
import { IBaseUserEmbed } from '../../types/chat';
import { IReplyReview, IReview } from '../../types/review';
import { getFirstAndLastName } from '../../utils/avatar';
import { formatDateTime } from '../../utils/datetime';
import PopoverItem from '../popover/PopoverItem';
import ReviewFooter from './ReviewFooter';
import styles from './styles';

const ReviewItem = ({
    contractId,
    propertyId,
    isFirst,
    child,
    owner,
    renter,
    reviewId,
    setReview,
}: {
    contractId: string;
    propertyId: string;
    isFirst?: boolean;
    reviewId: string;
    child: IReplyReview;
    renter: IBaseUserEmbed;
    owner: IBaseUserEmbed;
    setReview: Dispatch<SetStateAction<IReview | null>>;
}) => {
    const [loading, setLoading] = useState(false);
    const bottomSheetRef = useRef<any>();
    const { bottom } = useSafeAreaInsets();
    const userId = useSelector((state: RootState) => state.user.user?.userId);
    const isMe = userId === child.userId;
    const [isEdit, setIsEdit] = useState(false);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const getUserDetails = (userId: string) => {
        if (userId === renter.userId) {
            return renter;
        }
        if (userId === owner.userId) {
            return owner;
        }
        return null;
    };

    const handleShowPopover = () => {
        bottomSheetRef.current?.present();
    };

    const handleClickEdit = () => {
        setIsEdit(true);
        handleCloseBottomSheet();
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
    };

    const handleClickDelete = async () => {
        setLoading(true);

        try {
            const { data } = await deleteReview({
                reviewId,
                ...(!isFirst && { replyId: child.id }),
            });

            if (isFirst) setReview(null);
            else setReview(data);
        } catch (error) {
            Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi xoá đánh giá.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseBottomSheet = () => {
        bottomSheetRef.current?.close();
    };

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                pressBehavior='close'
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                opacity={0.5}
            />
        ),
        [],
    );

    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, []);

    if (!userId) return null;

    const userDetails = getUserDetails(child.userId);
    return (
        <View key={child.id} style={styles.reviewContainer}>
            {/* Avatar của người phản hồi */}
            <View>
                {userDetails?.avatar ? (
                    <Image
                        source={{
                            uri: userDetails.avatar,
                        }}
                        style={styles.avatar}
                    />
                ) : (
                    <View style={styles.nameInitials}>
                        <Text style={styles.initials}>
                            {getFirstAndLastName(userDetails?.name || '')}
                        </Text>
                    </View>
                )}
            </View>

            {isEdit ? (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ReviewFooter
                        data={{
                            content: child.content,
                            images: child.medias,
                            rating: child.rating,
                            reviewId,
                            replyId: isFirst ? undefined : child.id,
                            setEdit: setIsEdit,
                        }}
                        contractId={contractId}
                        propertyId={propertyId}
                        setReview={setReview}
                        isFirstReview={isFirst}
                    />
                    <TouchableOpacity onPress={handleCancelEdit}>
                        <Text
                            style={{
                                color: '#1677ff',
                            }}
                        >
                            Hủy
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.info}>
                    <View style={styles.body}>
                        <Text style={styles.reviewerName}>
                            {userDetails?.name}
                        </Text>
                        {isFirst && (
                            <StarRating
                                enableHalfStar={false}
                                rating={child.rating / 2}
                                onChange={() => {}}
                                starSize={20}
                                color='#f1c40f'
                            />
                        )}
                        <Text style={styles.date}>
                            {formatDateTime(child.createdAt, true)}
                        </Text>
                        {child.content && (
                            <Text style={styles.comment}>{child.content}</Text>
                        )}
                        {child.medias?.length > 0 &&
                            child.medias.map((media, index) => (
                                <Image
                                    key={index}
                                    source={{
                                        uri: media,
                                    }}
                                    style={styles.media}
                                />
                            ))}
                    </View>
                    {isMe && (
                        <TouchableOpacity
                            onPress={handleShowPopover}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator
                                    size='small'
                                    color='#007AFF'
                                />
                            ) : (
                                <AntDesign
                                    name='ellipsis1'
                                    size={24}
                                    color='#555'
                                />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            )}
            <BottomSheetModal
                enablePanDownToClose
                ref={bottomSheetRef}
                index={0}
                // topInset={top}
                onChange={handleSheetChanges}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetScrollView
                    contentContainerStyle={[
                        { marginTop: 8, paddingBottom: bottom + 12 },
                    ]}
                >
                    <TouchableOpacity onPress={handleClickEdit}>
                        <PopoverItem>Sửa</PopoverItem>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClickDelete}>
                        <PopoverItem>Xoá</PopoverItem>
                    </TouchableOpacity>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </View>
    );
};

export default ReviewItem;
