// // // import React, { useState } from 'react';
// // // import {
// // //     Modal,
// // //     View,
// // //     Text,
// // //     TextInput,
// // //     TouchableOpacity,
// // //     StyleSheet,
// // //     Alert,
// // // } from 'react-native';

// // // interface CreateContractModalProps {
// // //     visible: boolean;
// // //     onClose: () => void;
// // //     onCreate: (contractData: any) => void;
// // // }

// // // const CreateContractModal: React.FC<CreateContractModalProps> = ({
// // //     visible,
// // //     onClose,
// // //     onCreate,
// // // }) => {
// // //     const [contractData, setContractData] = useState({
// // //         propertyId: '',
// // //         renterId: '',
// // //         startDate: '',
// // //         endDate: '',
// // //         monthlyRent: '',
// // //         depositAmount: '',
// // //     });

// // //     const handleChange = (name: string, value: string) => {
// // //         setContractData({ ...contractData, [name]: value });
// // //     };

// // //     const handleCreate = () => {
// // //         if (
// // //             !contractData.propertyId ||
// // //             !contractData.renterId ||
// // //             !contractData.startDate ||
// // //             !contractData.endDate ||
// // //             !contractData.monthlyRent ||
// // //             !contractData.depositAmount
// // //         ) {
// // //             Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
// // //             return;
// // //         }
// // //         onCreate(contractData);
// // //         onClose();
// // //     };

// // //     return (
// // //         <Modal visible={visible} transparent={true} animationType="slide">
// // //             <View style={styles.modalContainer}>
// // //                 <View style={styles.modalContent}>
// // //                     <Text style={styles.modalTitle}>Thông tin hợp đồng</Text>
// // //                     <TextInput
// // //                         style={styles.input}
// // //                         placeholder="Mã tài sản"
// // //                         value={contractData.propertyId}
// // //                         onChangeText={(text) => handleChange('propertyId', text)}
// // //                     />
// // //                     <TextInput
// // //                         style={styles.input}
// // //                         placeholder="Mã người thuê"
// // //                         value={contractData.renterId}
// // //                         onChangeText={(text) => handleChange('renterId', text)}
// // //                     />
// // //                     <TextInput
// // //                         style={styles.input}
// // //                         placeholder="Ngày bắt đầu"
// // //                         value={contractData.startDate}
// // //                         onChangeText={(text) => handleChange('startDate', text)}
// // //                     />
// // //                     <TextInput
// // //                         style={styles.input}
// // //                         placeholder="Ngày kết thúc"
// // //                         value={contractData.endDate}
// // //                         onChangeText={(text) => handleChange('endDate', text)}
// // //                     />
// // //                     <TextInput
// // //                         style={styles.input}
// // //                         placeholder="Giá thuê hàng tháng"
// // //                         value={contractData.monthlyRent}
// // //                         onChangeText={(text) => handleChange('monthlyRent', text)}
// // //                     />
// // //                     <TextInput
// // //                         style={styles.input}
// // //                         placeholder="Tiền cọc"
// // //                         value={contractData.depositAmount}
// // //                         onChangeText={(text) => handleChange('depositAmount', text)}
// // //                     />
// // //                     <View style={styles.buttonContainer}>
// // //                         <TouchableOpacity
// // //                             style={[styles.button, styles.cancelButton]}
// // //                             onPress={onClose}
// // //                         >
// // //                             <Text style={styles.buttonText}>Hủy</Text>
// // //                         </TouchableOpacity>
// // //                         <TouchableOpacity
// // //                             style={[styles.button, styles.createButton]}
// // //                             onPress={handleCreate}
// // //                         >
// // //                             <Text style={styles.buttonText}>Tạo</Text>
// // //                         </TouchableOpacity>
// // //                     </View>
// // //                 </View>
// // //             </View>
// // //         </Modal>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     modalContainer: {
// // //         flex: 1,
// // //         justifyContent: 'center',
// // //         alignItems: 'center',
// // //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // //     },
// // //     modalContent: {
// // //         width: '80%',
// // //         backgroundColor: 'white',
// // //         borderRadius: 10,
// // //         padding: 20,
// // //         alignItems: 'center',
// // //     },
// // //     modalTitle: {
// // //         fontSize: 18,
// // //         fontWeight: 'bold',
// // //         marginBottom: 20,
// // //     },
// // //     input: {
// // //         width: '100%',
// // //         borderWidth: 1,
// // //         borderColor: '#ccc',
// // //         borderRadius: 5,
// // //         padding: 10,
// // //         marginBottom: 10,
// // //     },
// // //     buttonContainer: {
// // //         flexDirection: 'row',
// // //         justifyContent: 'space-between',
// // //         width: '100%',
// // //     },
// // //     button: {
// // //         flex: 1,
// // //         padding: 10,
// // //         borderRadius: 5,
// // //         alignItems: 'center',
// // //     },
// // //     cancelButton: {
// // //         backgroundColor: '#ccc',
// // //         marginRight: 10,
// // //     },
// // //     createButton: {
// // //         backgroundColor: '#007BFF',
// // //     },
// // //     buttonText: {
// // //         color: 'white',
// // //         fontWeight: 'bold',
// // //     },
// // // });

