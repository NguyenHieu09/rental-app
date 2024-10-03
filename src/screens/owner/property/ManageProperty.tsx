// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, FlatList, Text } from 'react-native';
// import PropertyItem from '../../../components/properties/PropertyItem';
// import { fetchPropertiesWithFilters } from '../../../api/api';
// import { IProperty, IFilterProperty } from '../../../types/property';
// import { commonStyles } from '../../../styles/theme';

// const ManageProperty: React.FC = () => {
//     const [properties, setProperties] = useState<IProperty[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const loadProperties = async () => {
//             setLoading(true);
//             setError(null);

//             const filters: IFilterProperty = {
//                 // status: 'ACTIVE',
//             };

//             try {
//                 const { properties, total } = await fetchPropertiesWithFilters(filters);
//                 setProperties(properties);
//                 console.log('Total properties:', total);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadProperties();
//     }, []);

//     const handleDelete = (id: string) => {
//         console.log(`Delete property with id: ${id}`);
//         // Add your delete logic here
//         setProperties((prevProperties) => prevProperties.filter((property) => property.propertyId !== id));
//     };

//     if (loading) {
//         return <Text>Loading...</Text>;
//     }

//     if (error) {
//         return <Text>Error: {error}</Text>;
//     }

//     return (
//         <View style={commonStyles.container}>
//             <FlatList
//                 data={properties}
//                 renderItem={({ item }) => {
//                     console.log('Property item:', item);
//                     return <PropertyItem item={item} onDelete={handleDelete} />;
//                 }}
//                 keyExtractor={(item) => item.propertyId}
//                 contentContainerStyle={styles.list}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#f8f9fa',
//     },
//     list: {
//         paddingBottom: 20,
//     },
// });

// export default ManageProperty;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import PropertyItem from '../../../components/properties/PropertyItem';
import { useRoute } from '@react-navigation/native';
import { IProperty } from '../../../types/property';
import { commonStyles } from '../../../styles/theme';

const ManageProperty: React.FC = () => {
    const route = useRoute();
    const { properties: initialProperties } = route.params as { properties: IProperty[] };

    const [properties, setProperties] = useState<IProperty[]>(initialProperties);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        console.log(`Delete property with id: ${id}`);
        // Add your delete logic here
        setProperties((prevProperties) => prevProperties.filter((property) => property.propertyId !== id));
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={properties}
                renderItem={({ item }) => {
                    console.log('Property item:', item);
                    return <PropertyItem item={item} onDelete={handleDelete} />;
                }}
                keyExtractor={(item) => item.propertyId}
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
});

export default ManageProperty;