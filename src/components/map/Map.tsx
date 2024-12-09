import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

export interface ICoordinate {
    latitude: number;
    longitude: number;
}

const initialRegion = {
    latitude: 10.8221767,
    longitude: 106.6868367,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const Map = (
    {
        coordinate,
        onPress,
    }: {
        coordinate?: ICoordinate;
        onPress?: (e: MapPressEvent) => void;
    },
    parentRef: any,
) => {
    console.log('🚀 ~ coordinate:', coordinate);
    const ref = useRef<MapView>(null);

    useImperativeHandle(
        parentRef,
        () => {
            return {
                animateToRegion: (region: ICoordinate) => {
                    ref.current?.animateToRegion({
                        ...region,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                },
            };
        },
        [],
    );

    return (
        <MapView
            ref={ref}
            initialRegion={{
                ...initialRegion,
                ...(coordinate || {}),
            }}
            style={{
                width: '100%',
                height: '100%',
            }}
            onPress={onPress}
        >
            {coordinate && (
                <Marker coordinate={coordinate} style={{ zIndex: 1 }} />
            )}
        </MapView>
    );
};

export default forwardRef(Map);
