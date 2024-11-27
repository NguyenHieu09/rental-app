import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Text, View } from 'react-native';
import { IReview } from '../../types/review';
import ReviewFooter from './ReviewFooter';
import ReviewItem from './ReviewItem';
import styles from './styles';

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
    const reviewItemProps = useMemo(
        () => ({
            contractId,
            propertyId,
            reviewId: review?.id!,
            owner: review?.owner!,
            renter: review?.renter!,
            setReview,
        }),
        [review],
    );

    return (
        <View>
            {review ? (
                <View
                    style={{
                        gap: 12,
                    }}
                >
                    <ReviewItem
                        {...reviewItemProps}
                        isFirst
                        child={{
                            ...review,
                            userId: review.renter.userId,
                        }}
                    />
                    {review.children &&
                        review.children.map((child) => (
                            <ReviewItem
                                {...reviewItemProps}
                                child={child}
                                key={child.id}
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
                    contractId={contractId}
                    propertyId={propertyId}
                />
            )}
        </View>
    );
};

export default Review;
