import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {
    City,
    District,
    getCities,
    getDistricts,
    getWards,
    Ward,
} from '../../api/address';
import { lngLatToAddressService } from '../../api/goong';
import { ICoordinate } from '../map/Map';

interface AddressSelectorProps {
    selectedCity: string | undefined;
    setSelectedCity: (
        value: string | undefined,
        name: string | undefined,
    ) => void;
    selectedDistrict: string | undefined;
    setSelectedDistrict: (
        value: string | undefined,
        name: string | undefined,
    ) => void;
    selectedWard: string | undefined;
    setSelectedWard: (
        value: string | undefined,
        name: string | undefined,
    ) => void;
    street: string;
    setStreet: (value: string) => void;
    showStreetInput?: boolean;
    coordinate?: ICoordinate;
}

const AddressInput: React.FC<AddressSelectorProps> = ({
    coordinate,
    selectedCity,
    setSelectedCity,
    selectedDistrict,
    setSelectedDistrict,
    selectedWard,
    setSelectedWard,
    street,
    setStreet,
    showStreetInput = true,
}) => {
    console.log('🚀 ~ selectedCity:', selectedCity);
    console.log('🚀 ~ selectedWard:', selectedWard);
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [loadingCities, setLoadingCities] = useState<boolean>(false);
    const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
    const [loadingWards, setLoadingWards] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [cityNameToIdMap, setCityNameToIdMap] = useState<{
        [key: string]: string;
    }>({});
    const [districtNameToIdMap, setDistrictNameToIdMap] = useState<{
        [key: string]: string;
    }>({});
    const fullChange = useRef<Boolean>(false);
    const coordinateRef = useRef<ICoordinate | undefined>(coordinate);

    const handleFullChange = useCallback(async (coordinate: ICoordinate) => {
        fullChange.current = true;

        const res = await lngLatToAddressService([
            coordinate.latitude,
            coordinate.longitude,
        ]);

        const address = res.results.find(
            (r) => r.address_components.length > 3,
        );
        console.log('🚀 ~ handleFullChange ~ address:', address);

        if (!address) {
            return;
        }

        const addressComponents = address.address_components;

        const addressComponentsDesc = addressComponents.reverse();
        const [city, district, ward, ...restAddress] = addressComponentsDesc;

        const citiesData = await getCities();
        setCities(citiesData);
        const nameToIdMap = citiesData.reduce((map, city) => {
            map[city.name] = city._id;
            return map;
        }, {} as { [key: string]: string });
        setCityNameToIdMap(nameToIdMap);
        const cityFind = citiesData.find((c) =>
            c.name.toLowerCase().includes(city.short_name.toLowerCase()),
        );
        console.log('🚀 ~ handleFullChange ~ cityFind:', cityFind);
        const cityId = cityFind?._id;
        // form.setFieldValue('city', cityId);

        if (!cityId) {
            return;
        }

        setSelectedCity(cityFind.name, cityFind.name);

        const districtsData = await getDistricts(cityId);
        setDistricts(districtsData);
        const districtsNameToIdMap = districtsData.reduce((map, district) => {
            map[district.name] = district._id;
            return map;
        }, {} as { [key: string]: string });
        setDistrictNameToIdMap(districtsNameToIdMap);

        const districtFind = districtsData.find((d) =>
            d.name.toLowerCase().includes(district.short_name.toLowerCase()),
        );
        console.log('🚀 ~ handleFullChange ~ districtFind:', districtFind);
        const districtId = districtFind?._id;

        if (!districtId) {
            return;
        }

        setSelectedDistrict(districtFind.name, districtFind.name);

        const wardsData = await getWards(districtId);
        console.log(
            '🚀 ~ handleFullChange ~ ward.short_name:',
            ward.short_name,
        );
        setWards(wardsData); // Set the wards based on the district

        const wardFind = wardsData.find((w) =>
            w.name.toLowerCase().includes(ward.short_name.toLowerCase()),
        );
        console.log('🚀 ~ handleFullChange ~ wardFind:', wardFind);
        const wardId = wardFind?._id;

        if (!wardId) {
            return;
        }

        console.log('wardFind.name', wardFind.name);
        setSelectedWard(wardFind.name, wardFind.name);

        setStreet(restAddress.map((a) => a.short_name).join(' '));
        console.log(
            "restAddress.map((a) => a.short_name).join(' ')",
            restAddress.map((a) => a.short_name).join(' '),
        );
    }, []);

    // Fetch cities with their IDs
    useEffect(() => {
        const fetchCities = async () => {
            setLoadingCities(true);
            try {
                const citiesData = await getCities();
                setCities(citiesData);
                const nameToIdMap = citiesData.reduce((map, city) => {
                    map[city.name] = city._id;
                    return map;
                }, {} as { [key: string]: string });
                setCityNameToIdMap(nameToIdMap);
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage('Lỗi khi tải thành phố. Vui lòng thử lại.');
                console.error('Error fetching cities:', error);
            } finally {
                setLoadingCities(false);
            }
        };

        fetchCities();
    }, []);

    // Fetch districts when a city is selected
    useEffect(() => {
        console.log('selectedCity', selectedCity);
        if (fullChange.current) {
            return;
        }

        if (selectedCity) {
            const cityId = cityNameToIdMap[selectedCity];
            if (cityId) {
                const fetchDistricts = async () => {
                    setLoadingDistricts(true);
                    try {
                        // Fetch districts using the ID of the selected city
                        const districtsData = await getDistricts(cityId);
                        setDistricts(districtsData);
                        const nameToIdMap = districtsData.reduce(
                            (map, district) => {
                                map[district.name] = district._id;
                                return map;
                            },
                            {} as { [key: string]: string },
                        );
                        setDistrictNameToIdMap(nameToIdMap);
                        setErrorMessage(null);
                    } catch (error) {
                        setErrorMessage(
                            'Lỗi khi tải quận/huyện. Vui lòng thử lại.',
                        );
                        console.error(
                            `Error fetching districts for city ID ${cityId}:`,
                            error,
                        );
                    } finally {
                        setLoadingDistricts(false);
                    }
                };

                fetchDistricts();
                setWards([]); // Reset wards when city changes
                setSelectedWard(undefined, undefined); // Reset ward selection
            }
        } else {
            setDistricts([]); // Reset districts when city is not selected
            setWards([]); // Reset wards when city changes
            setSelectedDistrict(undefined, undefined); // Reset district selection
            setSelectedWard(undefined, undefined); // Reset ward selection
        }
    }, [selectedCity, cityNameToIdMap]);

    useEffect(() => {
        if (fullChange.current) {
            return;
        }

        // Khi quận thay đổi, reset selectedWard về undefined để tránh chọn xã cũ
        setSelectedWard(undefined, undefined);

        if (selectedDistrict && selectedCity) {
            const districtId = districtNameToIdMap[selectedDistrict];
            if (districtId) {
                const fetchWards = async () => {
                    setLoadingWards(true);
                    try {
                        // Fetch wards based on the selected district's ID
                        const wardsData = await getWards(districtId);
                        setWards(wardsData); // Set the wards based on the district
                        setErrorMessage(null);

                        // Nếu có dữ liệu phường mặc định, set lại selectedWard
                        // if (wardsData.length > 0) {
                        //     setSelectedWard(wardsData[0].name, wardsData[0]._id); // set default ward (first ward)
                        // }
                    } catch (error) {
                        setErrorMessage(
                            'Lỗi khi tải phường/xã. Vui lòng thử lại.',
                        );
                        console.error(
                            `Error fetching wards for district ID ${districtId}:`,
                            error,
                        );
                    } finally {
                        setLoadingWards(false);
                    }
                };

                fetchWards();
            }
        } else {
            setWards([]); // Reset wards when district is not selected
            setSelectedWard(undefined, undefined); // Reset ward selection
        }
    }, [selectedDistrict, districtNameToIdMap, selectedCity]);

    useEffect(() => {
        console.log('🚀 ~ useEffect ~ coordinate:', coordinate);
        if (!coordinate) {
            return;
        }

        if (coordinateRef.current) {
            if (
                coordinateRef.current.latitude === coordinate.latitude &&
                coordinateRef.current.longitude === coordinate.longitude
            ) {
                return;
            }
        }

        coordinateRef.current = coordinate;
        handleFullChange(coordinate);
    }, [coordinate]);

    useEffect(() => {
        if (street) {
            fullChange.current = false;
        }
    }, [street]);

    return (
        <View style={styles.container}>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

            <Text style={styles.label}>Tỉnh, thành phố</Text>
            {loadingCities ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCity}
                        onValueChange={(value) => {
                            if (value === '~~~') {
                                setSelectedCity(undefined, undefined);
                                return;
                            }

                            console.log('🚀 ~ value:', value);
                            setSelectedCity(value, value); // Save city id and name
                            setSelectedDistrict(undefined, undefined);
                            setSelectedWard(undefined, undefined);
                            setDistricts([]);
                            setWards([]);
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item label='Chọn tỉnh, thành phố' value='~~~' />
                        {cities.map((city) => (
                            <Picker.Item
                                key={city._id}
                                label={city.name}
                                value={city.name} // Display city name
                            />
                        ))}
                    </Picker>
                </View>
            )}

            <Text style={styles.label}>Quận, huyện</Text>
            {loadingDistricts ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedDistrict}
                        onValueChange={(value) => {
                            if (value === '~~~') {
                                setSelectedDistrict(undefined, undefined);
                                return;
                            }

                            setSelectedDistrict(value, value); // Save district id and name
                            setSelectedWard(undefined, undefined);
                            setWards([]);
                        }}
                        enabled={!!selectedCity}
                        style={styles.picker}
                    >
                        <Picker.Item label='Chọn quận, huyện' value='~~~' />
                        {districts.map((district) => (
                            <Picker.Item
                                key={district._id}
                                label={district.name}
                                value={district.name} // Display district name
                            />
                        ))}
                    </Picker>
                </View>
            )}

            <Text style={styles.label}>Phường, xã</Text>
            {loadingWards ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedWard}
                        onValueChange={(value) => {
                            if (value === '~~~') {
                                setSelectedWard(undefined, undefined);
                                return;
                            }

                            setSelectedWard(value, value); // Save ward id and name
                        }}
                        enabled={!!selectedDistrict}
                        style={styles.picker}
                    >
                        <Picker.Item label='Chọn phường, xã' value='~~~' />
                        {wards.map((ward) => (
                            <Picker.Item
                                key={ward._id}
                                label={ward.name}
                                value={ward.name} // Display ward name
                            />
                        ))}
                    </Picker>
                </View>
            )}

            {showStreetInput && (
                <>
                    <Text style={styles.label}>Địa chỉ:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Vui lòng nhập địa chỉ'
                        value={street}
                        onChangeText={setStreet}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    picker: {
        height: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        height: 50,
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
});

export default AddressInput;
