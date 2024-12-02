import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

const AntFormLabel = ({
    children,
    isRequired,
}: {
    children: ReactNode;
    isRequired?: boolean;
}) => {
    return (
        <Text style={styles.label}>
            {isRequired && <Text style={styles.required}>*</Text>}
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        lineHeight: 22,
        paddingBottom: 8,
    },
    required: {
        color: '#ff4d4f',
        paddingRight: 4,
    },
});

export default AntFormLabel;
