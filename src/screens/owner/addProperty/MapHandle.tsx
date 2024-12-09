import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import React, {
    Dispatch,
    forwardRef,
    SetStateAction,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MapPressEvent } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../../components/button/Button';
import Map, { ICoordinate } from '../../../components/map/Map';

const MapHandle = (
    {
        coordinate,
        handleConfirm,
        onShowMap,
        setCoordinate,
    }: {
        coordinate: ICoordinate | undefined;
        handleConfirm: (coordinate: ICoordinate | undefined) => void;
        onShowMap?: () => void;
        setCoordinate: Dispatch<SetStateAction<ICoordinate | undefined>>;
    },
    ref: any,
) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();
    // const [coordinateInternal, setCoordinateInternal] = useState<ICoordinate>();
    console.log('🚀 ~ MapHandle ~ coordinate:', coordinate);
    const [index, setIndex] = useState(-1);
    const mapRef = useRef<any>(null);

    const handleShow = useCallback(() => {
        console.log('🚀 ~ handleShow ~ onShowMap');
        onShowMap?.();
        if (coordinate) mapRef.current?.animateToRegion(coordinate);
        bottomSheetRef.current?.present();
    }, []);

    const handleClose = useCallback(() => {
        bottomSheetRef.current?.dismiss();
    }, []);

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                pressBehavior='close'
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                opacity={0.5}
            />
        ),
        [],
    );

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        setCoordinate({
            latitude,
            longitude,
        });
        mapRef.current?.animateToRegion({
            latitude,
            longitude,
        } as any);
    };

    const handleChangeCoordinate = (e: MapPressEvent) => {
        console.log('🚀 ~ handleChangeCoordinate ~ e:', e);
        setCoordinate(e.nativeEvent.coordinate);
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                setCoordinate,
                animateToRegion: mapRef.current?.animateToRegion,
            };
        },
        [],
    );

    useEffect(() => {
        setCoordinate((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(coordinate)) {
                return coordinate;
            }

            return prev;
        });
    }, [coordinate]);

    return (
        <>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}
                onPress={handleShow}
            >
                <Text
                    style={{
                        color: '#007BFF',
                    }}
                >
                    Chọn trên bản đồ
                </Text>
            </TouchableOpacity>
            <BottomSheetModal
                enablePanDownToClose
                ref={bottomSheetRef}
                index={0}
                // topInset={top}
                backdropComponent={renderBackdrop}
                onChange={(index) => {
                    setIndex(index);
                }}
            >
                <BottomSheetScrollView
                    contentContainerStyle={[
                        {
                            marginTop: 8,
                            paddingBottom: bottom + 12,
                            paddingHorizontal: 12,
                        },
                    ]}
                >
                    <View
                        style={{
                            width: '100%',
                            aspectRatio: 9 / 16,
                            backgroundColor: '#000',
                            marginBottom: 12,
                            position: 'relative',
                        }}
                    >
                        {index >= 0 && (
                            <Map
                                coordinate={coordinate}
                                onPress={handleChangeCoordinate}
                                ref={mapRef}
                            />
                        )}
                        <View
                            style={{
                                position: 'absolute',
                                left: 8,
                                top: 8,
                            }}
                        >
                            <TouchableOpacity
                                onPress={getLocation}
                                style={{
                                    backgroundColor: '#fff',
                                    width: 32,
                                    height: 32,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 6,
                                    borderWidth: 1,
                                    borderColor: '#d9d9d9',
                                }}
                            >
                                <MaterialIcons
                                    name='location-searching'
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 12,
                        }}
                    >
                        <Button
                            style={{ flex: 1 }}
                            type='default'
                            variant='outlined'
                            onPress={handleClose}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{ flex: 1 }}
                            type='primary'
                            variant='fill'
                            onPress={() => {
                                console.log('🚀 ~ Handle confirm');
                                handleConfirm(coordinate);
                                handleClose();
                            }}
                        >
                            Xác nhận
                        </Button>
                    </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </>
    );
};

export default forwardRef(MapHandle);
