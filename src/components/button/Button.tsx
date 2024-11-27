import React, { ReactNode, useMemo } from 'react';
import {
    ActivityIndicator,
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

const PRIMARY_COLOR = '#1677ff';
const DANGER_COLOR = '#ff4d4f';
const TEXT_COLOR = '#000000e0';
const BORDER_COLOR = 'hsl(240 5.9% 90%)';

const Button = ({
    children,
    type,
    variant,
    disabled,
    style = {},
    textStyle = {},
    loading,
    onPress,
}: {
    children: ReactNode;
    type?: 'primary' | 'danger' | 'default';
    variant?: 'fill' | 'outlined' | 'text';
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
}) => {
    const colorStyle = useMemo(() => {
        if (disabled) {
            return {
                color: 'rgba(0, 0, 0, 0.25)',
            };
        }

        if (variant === 'text' || variant === 'outlined')
            switch (type) {
                case 'primary':
                    return styles.primaryText;
                case 'danger':
                    return styles.dangerText;
                default:
                    return styles.defaultText;
            }

        if (variant === 'fill')
            switch (type) {
                case 'primary':
                    return { color: '#fff' };
                case 'danger':
                    return { color: '#fff' };
                default:
                    return { color: TEXT_COLOR };
            }

        return {};
    }, [type, variant]);

    const buttonStyle = useMemo(() => {
        if (disabled) {
            if (variant === 'fill' || variant === 'outlined')
                return {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderColor: '#d9d9d9',
                };
        }

        if (variant === 'fill')
            switch (type) {
                case 'primary':
                    return {
                        backgroundColor: PRIMARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                    };
                case 'danger':
                    return {
                        backgroundColor: DANGER_COLOR,
                        borderColor: DANGER_COLOR,
                    };
                default:
                    return {
                        backgroundColor: '#000',
                        borderColor: BORDER_COLOR,
                    };
            }

        if (variant === 'outlined')
            switch (type) {
                case 'primary':
                    return {
                        backgroundColor: '#fff',
                        borderColor: PRIMARY_COLOR,
                    };
                case 'danger':
                    return {
                        backgroundColor: '#fff',
                        borderColor: DANGER_COLOR,
                    };
                default:
                    return {
                        backgroundColor: '#fff',
                        borderColor: BORDER_COLOR,
                    };
            }

        return {};
    }, [type, variant]);

    return (
        <TouchableOpacity
            style={[
                styles.button,
                buttonStyle,
                (loading || disabled) && styles.disabled,
                style,
            ]}
            disabled={disabled || loading}
            onPress={onPress}
        >
            {loading && (
                <ActivityIndicator
                    style={{
                        position: 'absolute',
                        left: '50%',
                    }}
                    color={(colorStyle as any)?.color || TEXT_COLOR}
                />
            )}
            <Text
                style={[
                    styles.text,
                    colorStyle,
                    loading && {
                        color: 'transparent',
                    },
                    textStyle,
                ]}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderRadius: 6,
        justifyContent: 'center',
        position: 'relative',
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 22,
    },
    primaryText: {
        color: PRIMARY_COLOR,
    },
    dangerText: {
        color: DANGER_COLOR,
    },
    defaultText: {
        color: TEXT_COLOR,
    },
    opacity0: {
        opacity: 0,
    },
    disabled: {
        opacity: 0.4,
    },
});

export default Button;
