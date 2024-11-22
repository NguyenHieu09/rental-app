import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const TypingIndicator: React.FC = () => {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateDot = (dot: Animated.Value, delay: number) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(dot, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                        delay,
                    }),
                    Animated.timing(dot, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        animateDot(dot1, 0);
        animateDot(dot2, 300);
        animateDot(dot3, 600);
    }, [dot1, dot2, dot3]);

    return (
        <View style={styles.typingIndicatorContainer}>
            <Animated.Text style={[styles.dot, { opacity: dot1 }]}>.</Animated.Text>
            <Animated.Text style={[styles.dot, { opacity: dot2 }]}>.</Animated.Text>
            <Animated.Text style={[styles.dot, { opacity: dot3 }]}>.</Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    typingIndicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align to the left
        // padding: 10,
        backgroundColor: '#f5f5f5',
    },
    dot: {
        fontSize: 36, // Increase the font size
        color: '#888',
        marginHorizontal: 2,
    },
});

export default TypingIndicator;