import {
    NavigationProp,
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteProperties } from '../../../api/api';
import RenderExploreItem from '../../../components/exploreItem/RenderExploreItem';
import {
    resetFavorites,
    setError,
    setFavorites,
    setLoading,
} from '../../../redux-toolkit/slices/favoriteSlice';
import { AppDispatch, RootState } from '../../../redux-toolkit/store';
import { commonStyles } from '../../../styles/theme';
import { RootStackParamList } from '../../../types/navigation';
import { IPropertyInteraction } from '../../../types/propertyInteraction';

const SavedScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { favorites, pageInfo, loading, error } = useSelector(
        (state: RootState) => state.favorite,
    );
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const itemsPerPage = pageInfo.pageSize;

    const loadFavorites = async (page: number) => {
        try {
            if (page === 1) {
                dispatch(setLoading(true));
            }
            const skip = (page - 1) * itemsPerPage;
            const response = await getFavoriteProperties(itemsPerPage, skip);
            dispatch(
                setFavorites({
                    data: response.data,
                    pageInfo: response.pageInfo,
                }),
            );
        } catch (error: any) {
            console.error('Error fetching favorite properties:', error);
            dispatch(setError(error.message || 'Lỗi khi tải dữ liệu'));
        } finally {
            if (page === 1) {
                dispatch(setLoading(false));
            }
            setIsLoadingMore(false);
        }
    };

    const loadMoreFavorites = () => {
        if (
            loading ||
            pageInfo.current * itemsPerPage >= pageInfo.total ||
            isLoadingMore
        )
            return;
        setIsLoadingMore(true);
        loadFavorites(pageInfo.current + 1);
    };

    const renderSavedItem = ({ item }: { item: IPropertyInteraction }) => (
        <RenderExploreItem item={item.property} navigation={navigation} />
    );

    useFocusEffect(
        useCallback(() => {
            dispatch(resetFavorites());
            loadFavorites(1);
        }, [dispatch]),
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Hiển thị loading khi đang tải dữ liệu lần đầu */}
            {loading && favorites.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color='#0000ff' />
                    <Text style={styles.loadingText}>Đang tải...</Text>
                </View>
            ) : error ? (
                <Text>{error}</Text>
            ) : favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderSavedItem}
                    keyExtractor={(item) =>
                        `${item.interactionId}-${item.property.propertyId}`
                    }
                    onEndReached={loadMoreFavorites}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isLoadingMore ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator
                                    size='small'
                                    color='#0000ff'
                                />
                                <Text style={styles.loadingText}>
                                    Đang tải thêm...
                                </Text>
                            </View>
                        ) : null
                    }
                />
            ) : (
                <View style={commonStyles.container}>
                    <Text style={styles.emptyText}>
                        Không có bất động sản yêu thích
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default SavedScreen;
