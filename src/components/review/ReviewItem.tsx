import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { IBaseUserEmbed } from '../../types/chat';
import { IReplyReview } from '../../types/review';
import { getFirstAndLastName } from '../../utils/avatar';
import { formatDateTime } from '../../utils/datetime';
import styles from './styles';
import Popover from 'react-native-popover-view';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PopoverItem from '../popover/PopoverItem';

const ReviewItem = ({
    child,
    owner,
    renter,
}: {
    child: IReplyReview;
    renter: IBaseUserEmbed;
    owner: IBaseUserEmbed;
}) => {
    const [showPopover, setShowPopover] = useState(false);

    const getUserDetails = (userId: string) => {
        // Kiểm tra userId trong renter hoặc owner và trả về thông tin tương ứng
        if (userId === renter.userId) {
            return renter;
        }
        if (userId === owner.userId) {
            return owner;
        }
        return null;
    };

    const handleShowPopover = () => {
        setShowPopover(true);
    };

    const handleHidePopover = () => {
        setShowPopover(false);
    };

    const handleClickEdit = () => {
        setShowPopover(false);
    };

    const handleClickDelete = () => {
        setShowPopover(false);
    };

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

            <View style={styles.info}>
                <View style={styles.body}>
                    <Text style={styles.reviewerName}>{userDetails?.name}</Text>
                    <Text style={styles.date}>
                        {formatDateTime(child.createdAt)}
                    </Text>
                    <Text style={styles.comment}>{child.content}</Text>
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
                <Popover
                    isVisible={showPopover}
                    onRequestClose={handleHidePopover}
                    from={
                        <TouchableOpacity onPress={handleShowPopover}>
                            <AntDesign name='ellipsis1' size={20} />
                        </TouchableOpacity>
                    }
                >
                    <View
                        style={{
                            minWidth: 224,
                        }}
                    >
                        <TouchableOpacity onPress={handleClickEdit}>
                            <PopoverItem>Sửa</PopoverItem>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickDelete}>
                            <PopoverItem>Xoá</PopoverItem>
                        </TouchableOpacity>
                    </View>
                </Popover>
            </View>
        </View>
    );
};

export default ReviewItem;
