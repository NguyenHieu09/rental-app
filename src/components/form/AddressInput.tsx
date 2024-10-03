import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { getCities, getDistricts, getWards, City, District, Ward } from '../../api/address';
import { Picker } from '@react-native-picker/picker';

interface AddressSelectorProps {
    selectedCity: string | undefined;
    setSelectedCity: (value: string | undefined) => void;
    selectedDistrict: string | undefined;
    setSelectedDistrict: (value: string | undefined) => void;
    selectedWard: string | undefined;
    setSelectedWard: (value: string | undefined) => void;
    street: string;
    setStreet: (value: string) => void;
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
}) => {
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [loadingCities, setLoadingCities] = useState<boolean>(false);
    const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
    const [loadingWards, setLoadingWards] = useState<boolean>(false);

    useEffect(() => {
        const fetchCities = async () => {
            setLoadingCities(true);
            try {
                const citiesData = await getCities();
                setCities(citiesData);
            } catch (error) {
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
                } catch (error) {
                    console.error(`Error fetching districts for cityId ${selectedCity}:`, error);
                } finally {
                    setLoadingDistricts(false);
                }
            };

            fetchDistricts();
            setWards([]);
            setSelectedWard(undefined);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                setLoadingWards(true);
                try {
                    const wardsData = await getWards(selectedDistrict);
                    setWards(wardsData);
                } catch (error) {
                    console.error(`Error fetching wards for districtId ${selectedDistrict}:`, error);
                } finally {
                    setLoadingWards(false);
                }
            };

            fetchWards();
        }
    }, [selectedDistrict]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tỉnh/Thành phố:</Text>
            {loadingCities ? (
                <ActivityIndicator />
            ) : (
                <Picker
                    selectedValue={selectedCity}
                    onValueChange={(value) => setSelectedCity(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a city" value={undefined} />
                    {cities.map((city) => (
                        <Picker.Item key={city._id} label={city.name} value={city._id} />
                    ))}
                </Picker>
            )}

            <Text style={styles.label}>Quận/huyện:</Text>
            {loadingDistricts ? (
                <ActivityIndicator />
            ) : (
                <Picker
                    selectedValue={selectedDistrict}
                    onValueChange={(value) => setSelectedDistrict(value)}
                    enabled={!!selectedCity}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a district" value={undefined} />
                    {districts.map((district) => (
                        <Picker.Item key={district._id} label={district.name} value={district._id} />
                    ))}
                </Picker>
            )}

            <Text style={styles.label}>Phường/xã:</Text>
            {loadingWards ? (
                <ActivityIndicator />
            ) : (
                <Picker
                    selectedValue={selectedWard}
                    onValueChange={(value) => setSelectedWard(value)}
                    enabled={!!selectedDistrict}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a ward" value={undefined} />
                    {wards.map((ward) => (
                        <Picker.Item key={ward._id} label={ward.name} value={ward._id} />
                    ))}
                </Picker>
            )}

            <Text style={styles.label}>Địa chỉ:</Text>
            <TextInput
                style={styles.input}
                placeholder="Vui lòng nhập địa chỉ"
                value={street}
                onChangeText={setStreet}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});

export default AddressInput;
