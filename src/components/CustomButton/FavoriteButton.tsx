import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { createPropertyToFavorites } from '../../api/api';
import { decrement, increment } from '../../redux-toolkit/slices/favoriteSlice';
import { AppDispatch } from '../../redux-toolkit/store';

interface FavoriteButtonProps {
    isFavorite?: boolean;
    propertyId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    isFavorite,
    propertyId,
}) => {
    const [favorite, setFavorite] = useState(isFavorite || false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleFavoriteToggle = async () => {
        setLoading(true);
        console.log(propertyId);

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
                console.log('decrement');

                dispatch(decrement()); // Gọi decrement khi xóa yêu thích
            } else {
                console.log('increment');

                dispatch(increment()); // Gọi increment khi thêm yêu thích
                Alert.alert('Thành công', 'Đã thêm vào danh sách yêu thích');
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
                <IconFill name='heart' size={22} color='#ff4d4f' />
            ) : (
                <IconOutline name='heart' size={22} color='#ff4d4f' />
            )}
        </TouchableOpacity>
    );
};

export default FavoriteButton;
