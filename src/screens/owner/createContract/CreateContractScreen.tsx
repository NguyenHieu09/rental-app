

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SectionList,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format, addMonths, parseISO } from 'date-fns';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import { fetchOwnerProperties, fetchRentersList } from '../../../api/api';
import { generateContract } from '../../../api/contract';
import { RootState } from '../../../redux-toolkit/store';
import { useSelector } from 'react-redux';
import { IGenerateContractRequest } from '../../../types/rentalRequest';
import Button from '../../../components/button/Button';

interface Property {
    propertyId: string;
    title: string;
    slug: string;
    price: number;
    deposit: number;
    minDuration: number;
}

interface Renter {
    userId: string;
    name: string;
    email: string;
}

const CreateContractScreen: React.FC = () => {
    const [contractData, setContractData] = useState<IGenerateContractRequest>({
        propertyId: '',
        renterId: '',
        rentalStartDate: '',
        rentalEndDate: '',
        rentalPrice: 0,
        rentalDeposit: 0,
    });

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [months, setMonths] = useState('');
    const [deposit, setDeposit] = useState('500'); // Default value for deposit
    const [rentalPrice, setRentalPrice] = useState('1000'); // Default value for rental price
    const [loading, setLoading] = useState(false);

    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [propertySearch, setPropertySearch] = useState('');
    const [propertySearchFocused, setPropertySearchFocused] = useState(false);

    const [renters, setRenters] = useState<Renter[]>([]);
    const [filteredRenters, setFilteredRenters] = useState<Renter[]>([]);
    const [renterSearch, setRenterSearch] = useState('');
    const [renterSearchFocused, setRenterSearchFocused] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const loadPropertiesAndRenters = async () => {
            try {
                const ownerProperties = await fetchOwnerProperties();
                setProperties(ownerProperties);
                setFilteredProperties(ownerProperties);

                const rentersList = await fetchRentersList();
                setRenters(rentersList);
                setFilteredRenters(rentersList);
            } catch (error) {
                console.error('Error loading properties and renters:', error);
            }
        };

        loadPropertiesAndRenters();
    }, []);

    const handleChange = (name: string, value: string | number) => {
        setContractData({ ...contractData, [name]: value });
        console.log('Contract Data:', contractData);
    };

    const handleCreate = async () => {
        if (!contractData.propertyId) {
            Alert.alert('Lỗi', 'Vui lòng chọn bất động sản để tạo hợp đồng.');
            return;
        }

        if (!contractData.renterId) {
            Alert.alert('Lỗi', 'Vui lòng chọn người thuê để tạo hợp đồng.');
            return;
        }

        const startDate = parseISO(contractData.rentalStartDate);
        if (isNaN(startDate.getTime())) {
            Alert.alert('Lỗi', 'Ngày bắt đầu không hợp lệ.');
            return;
        }

        const calculatedEndDate = addMonths(startDate, parseInt(months));
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(calculatedEndDate, 'yyyy-MM-dd'); // Định dạng ngày kết thúc


        const updatedContractData = {
            ...contractData,
            rentalStartDate: formattedStartDate,
            rentalEndDate: formattedEndDate,
        };
        setContractData(updatedContractData);

        console.log('Tạo hợp đồng với dữ liệu:', updatedContractData);
        try {
            const generatedContract = await generateContract(updatedContractData);
            console.log('Generated Contract:', generatedContract);
            navigation.navigate('ContractScreen', { contractData: generatedContract });
        } catch (error: any) {
            console.error('Error generating contract:', error);
            Alert.alert('Lỗi', error.message);
        }
    };

    const handleConfirmStartDate = (date: Date) => {
        setStartDate(date);
        setStartDatePickerVisibility(false);
        setContractData({ ...contractData, rentalStartDate: date.toISOString() });

        if (months) {
            const calculatedEndDate = addMonths(date, parseInt(months));
            setEndDate(calculatedEndDate);
            setContractData({ ...contractData, rentalEndDate: calculatedEndDate.toISOString() });
        }
    };

    const handleMonthsChange = (text: string) => {
        setMonths(text);
        if (contractData.rentalStartDate) {
            const startDate = parseISO(contractData.rentalStartDate);
            if (!isNaN(startDate.getTime()) && text) {
                const calculatedEndDate = addMonths(startDate, parseInt(text));
                setEndDate(calculatedEndDate);
                setContractData({ ...contractData, rentalEndDate: calculatedEndDate.toISOString() });
            } else {
                setEndDate(null);
                setContractData({ ...contractData, rentalEndDate: '' });
            }
        }
    };

    const handlePropertySearch = async (text: string) => {
        setPropertySearch(text);
        try {
            const ownerProperties = await fetchOwnerProperties();
            const filtered = ownerProperties.filter((property: Property) =>
                property.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProperties(filtered);
        } catch (error) {
            console.error('Error loading properties:', error);
        }
    };

    const handleRenterSearch = async (text: string) => {
        setRenterSearch(text);
        try {
            const rentersList = await fetchRentersList();
            const filtered = rentersList.filter((renter: Renter) =>
                renter.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredRenters(filtered);
        } catch (error) {
            console.error('Error loading renters:', error);
        }
    };

    const handlePropertySelect = (property: Property) => {
        setContractData({
            ...contractData,
            propertyId: property.propertyId,
            rentalDeposit: property.deposit,
            rentalPrice: property.price,
        });
        setPropertySearch(property.title);
        setDeposit(property.deposit.toString());
        setRentalPrice(property.price.toString());
        setPropertySearchFocused(false);
    };

    const handleRenterSelect = (renter: Renter) => {
        handleChange('renterId', renter.userId);
        setRenterSearch(renter.name);
        setRenterSearchFocused(false);
    };

    const renderHeader = () => (
        <View>
            <Text style={styles.title}>Thông tin hợp đồng</Text>
            <TextInput
                style={[styles.input, { height: 70 }]}
                placeholder="Tìm kiếm bất động sản"
                value={propertySearch}
                multiline={true}
                onChangeText={(text) => {
                    setPropertySearch(text);
                    handlePropertySearch(text);
                }}
                onFocus={() => setPropertySearchFocused(true)}
            />
            {propertySearchFocused && filteredProperties.length > 0 && (
                <SectionList
                    sections={[
                        {
                            title: 'Bất động sản',
                            data: filteredProperties,
                            renderItem: ({ item }: { item: Property }) => (
                                <TouchableOpacity
                                    onPress={() => handlePropertySelect(item)}
                                >
                                    <Text style={styles.listItem}>{item.title}</Text>
                                </TouchableOpacity>
                            ),
                        },
                    ]}
                    keyExtractor={(item) => item.propertyId}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Tìm kiếm người thuê"
                value={renterSearch}
                onChangeText={handleRenterSearch}
                onFocus={() => setRenterSearchFocused(true)}
            />
            {renterSearchFocused && (
                <SectionList
                    sections={[
                        {
                            title: 'Người thuê',
                            data: filteredRenters,
                            renderItem: ({ item }: { item: Renter }) => (
                                <TouchableOpacity
                                    onPress={() => handleRenterSelect(item)}
                                >
                                    <Text style={styles.listItem}>{item.name} - {item.email}</Text>
                                </TouchableOpacity>
                            ),
                        },
                    ]}
                    keyExtractor={(item) => item.userId}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                />
            )}
            <TouchableOpacity style={{ width: '100%' }} onPress={() => setStartDatePickerVisibility(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Ngày bắt đầu"
                    value={startDate ? format(startDate, 'dd/MM/yyyy') : ''}
                    editable={false}
                />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmStartDate}
                onCancel={() => setStartDatePickerVisibility(false)}
                minimumDate={new Date()}
            />
            <TextInput
                style={styles.input}
                placeholder="Số tháng thuê"
                keyboardType="numeric"
                value={months}
                onChangeText={handleMonthsChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Ngày kết thúc"
                value={endDate ? format(endDate, 'dd/MM/yyyy') : ''}
                editable={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Tiền cọc"
                keyboardType="numeric"
                value={deposit}
                onChangeText={(text) => {
                    setDeposit(text);
                    handleChange('rentalDeposit', parseFloat(text));
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Tiền thuê"
                keyboardType="numeric"
                value={rentalPrice}
                onChangeText={(text) => {
                    setRentalPrice(text);
                    handleChange('rentalPrice', parseFloat(text));
                }}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    type="danger"
                    variant="outlined"
                    onPress={() => navigation.goBack()}
                >
                    Hủy
                </Button>
                <Button
                    style={styles.button}
                    type="primary"
                    variant="fill"
                    onPress={handleCreate}
                >
                    Tạo hợp đồng
                </Button>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 20

    },
    button: {
        flex: 1
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    listItem: {
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
});

export default CreateContractScreen;