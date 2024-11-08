import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { createPropertyToFavorites } from '../../api/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-toolkit/store';
import { decrement, increment } from '../../redux-toolkit/slices/favoriteSlice';

interface FavoriteButtonProps {
    isFavorite?: boolean;
    propertyId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, propertyId }) => {
    const [favorite, setFavorite] = useState(isFavorite || false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleFavoriteToggle = async () => {
        setLoading(true);

        try {
            const interactionType = favorite ? 'VIEWED' : 'FAVORITED';

            // Gọi API để thêm hoặc xóa yêu thích
            await createPropertyToFavorites({
                propertyId,
                interactionType,
            });

            // Cập nhật trạng thái yêu thích
            setFavorite(!favorite);

            // Cập nhật số lượng yêu thích trong store thông qua Redux
            if (favorite) {

                dispatch(decrement()); // Gọi decrement khi xóa yêu thích
            } else {
                console.log('increment');

                dispatch(increment()); // Gọi increment khi thêm yêu thích
            }

            // Thông báo cho người dùng

        } catch (error) {
            // Xử lý lỗi nếu cần
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFavorite(isFavorite || false);
    }, [isFavorite]);

    return (
        <TouchableOpacity onPress={handleFavoriteToggle} disabled={loading}>
            {favorite ? (
                <IconFill name="heart" size={22} color="red" />
            ) : (
                <IconOutline name="heart" size={22} color="black" />
            )}
        </TouchableOpacity>
    );
};

export default FavoriteButton;
