import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

const FormLabel = ({
    children,
    isError,
}: {
    children: ReactNode;
    isError?: boolean;
}) => {
    return (
        <Text
            style={[
                styles.label,
                {
                    color: isError ? 'red' : 'black',
                },
            ]}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 8,
    },
});

export default FormLabel;
