import React, { forwardRef } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface CameraViewProps extends ViewProps {
    type: 'front' | 'back';
}

const CameraView = forwardRef<View, CameraViewProps>((props, ref) => {
    return <View style={[styles.camera, props.style]} ref={ref}>{props.children}</View>;
});

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export default CameraView;