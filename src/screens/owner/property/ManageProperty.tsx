import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropertyItem from '../../../components/properties/PropertyItem';
import { Property } from '../../../types/navigation';

const properties: Property[] = [
    {
        propertyId: '1',
        slug: 'apartment-123-main-st',
        images: ['image1.jpg', 'image2.jpg'],
        title: 'Apartment',
        address: {
            street: '123 Main St',
            ward: 'Ward 1',
            district: 'District 1',
            city: 'City A',
        },
        price: 150,
        description: 'A beautiful apartment in City A.',
        rentalConditions: [
            { type: 'Lease', value: '1 year' },
        ],
        status: 'available',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',
        deposit: 500,
        minDuration: 12,
        owner: {
            userId: 'owner1',
            name: 'Owner One',
            avatar: null,
            email: 'owner1@example.com',
            phoneNumber: '123-456-7890',
        },
        type: {
            id: 'type1',
            name: 'Apartment',
        },
        attributes: [
            { name: 'Bedrooms', type: '2' },
            { name: 'Bathrooms', type: '1' },
        ],
    },
    {
        propertyId: '2',
        slug: 'apartment-456-elm-st',
        images: ['image3.jpg', 'image4.jpg'],
        title: 'Apartment',
        address: {
            street: '456 Elm St',
            ward: 'Ward 2',
            district: 'District 2',
            city: 'City B',
        },
        price: 200,
        description: 'A beautiful apartment in City B.',
        rentalConditions: [
            { type: 'Lease', value: '1 year' },
        ],
        status: 'available',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',
        deposit: 500,
        minDuration: 12,
        owner: {
            userId: 'owner2',
            name: 'Owner Two',
            avatar: null,
            email: 'owner2@example.com',
            phoneNumber: '123-456-7890',
        },
        type: {
            id: 'type1',
            name: 'Apartment',
        },
        attributes: [
            { name: 'Bedrooms', type: '3' },
            { name: 'Bathrooms', type: '2' },
        ],
    },
    {
        propertyId: '3',
        slug: 'apartment-789-oak-st',
        images: ['image5.jpg', 'image6.jpg'],
        title: 'Apartment',
        address: {
            street: '789 Oak St',
            ward: 'Ward 3',
            district: 'District 3',
            city: 'City C',
        },
        price: 250,
        description: 'A beautiful apartment in City C.',
        rentalConditions: [
            { type: 'Lease', value: '1 year' },
        ],
        status: 'available',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',
        deposit: 500,
        minDuration: 12,
        owner: {
            userId: 'owner3',
            name: 'Owner Three',
            avatar: null,
            email: 'owner3@example.com',
            phoneNumber: '123-456-7890',
        },
        type: {
            id: 'type1',
            name: 'Apartment',
        },
        attributes: [
            { name: 'Bedrooms', type: '4' },
            { name: 'Bathrooms', type: '3' },
        ],
    },
];

const ManageProperty: React.FC = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={properties}
                renderItem={({ item }) => <PropertyItem item={item} />}
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