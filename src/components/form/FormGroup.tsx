import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntFormLabel from './AntFormLabel';

const FormGroup = ({
    children,
    label,
    error,
    isRequired,
}: {
    label: string;
    isRequired?: boolean;
    children: ReactNode;
    error?: string;
}) => {
    return (
        <View style={styles.container}>
            <AntFormLabel isRequired={isRequired}>{label}</AntFormLabel>
            {children}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    error: {
        fontSize: 14,
        lineHeight: 22,
        color: '#ff4d4f',
    },
});

export default FormGroup;
