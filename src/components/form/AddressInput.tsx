import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getCities, getDistricts, getWards, City, District, Ward } from '../../api/address';

interface AddressInputProps {
    city: string;
    setCity: (city: string) => void;
    district: string;
    setDistrict: (district: string) => void;
    ward: string;
    setWard: (ward: string) => void;
    street: string;
    setStreet: (street: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ city, setCity, district, setDistrict, ward, setWard, street, setStreet }) => {
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const citiesData = await getCities();
                setCities(citiesData);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        if (city) {
            const fetchDistricts = async () => {
                try {
                    const districtsData = await getDistricts(city);
                    setDistricts(districtsData);
                } catch (error) {
                    console.error(`Error fetching districts for cityId ${city}:`, error);
                }
            };

            fetchDistricts();
        }
    }, [city]);

    useEffect(() => {
        if (district) {
            const fetchWards = async () => {
                try {
                    const wardsData = await getWards(district);
                    setWards(wardsData);
                } catch (error) {
                    console.error(`Error fetching wards for districtId ${district}:`, error);
                }
            };

            fetchWards();
        }
    }, [district]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>* Tỉnh, thành phố</Text>
            <Picker
                selectedValue={city}
                onValueChange={(itemValue) => setCity(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Chọn tỉnh, thành phố" value="" />
                {cities.map((city) => (
                    <Picker.Item key={city.id} label={city.name} value={city.id} />
                ))}
            </Picker>

            <Text style={styles.label}>* Quận, huyện</Text>
            <Picker
                selectedValue={district}
                onValueChange={(itemValue) => setDistrict(itemValue)}
                enabled={!!city}
                style={styles.picker}
            >
                <Picker.Item label="Chọn quận, huyện" value="" />
                {districts.map((district) => (
                    <Picker.Item key={district.id} label={district.name} value={district.id} />
                ))}
            </Picker>

            <Text style={styles.label}>* Phường, xã</Text>
            <Picker
                selectedValue={ward}
                onValueChange={(itemValue) => setWard(itemValue)}
                enabled={!!district}
                style={styles.picker}
            >
                <Picker.Item label="Chọn phường, xã" value="" />
                {wards.map((ward) => (
                    <Picker.Item key={ward.id} label={ward.name} value={ward.id} />
                ))}
            </Picker>

            <Text style={styles.label}>* Địa chỉ</Text>
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
        padding: 20,
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