// // // export default CreateContractModal;


// // import { format } from 'date-fns';
// // import React, { useState } from 'react';
// // import {
// //     Modal,
// //     View,
// //     Text,
// //     TextInput,
// //     TouchableOpacity,
// //     StyleSheet,
// //     Alert,
// // } from 'react-native';
// // import DateTimePickerModal from 'react-native-modal-datetime-picker';

// // interface CreateContractModalProps {
// //     visible: boolean;
// //     onClose: () => void;
// //     onCreate: (contractData: any) => void;
// // }

// // const CreateContractModal: React.FC<CreateContractModalProps> = ({
// //     visible,
// //     onClose,
// //     onCreate,
// // }) => {
// //     const [contractData, setContractData] = useState({
// //         propertyId: '',
// //         renterId: '',
// //         startDate: '',
// //         endDate: '',
// //         monthlyRent: '',
// //         depositAmount: '',
// //     });

// //     const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
// //     const [startDate, setStartDate] = useState<Date | null>(null);
// //     const [months, setMonths] = useState('');
// //     const [endDate, setEndDate] = useState<Date | null>(null);
// //     const [deposit, setDeposit] = useState('');
// //     const [rentalPrice, setRentalPrice] = useState('');
// //     const [loading, setLoading] = useState(false);

// //     const handleChange = (name: string, value: string) => {
// //         setContractData({ ...contractData, [name]: value });
// //     };

// //     const handleCreate = () => {
// //         if (
// //             !contractData.propertyId ||
// //             !contractData.renterId ||
// //             !contractData.startDate ||
// //             !contractData.endDate ||
// //             !contractData.monthlyRent ||
// //             !contractData.depositAmount
// //         ) {
// //             Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
// //             return;
// //         }
// //         onCreate(contractData);
// //         onClose();
// //     };

// //     const handleConfirmStartDate = (date: Date) => {
// //         setStartDate(date);
// //         setStartDatePickerVisibility(false);
// //     };

// //     return (
// //         <Modal visible={visible} transparent={true} animationType="slide">
// //             <View style={styles.modalContainer}>
// //                 <View style={styles.modalContent}>
// //                     <Text style={styles.modalTitle}>Thông tin hợp đồng</Text>

