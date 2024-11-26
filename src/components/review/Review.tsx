import React, { Dispatch, SetStateAction } from 'react';
import { Image, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { IReview } from '../../types/review';
import { formatDateTime } from '../../utils/datetime';
import AvatarName from '../avatarName/AvatarName';
import ReviewItem from './ReviewItem';
import styles from './styles';
import ReviewFooter from './ReviewFooter';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-toolkit/store';

const Review = ({
    review,
    isRenter,
    contractId,
    propertyId,
    setReview,
}: {
    review: IReview | null;
    isRenter: boolean;
    propertyId: string;
    contractId: string;
    setReview: Dispatch<SetStateAction<IReview | null>>;
}) => {
    console.log('🚀 ~ Review ~ review:', review);
    const userId = useSelector((state: RootState) => state.user.user?.userId);
    console.log('🚀 ~ Review ~ userId:', userId);

    if (!userId) return null;

    return (
        <View>
            {review ? (
                <View
                    style={{
                        gap: 12,
                    }}
                >
                    <View style={styles.reviewContainer}>
                        <AvatarName
                            name={review.renter.name}
                            url={review.renter.avatar}
                        />
                        <View style={styles.body}>
                            <Text style={styles.reviewerName}>
                                {review.renter.name}
                            </Text>
                            <StarRating
                                rating={review.rating / 2}
                                onChange={() => {}}
                                starSize={20}
                                color='#f1c40f'
                            />
                            <Text style={styles.date}>
                                {formatDateTime(review.createdAt)}
                            </Text>
                            <Text style={styles.comment}>{review.content}</Text>
                            {review.medias?.length > 0 &&
                                review.medias.map((media, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: media }}
                                        style={styles.media}
                                    />
                                ))}
                        </View>
                    </View>
                    {review.children &&
                        review.children.map((child) => (
                            <ReviewItem
                                child={child}
                                key={child.id}
                                owner={review.owner}
                                renter={review.renter}
                            />
                        ))}
                </View>
            ) : (
                <Text style={styles.noReviews}>Chưa có đánh giá nào</Text>
            )}
            {(isRenter || review) && (
                <ReviewFooter
                    setReview={setReview}
                    isFirstReview={!review}
                    isRenter={isRenter}
                    contractId={contractId}
                    propertyId={propertyId}
                />
            )}
        </View>
    );
};

export default Review;
