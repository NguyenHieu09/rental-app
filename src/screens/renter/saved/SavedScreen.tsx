import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import { fetchFavoriteProperties } from '../../../redux-toolkit/slices/favoriteSlice';
import { IPropertyInteraction } from '../../../types/propertyInteraction';
import RenderExploreItem from '../../../components/exploreItem/RenderExploreItem';
import { RootStackParamList } from '../../../types/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const SavedScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { favorites, loading, error, pageInfo } = useSelector((state: RootState) => state.favorite);
    const itemsPerPage = pageInfo.pageSize;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isLoadingMore, setIsLoadingMore] = useState(false); // Trạng thái tải thêm

    // Tự động load lại dữ liệu mỗi khi màn hình được focus lại
    useFocusEffect(
        useCallback(() => {
            // Fetch dữ liệu cho trang hiện tại khi màn hình được focus
            dispatch(fetchFavoriteProperties(itemsPerPage, (pageInfo.current - 1) * itemsPerPage));
        }, [dispatch, pageInfo.current, itemsPerPage]) // Chạy lại khi pageInfo.current hoặc itemsPerPage thay đổi
    );

    const loadMoreFavorites = () => {
        if (loading || pageInfo.current * itemsPerPage >= pageInfo.total || isLoadingMore) return; // Kiểm tra nếu đã đủ dữ liệu hoặc đang tải
        setIsLoadingMore(true); // Đánh dấu đang tải thêm
        dispatch(fetchFavoriteProperties(itemsPerPage, pageInfo.current * itemsPerPage)); // Tải thêm dữ liệu
    };

    const renderSavedItem = ({ item }: { item: IPropertyInteraction }) => (
        <RenderExploreItem item={item.property} navigation={navigation} />
    );

    useEffect(() => {
        if (!loading && isLoadingMore) {
            setIsLoadingMore(false); // Đánh dấu đã tải xong dữ liệu khi không còn loading
        }
    }, [loading]);

    if (loading && !isLoadingMore) return <Text>Loading...</Text>; // Hiển thị loading khi đang tải lần đầu
    if (error) return <Text>{error}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderSavedItem}
                    keyExtractor={(item) => `${item.interactionId}-${item.property.propertyId}`}
                    onEndReached={loadMoreFavorites} // Khi người dùng kéo xuống dưới cùng, tải thêm dữ liệu
                    onEndReachedThreshold={0.5} // Ngưỡng để gọi `onEndReached`
                    ListFooterComponent={isLoadingMore ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#0000ff" />
                            <Text style={styles.loadingText}>Đang tải thêm...</Text>
                        </View>
                    ) : null}
                />
            ) : (
                <Text style={styles.emptyText}>Không có bất động sản yêu thích</Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
    },
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    loadingText: {
        marginLeft: 10,
        fontSize: 16,
    },
});


export default SavedScreen;

