import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        gap: 4,
    },
    reviewContainer: {
        flexDirection: 'row',
        borderRadius: 5,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 14,
        color: '#555',
    },
    comment: {
        fontSize: 14,
    },
    date: {
        fontSize: 14,
    },
    noReviews: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        marginTop: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    nameInitials: {
        backgroundColor: '#f4f4f5',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    initials: {
        fontSize: 16,
        fontWeight: '500',
        color: '#09090b',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    media: {
        width: 130,
        height: 140,
        margin: 8,
        resizeMode: 'cover',
    },
    info: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        gap: 8,
    },
});

export default styles;
