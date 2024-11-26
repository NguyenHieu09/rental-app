import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    DEFAULT_COLOR,
    getBgColor,
    getBorderColor,
} from '../../utils/colorTag';

const Tag = ({
    children,
    color = DEFAULT_COLOR,
}: {
    children: ReactNode;
    color?: string;
}) => {
    const bgColor = getBgColor(color);
    const borderColor = getBorderColor(color);

    return (
        <View
            style={[
                styles.tag,
                {
                    backgroundColor: bgColor,
                    borderWidth: 1,
                    borderColor: borderColor,
                },
            ]}
        >
            <Text style={[styles.text, { color }]}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tag: {
        paddingInline: 8,
        borderRadius: 4,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    text: {
        fontSize: 12,
        lineHeight: 20,
    },
});

export default Tag;