// //                     <TouchableOpacity style={{ width: '100%' }} onPress={() => setStartDatePickerVisibility(true)}>
// //                         <TextInput
// //                             style={styles.input}
// //                             placeholder="Ngày bắt đầu"
// //                             value={startDate ? format(startDate, 'dd/MM/yyyy') : ''}
// //                             editable={false}
// //                         />
// //                     </TouchableOpacity>
// //                     <DateTimePickerModal
// //                         isVisible={isStartDatePickerVisible}
// //                         mode="date"
// //                         onConfirm={handleConfirmStartDate}
// //                         onCancel={() => setStartDatePickerVisibility(false)}
// //                         minimumDate={new Date()}
// //                     />
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Số tháng thuê"
// //                         keyboardType="numeric"
// //                         value={months}
// //                         onChangeText={(text) => setMonths(text)}
// //                     />
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Ngày kết thúc"
// //                         value={endDate ? format(endDate, 'dd/MM/yyyy') : ''}
// //                         editable={false}
// //                     />
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Tiền cọc"
// //                         keyboardType="numeric"
// //                         value={deposit}
// //                         onChangeText={(text) => setDeposit(text)}
// //                     />
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Tiền thuê"
// //                         keyboardType="numeric"
// //                         value={rentalPrice}
// //                         onChangeText={(text) => setRentalPrice(text)}
// //                     />
// //                     <View style={styles.buttonContainer}>
// //                         <TouchableOpacity
// //                             style={[styles.button, styles.cancelButton]}
// //                             onPress={onClose}
// //                         >
// //                             <Text style={styles.buttonText}>Hủy</Text>
// //                         </TouchableOpacity>
// //                         <TouchableOpacity
// //                             style={[styles.button, styles.createButton]}
// //                             onPress={handleCreate}
// //                         >
// //                             <Text style={styles.buttonText}>Tạo</Text>
// //                         </TouchableOpacity>
// //                     </View>
// //                 </View>
// //             </View>
// //         </Modal>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     modalContainer: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     },
// //     modalContent: {
// //         width: '80%',
// //         backgroundColor: 'white',
// //         borderRadius: 10,
// //         padding: 20,
// //         alignItems: 'center',
// //     },
// //     modalTitle: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         marginBottom: 20,
// //     },
// //     input: {
// //         width: '100%',
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         padding: 10,
// //         marginBottom: 10,
// //     },
// //     buttonContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         width: '100%',
// //     },
// //     button: {
// //         flex: 1,
// //         padding: 10,
// //         borderRadius: 5,
// //         alignItems: 'center',
// //     },
// //     cancelButton: {
// //         backgroundColor: '#ccc',
// //         marginRight: 10,
// //     },
// //     createButton: {
// //         backgroundColor: '#007BFF',
// //     },
// //     buttonText: {
// //         color: 'white',
// //         fontWeight: 'bold',
// //     },
// // });

// // export default CreateContractModal;


// import React, { useEffect, useState } from 'react';
// import {
//     Modal,
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     Alert,
//     ScrollView,
// } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { fetchOwnerProperties, fetchRentersList } from '../../api/api';
// import { format } from 'date-fns';
// import { Picker } from '@react-native-picker/picker';

// interface CreateContractModalProps {
//     visible: boolean;
//     onClose: () => void;
//     onCreate: (contractData: any) => void;
// }

// interface Property {
//     propertyId: string;
//     title: string;
//     slug: string;
//     price: number;
//     deposit: number;
//     minDuration: number;
// }

// interface Renter {
//     userId: string;
//     name: string;
//     email: string;
// }

// const CreateContractModal: React.FC<CreateContractModalProps> = ({
//     visible,
//     onClose,
//     onCreate,
// }) => {
//     const [contractData, setContractData] = useState({
//         propertyId: '',
//         renterId: '',
//         startDate: '',
//         endDate: '',
//         monthlyRent: '',
//         depositAmount: '',
//     });

//     const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);
//     const [months, setMonths] = useState('');
//     const [deposit, setDeposit] = useState('');
//     const [rentalPrice, setRentalPrice] = useState('');
//     const [loading, setLoading] = useState(false);

