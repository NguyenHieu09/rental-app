import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PopoverItem = ({ children }: { children: ReactNode }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
    },
});

export default PopoverItem;
