import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TextInput,
} from 'react-native';
import {
    getCities,
    getDistricts,
    getWards,
    City,
    District,
    Ward,
} from '../../api/address';
import { Picker } from '@react-native-picker/picker';

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
}

const AddressInput: React.FC<AddressSelectorProps> = ({
    selectedCity,
    setSelectedCity,
    selectedDistrict,
    setSelectedDistrict,
    selectedWard,
    setSelectedWard,
    street,
    setStreet,
    showStreetInput = true, // Default to true if not provided
}) => {
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [loadingCities, setLoadingCities] = useState<boolean>(false);
    const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
    const [loadingWards, setLoadingWards] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            setLoadingCities(true);
            try {
                const citiesData = await getCities();
                setCities(citiesData);
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

    useEffect(() => {
        if (selectedCity) {
            const fetchDistricts = async () => {
                setLoadingDistricts(true);
                try {
                    const districtsData = await getDistricts(selectedCity);
                    setDistricts(districtsData);
                    setErrorMessage(null);
                } catch (error) {
                    setErrorMessage(
                        'Lỗi khi tải quận/huyện. Vui lòng thử lại.',
                    );
                    console.error(
                        `Error fetching districts for cityId ${selectedCity}:`,
                        error,
                    );
                } finally {
                    setLoadingDistricts(false);
                }
            };

            fetchDistricts();
            setWards([]);
            setSelectedWard(undefined, undefined);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                setLoadingWards(true);
                try {
                    const wardsData = await getWards(selectedDistrict);
                    setWards(wardsData);
                    setErrorMessage(null);
                } catch (error) {
                    setErrorMessage('Lỗi khi tải phường/xã. Vui lòng thử lại.');
                    console.error(
                        `Error fetching wards for districtId ${selectedDistrict}:`,
                        error,
                    );
                } finally {
                    setLoadingWards(false);
                }
            };

            fetchWards();
        }
    }, [selectedDistrict]);

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
                            const selectedCityData = cities.find(
                                (city) => city._id === value,
                            );
                            setSelectedCity(
                                value,
                                selectedCityData
                                    ? selectedCityData.name
                                    : undefined,
                            );
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label='Chọn tỉnh, thành phố'
                            value={undefined}
                        />
                        {cities.map((city) => (
                            <Picker.Item
                                key={city._id}
                                label={city.name}
                                value={city._id}
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
                            const selectedDistrictData = districts.find(
                                (district) => district._id === value,
                            );
                            setSelectedDistrict(
                                value,
                                selectedDistrictData
                                    ? selectedDistrictData.name
                                    : undefined,
                            );
                        }}
                        enabled={!!selectedCity}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label='Chọn quận, huyện'
                            value={undefined}
                        />
                        {districts.map((district) => (
                            <Picker.Item
                                key={district._id}
                                label={district.name}
                                value={district._id}
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
                            const selectedWardData = wards.find(
                                (ward) => ward._id === value,
                            );
                            setSelectedWard(
                                value,
                                selectedWardData
                                    ? selectedWardData.name
                                    : undefined,
                            );
                        }}
                        enabled={!!selectedDistrict}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label='Chọn phường, xã'
                            value={undefined}
                        />
                        {wards.map((ward) => (
                            <Picker.Item
                                key={ward._id}
                                label={ward.name}
                                value={ward._id}
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
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
});

export default AddressInput;
