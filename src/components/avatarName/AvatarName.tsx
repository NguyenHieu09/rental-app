import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getFirstAndLastName } from '../../utils/avatar';

const AvatarName = ({ name, url }: { url: string; name: string }) => {
    if (url)
        return (
            <Image
                source={{
                    uri: url,
                }}
                style={styles.avatar}
            />
        );

    return (
        <View style={styles.nameInitials}>
            <Text style={styles.initials}>{getFirstAndLastName(name)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
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
});

export default AvatarName;