//     const [properties, setProperties] = useState<Property[]>([]);
//     const [renters, setRenters] = useState<Renter[]>([]);

//     useEffect(() => {
//         const loadPropertiesAndRenters = async () => {
//             try {
//                 const ownerProperties = await fetchOwnerProperties();
//                 setProperties(ownerProperties);

//                 const rentersList = await fetchRentersList();
//                 setRenters(rentersList);
//             } catch (error) {
//                 console.error('Error loading properties and renters:', error);
//             }
//         };

//         loadPropertiesAndRenters();
//     }, []);

//     const handleChange = (name: string, value: string) => {
//         setContractData({ ...contractData, [name]: value });
//     };

//     const handleCreate = () => {
//         if (
//             !contractData.propertyId ||
//             !contractData.renterId ||
//             !contractData.startDate ||
//             !contractData.endDate ||
//             !contractData.monthlyRent ||
//             !contractData.depositAmount
//         ) {
//             Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
//             return;
//         }
//         onCreate(contractData);
//         onClose();
//     };

//     const handleConfirmStartDate = (date: Date) => {
//         setStartDate(date);
//         setStartDatePickerVisibility(false);
//     };

//     return (
//         <Modal visible={visible} transparent={true} animationType="slide">
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <Text style={styles.modalTitle}>Thông tin hợp đồng</Text>
//                     <ScrollView style={{ width: '100%' }}>
//                         <Picker
//                             selectedValue={contractData.propertyId}
//                             onValueChange={(itemValue) => handleChange('propertyId', itemValue)}
//                             style={styles.picker}
//                         >
//                             <Picker.Item label="Chọn bất động sản" value="" />
//                             {properties.map((property) => (
//                                 <Picker.Item
//                                     key={property.propertyId}
//                                     label={property.title}
//                                     value={property.propertyId}
//                                 />
//                             ))}
//                         </Picker>
//                         <Picker
//                             selectedValue={contractData.renterId}
//                             onValueChange={(itemValue) => handleChange('renterId', itemValue)}
//                             style={styles.picker}
//                         >
//                             <Picker.Item label="Chọn người thuê" value="" />
//                             {renters.map((renter) => (
//                                 <Picker.Item
//                                     key={renter.userId}
//                                     label={renter.name}
//                                     value={renter.userId}
//                                 />
//                             ))}
//                         </Picker>
//                         <TouchableOpacity style={{ width: '100%' }} onPress={() => setStartDatePickerVisibility(true)}>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Ngày bắt đầu"
//                                 value={startDate ? format(startDate, 'dd/MM/yyyy') : ''}
//                                 editable={false}
//                             />
//                         </TouchableOpacity>
//                         <DateTimePickerModal
//                             isVisible={isStartDatePickerVisible}
//                             mode="date"
//                             onConfirm={handleConfirmStartDate}
//                             onCancel={() => setStartDatePickerVisibility(false)}
//                             minimumDate={new Date()}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Số tháng thuê"
//                             keyboardType="numeric"
//                             value={months}
//                             onChangeText={(text) => setMonths(text)}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Ngày kết thúc"
//                             value={endDate ? format(endDate, 'dd/MM/yyyy') : ''}
//                             editable={false}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Tiền cọc"
//                             keyboardType="numeric"
//                             value={deposit}
//                             onChangeText={(text) => setDeposit(text)}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Tiền thuê"
//                             keyboardType="numeric"
//                             value={rentalPrice}
//                             onChangeText={(text) => setRentalPrice(text)}
//                         />
//                     </ScrollView>
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity
//                             style={[styles.button, styles.cancelButton]}
//                             onPress={onClose}
//                         >
//                             <Text style={styles.buttonText}>Hủy</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={[styles.button, styles.createButton]}
//                             onPress={handleCreate}
//                         >
//                             <Text style={styles.buttonText}>Tạo</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         width: '100%',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//     },
//     picker: {
//         width: '100%',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     button: {
//         flex: 1,
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     cancelButton: {
//         backgroundColor: '#ccc',
//         marginRight: 10,
//     },
//     createButton: {
//         backgroundColor: '#007BFF',
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });

