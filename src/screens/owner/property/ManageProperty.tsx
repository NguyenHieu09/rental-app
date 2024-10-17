import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import PropertyItem from '../../../components/properties/PropertyItem';
import { fetchPropertiesWithFilters } from '../../../api/api';
import { IProperty, IFilterProperty } from '../../../types/property';
import { commonStyles } from '../../../styles/theme';

const ManageProperty: React.FC = () => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalProperties, setTotalProperties] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null); // Define the error state
    const ITEMS_PER_PAGE = 10;

    const loadProperties = async (page: number) => {
        try {
            console.log(`Loading page ${page}...`);
            if (page === 0) setLoading(true);
            else setIsLoadingMore(true);

            const skip = page * ITEMS_PER_PAGE;
            console.log(`Fetching data with skip: ${skip}`);
            const filters: IFilterProperty = {
                // Add any filters you need here
            };
            const response = await fetchPropertiesWithFilters(filters, ITEMS_PER_PAGE, skip);
            // console.log('API response:', response);

            const { properties, total } = response;
            // console.log('Fetched properties:', properties);
            console.log('Total properties:', total);

            if (total !== undefined) {
                setProperties((prevProperties) => [...prevProperties, ...properties]);
                setTotalProperties(total);
            } else {
                console.error('Total properties is undefined');
                Alert.alert('Error', 'Total properties is undefined.');
            }
        } catch (err: any) {
            console.error('Error fetching properties:', err);
            setError(err.message); // Set the error message
            Alert.alert('Error', 'Có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
            console.log('Loading state:', loading, 'Is loading more:', isLoadingMore);
        }
    };

    useEffect(() => {
        loadProperties(0);
    }, []);

    const loadMoreProperties = () => {
        console.log('Attempting to load more properties...');
        if (!isLoadingMore && properties.length < totalProperties) {
            console.log('Loading more properties...');
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadProperties(nextPage);
        } else {
            console.log('No more properties to load or already loading.');
        }
    };

    const handleDelete = (id: string) => {
        console.log(`Delete property with id: ${id}`);
        // Add your delete logic here
        setProperties((prevProperties) => prevProperties.filter((property) => property.propertyId !== id));
    };

    if (loading && currentPage === 0) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return <Text>Error: {error}</Text>; // Display the error message
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={properties}
                renderItem={({ item }) => {
                    return <PropertyItem item={item} onDelete={handleDelete} />;
                }}
                keyExtractor={(item) => item.propertyId}
                onEndReached={loadMoreProperties}  // Load more properties when reaching the end
                onEndReachedThreshold={0.5}  // Start loading more when 50% away from the end
                ListFooterComponent={isLoadingMore ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#0000ff" />
                        <Text style={styles.loadingText}>Đang tải thêm...</Text>
                    </View>
                ) : null}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    list: {
        paddingBottom: 20,
    },
    loadingContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 5,
        color: 'gray',
        fontSize: 16,
    },
});

export default ManageProperty;