// export default CreateContractModal;


import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { fetchOwnerProperties, fetchRentersList } from '../../api/api';
import { format } from 'date-fns';

interface CreateContractModalProps {
    visible: boolean;
    onClose: () => void;
    onCreate: (contractData: any) => void;
}

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

const CreateContractModal: React.FC<CreateContractModalProps> = ({
    visible,
    onClose,
    onCreate,
}) => {
    const [contractData, setContractData] = useState({
        propertyId: '',
        renterId: '',
        startDate: '',
        endDate: '',
        monthlyRent: '',
        depositAmount: '',
    });

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [months, setMonths] = useState('');
    const [deposit, setDeposit] = useState('');
    const [rentalPrice, setRentalPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [propertySearch, setPropertySearch] = useState('');
    const [propertySearchFocused, setPropertySearchFocused] = useState(false);

    const [renters, setRenters] = useState<Renter[]>([]);
    const [filteredRenters, setFilteredRenters] = useState<Renter[]>([]);
    const [renterSearch, setRenterSearch] = useState('');
    const [renterSearchFocused, setRenterSearchFocused] = useState(false);

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

    const handleChange = (name: string, value: string) => {
        setContractData({ ...contractData, [name]: value });
    };

    const handleCreate = () => {
        if (
            !contractData.propertyId ||
            !contractData.renterId ||
            !contractData.startDate ||
            !contractData.endDate ||
            !contractData.monthlyRent ||
            !contractData.depositAmount
        ) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        onCreate(contractData);
        onClose();
    };

    const handleConfirmStartDate = (date: Date) => {
        setStartDate(date);
        setStartDatePickerVisibility(false);
    };

    const handlePropertySearch = (text: string) => {
        setPropertySearch(text);
        const filtered = properties.filter((property) =>
            property.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProperties(filtered);
    };

    const handleRenterSearch = (text: string) => {
        setRenterSearch(text);
        const filtered = renters.filter((renter) =>
            renter.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredRenters(filtered);
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Thông tin hợp đồng</Text>
                    <ScrollView style={{ width: '100%' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Tìm kiếm bất động sản"
                            value={propertySearch}
                            onChangeText={handlePropertySearch}
                            onFocus={() => setPropertySearchFocused(true)}
                            onBlur={() => setPropertySearchFocused(false)}
                        />
                        {propertySearchFocused && (
                            <FlatList
                                data={filteredProperties}
                                keyExtractor={(item) => item.propertyId}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleChange('propertyId', item.propertyId);
                                            setPropertySearch(item.title);
                                            setPropertySearchFocused(false);
                                        }}
                                    >
                                        <Text style={styles.listItem}>{item.title}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder="Tìm kiếm người thuê"
                            value={renterSearch}
                            onChangeText={handleRenterSearch}
                            onFocus={() => setRenterSearchFocused(true)}
                            onBlur={() => setRenterSearchFocused(false)}
                        />
                        {renterSearchFocused && (
                            <FlatList
                                data={filteredRenters}
                                keyExtractor={(item) => item.userId}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleChange('renterId', item.userId);
                                            setRenterSearch(item.name);
                                            setRenterSearchFocused(false);
                                        }}
                                    >
                                        <Text style={styles.listItem}>{item.name}</Text>
                                    </TouchableOpacity>
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
                            onChangeText={(text) => setMonths(text)}
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
                            onChangeText={(text) => setDeposit(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tiền thuê"
                            keyboardType="numeric"
                            value={rentalPrice}
                            onChangeText={(text) => setRentalPrice(text)}
                        />
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.createButton]}
                            onPress={handleCreate}
                        >
                            <Text style={styles.buttonText}>Tạo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    createButton: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CreateContractModal;


