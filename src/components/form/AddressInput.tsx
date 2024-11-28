// // import React, { useEffect, useState } from 'react';
// // import {
// //     View,
// //     Text,
// //     ActivityIndicator,
// //     StyleSheet,
// //     TextInput,
// // } from 'react-native';
// // import {
// //     getCities,
// //     getDistricts,
// //     getWards,
// //     City,
// //     District,
// //     Ward,
// // } from '../../api/address';
// // import { Picker } from '@react-native-picker/picker';

// // interface AddressSelectorProps {
// //     selectedCity: string | undefined;
// //     setSelectedCity: (
// //         value: string | undefined,
// //         name: string | undefined,
// //     ) => void;
// //     selectedDistrict: string | undefined;
// //     setSelectedDistrict: (
// //         value: string | undefined,
// //         name: string | undefined,
// //     ) => void;
// //     selectedWard: string | undefined;
// //     setSelectedWard: (
// //         value: string | undefined,
// //         name: string | undefined,
// //     ) => void;
// //     street: string;
// //     setStreet: (value: string) => void;
// //     showStreetInput?: boolean;
// // }

// // const AddressInput: React.FC<AddressSelectorProps> = ({
// //     selectedCity,
// //     setSelectedCity,
// //     selectedDistrict,
// //     setSelectedDistrict,
// //     selectedWard,
// //     setSelectedWard,
// //     street,
// //     setStreet,
// //     showStreetInput = true, // Default to true if not provided
// // }) => {
// //     const [cities, setCities] = useState<City[]>([]);
// //     const [districts, setDistricts] = useState<District[]>([]);
// //     const [wards, setWards] = useState<Ward[]>([]);

// //     const [loadingCities, setLoadingCities] = useState<boolean>(false);
// //     const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
// //     const [loadingWards, setLoadingWards] = useState<boolean>(false);
// //     const [errorMessage, setErrorMessage] = useState<string | null>(null);

// //     const [cityNameToIdMap, setCityNameToIdMap] = useState<{ [key: string]: string }>({});

// //     // Fetch cities with their IDs
// //     useEffect(() => {
// //         const fetchCities = async () => {
// //             setLoadingCities(true);
// //             try {
// //                 const citiesData = await getCities();
// //                 setCities(citiesData);
// //                 const nameToIdMap = citiesData.reduce((map, city) => {
// //                     map[city.name] = city._id;
// //                     return map;
// //                 }, {} as { [key: string]: string });
// //                 setCityNameToIdMap(nameToIdMap);
// //                 setErrorMessage(null);
// //             } catch (error) {
// //                 setErrorMessage('Lỗi khi tải thành phố. Vui lòng thử lại.');
// //                 console.error('Error fetching cities:', error);
// //             } finally {
// //                 setLoadingCities(false);
// //             }
// //         };

// //         fetchCities();
// //     }, []);

// //     // Fetch districts when a city is selected
// //     useEffect(() => {
// //         if (selectedCity) {
// //             const cityId = cityNameToIdMap[selectedCity];
// //             if (cityId) {
// //                 const fetchDistricts = async () => {
// //                     setLoadingDistricts(true);
// //                     try {
// //                         // Fetch districts using the ID of the selected city
// //                         const districtsData = await getDistricts(cityId);
// //                         setDistricts(districtsData);
// //                         setErrorMessage(null);
// //                     } catch (error) {
// //                         setErrorMessage(
// //                             'Lỗi khi tải quận/huyện. Vui lòng thử lại.',
// //                         );
// //                         console.error(
// //                             `Error fetching districts for city ID ${cityId}:`,
// //                             error,
// //                         );
// //                     } finally {
// //                         setLoadingDistricts(false);
// //                     }
// //                 };

// //                 fetchDistricts();
// //                 setWards([]); // Reset wards when city changes
// //                 setSelectedWard(undefined, undefined); // Reset ward selection
// //             }
// //         }
// //     }, [selectedCity, cityNameToIdMap]);

// //     // Fetch wards when a district is selected
// //     useEffect(() => {
// //         if (selectedDistrict) {
// //             const fetchWards = async () => {
// //                 setLoadingWards(true);
// //                 try {
// //                     // Fetch wards using the name of the selected district
// //                     const wardsData = await getWards(selectedDistrict);
// //                     setWards(wardsData);
// //                     setErrorMessage(null);
// //                 } catch (error) {
// //                     setErrorMessage('Lỗi khi tải phường/xã. Vui lòng thử lại.');
// //                     console.error(
// //                         `Error fetching wards for district ${selectedDistrict}:`,
// //                         error,
// //                     );
// //                 } finally {
// //                     setLoadingWards(false);
// //                 }
// //             };

// //             fetchWards();
// //         }
// //     }, [selectedDistrict]);

// //     return (
// //         <View style={styles.container}>
// //             {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

// //             <Text style={styles.label}>Tỉnh, thành phố</Text>
// //             {loadingCities ? (
// //                 <ActivityIndicator />
// //             ) : (
// //                 <View style={styles.pickerContainer}>
// //                     <Picker
// //                         selectedValue={selectedCity}
// //                         onValueChange={(value) => {
// //                             setSelectedCity(value, value); // Set city name
// //                         }}
// //                         style={styles.picker}
// //                     >
// //                         <Picker.Item
// //                             label="Chọn tỉnh, thành phố"
// //                             value={undefined}
// //                         />
// //                         {cities.map((city) => (
// //                             <Picker.Item
// //                                 key={city._id}
// //                                 label={city.name}
// //                                 value={city.name} // Display city name
// //                             />
// //                         ))}
// //                     </Picker>
// //                 </View>
// //             )}

// //             <Text style={styles.label}>Quận, huyện</Text>
// //             {loadingDistricts ? (
// //                 <ActivityIndicator />
// //             ) : (
// //                 <View style={styles.pickerContainer}>
// //                     <Picker
// //                         selectedValue={selectedDistrict}
// //                         onValueChange={(value) => {
// //                             setSelectedDistrict(value, value); // Set district name
// //                         }}
// //                         enabled={!!selectedCity}
// //                         style={styles.picker}
// //                     >
// //                         <Picker.Item
// //                             label="Chọn quận, huyện"
// //                             value={undefined}
// //                         />
// //                         {districts.map((district) => (
// //                             <Picker.Item
// //                                 key={district._id}
// //                                 label={district.name}
// //                                 value={district.name} // Display district name
// //                             />
// //                         ))}
// //                     </Picker>
// //                 </View>
// //             )}

// //             <Text style={styles.label}>Phường, xã</Text>
// //             {loadingWards ? (
// //                 <ActivityIndicator />
// //             ) : (
// //                 <View style={styles.pickerContainer}>
// //                     <Picker
// //                         selectedValue={selectedWard}
// //                         onValueChange={(value) => {
// //                             setSelectedWard(value, value); // Set ward name
// //                         }}
// //                         enabled={!!selectedDistrict}
// //                         style={styles.picker}
// //                     >
// //                         <Picker.Item
// //                             label="Chọn phường, xã"
// //                             value={undefined}
// //                         />
// //                         {wards.map((ward) => (
// //                             <Picker.Item
// //                                 key={ward._id}
// //                                 label={ward.name}
// //                                 value={ward.name} // Display ward name
// //                             />
// //                         ))}
// //                     </Picker>
// //                 </View>
// //             )}

// //             {showStreetInput && (
// //                 <>
// //                     <Text style={styles.label}>Địa chỉ:</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Vui lòng nhập địa chỉ"
// //                         value={street}
// //                         onChangeText={setStreet}
// //                     />
// //                 </>
// //             )}
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         // padding: 20,
// //     },
// //     label: {
// //         fontSize: 16,
// //         marginBottom: 5,
// //         fontWeight: 'bold',
// //     },
// //     pickerContainer: {
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         marginBottom: 15,
// //     },
// //     picker: {
// //         height: 50,
// //     },
// //     input: {
// //         borderWidth: 1,
// //         borderColor: '#ccc',
// //         borderRadius: 5,
// //         padding: 10,
// //         marginBottom: 15,
// //     },
// //     error: {
// //         color: 'red',
// //         marginBottom: 15,
// //     },
// // });

// // export default AddressInput;

// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     ActivityIndicator,
//     StyleSheet,
//     TextInput,
// } from 'react-native';
// import {
//     getCities,
//     getDistricts,
//     getWards,
//     City,
//     District,
//     Ward,
// } from '../../api/address';
// import { Picker } from '@react-native-picker/picker';

// interface AddressSelectorProps {
//     selectedCity: string | undefined;
//     setSelectedCity: (
//         value: string | undefined,
//         name: string | undefined,
//     ) => void;
//     selectedDistrict: string | undefined;
//     setSelectedDistrict: (
//         value: string | undefined,
//         name: string | undefined,
//     ) => void;
//     selectedWard: string | undefined;
//     setSelectedWard: (
//         value: string | undefined,
//         name: string | undefined,
//     ) => void;
//     street: string;
//     setStreet: (value: string) => void;
//     showStreetInput?: boolean;
// }

// const AddressInput: React.FC<AddressSelectorProps> = ({
//     selectedCity,
//     setSelectedCity,
//     selectedDistrict,
//     setSelectedDistrict,
//     selectedWard,
//     setSelectedWard,
//     street,
//     setStreet,
//     showStreetInput = true, // Default to true if not provided
// }) => {
//     const [cities, setCities] = useState<City[]>([]);
//     const [districts, setDistricts] = useState<District[]>([]);
//     const [wards, setWards] = useState<Ward[]>([]);

//     const [loadingCities, setLoadingCities] = useState<boolean>(false);
//     const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
//     const [loadingWards, setLoadingWards] = useState<boolean>(false);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);

//     const [cityNameToIdMap, setCityNameToIdMap] = useState<{ [key: string]: string }>({});
//     const [districtNameToIdMap, setDistrictNameToIdMap] = useState<{ [key: string]: string }>({});

//     // Fetch cities with their IDs
//     useEffect(() => {
//         const fetchCities = async () => {
//             setLoadingCities(true);
//             try {
//                 const citiesData = await getCities();
//                 setCities(citiesData);
//                 const nameToIdMap = citiesData.reduce((map, city) => {
//                     map[city.name] = city._id;
//                     return map;
//                 }, {} as { [key: string]: string });
//                 setCityNameToIdMap(nameToIdMap);
//                 setErrorMessage(null);
//             } catch (error) {
//                 setErrorMessage('Lỗi khi tải thành phố. Vui lòng thử lại.');
//                 console.error('Error fetching cities:', error);
//             } finally {
//                 setLoadingCities(false);
//             }
//         };

//         fetchCities();
//     }, []);

//     // Fetch districts when a city is selected
//     useEffect(() => {
//         if (selectedCity) {
//             const cityId = cityNameToIdMap[selectedCity];
//             if (cityId) {
//                 const fetchDistricts = async () => {
//                     setLoadingDistricts(true);
//                     try {
//                         // Fetch districts using the ID of the selected city
//                         const districtsData = await getDistricts(cityId);
//                         setDistricts(districtsData);
//                         const nameToIdMap = districtsData.reduce((map, district) => {
//                             map[district.name] = district._id;
//                             return map;
//                         }, {} as { [key: string]: string });
//                         setDistrictNameToIdMap(nameToIdMap);
//                         setErrorMessage(null);
//                     } catch (error) {
//                         setErrorMessage(
//                             'Lỗi khi tải quận/huyện. Vui lòng thử lại.',
//                         );
//                         console.error(
//                             `Error fetching districts for city ID ${cityId}:`,
//                             error,
//                         );
//                     } finally {
//                         setLoadingDistricts(false);
//                     }
//                 };

//                 fetchDistricts();
//                 setWards([]); // Reset wards when city changes
//                 setSelectedWard(undefined, undefined); // Reset ward selection
//             }
//         }
//     }, [selectedCity, cityNameToIdMap]);

//     // Fetch wards when a district is selected
//     useEffect(() => {
//         if (selectedDistrict) {
//             const districtId = districtNameToIdMap[selectedDistrict];
//             if (districtId) {
//                 const fetchWards = async () => {
//                     setLoadingWards(true);
//                     try {
//                         // Fetch wards using the ID of the selected district
//                         const wardsData = await getWards(districtId);
//                         setWards(wardsData);
//                         setErrorMessage(null);
//                     } catch (error) {
//                         setErrorMessage('Lỗi khi tải phường/xã. Vui lòng thử lại.');
//                         console.error(
//                             `Error fetching wards for district ID ${districtId}:`,
//                             error,
//                         );
//                     } finally {
//                         setLoadingWards(false);
//                     }
//                 };

//                 fetchWards();
//             }
//         }
//     }, [selectedDistrict, districtNameToIdMap]);

//     return (
//         <View style={styles.container}>
//             {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

//             <Text style={styles.label}>Tỉnh, thành phố</Text>
//             {loadingCities ? (
//                 <ActivityIndicator />
//             ) : (
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={selectedCity}
//                         onValueChange={(value) => {
//                             setSelectedCity(value, value); // Set city name
//                         }}
//                         style={styles.picker}
//                     >
//                         <Picker.Item
//                             label="Chọn tỉnh, thành phố"
//                             value={undefined}
//                         />
//                         {cities.map((city) => (
//                             <Picker.Item
//                                 key={city._id}
//                                 label={city.name}
//                                 value={city.name} // Display city name
//                             />
//                         ))}
//                     </Picker>
//                 </View>
//             )}

//             <Text style={styles.label}>Quận, huyện</Text>
//             {loadingDistricts ? (
//                 <ActivityIndicator />
//             ) : (
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={selectedDistrict}
//                         onValueChange={(value) => {
//                             setSelectedDistrict(value, value); // Set district name
//                         }}
//                         enabled={!!selectedCity}
//                         style={styles.picker}
//                     >
//                         <Picker.Item
//                             label="Chọn quận, huyện"
//                             value={undefined}
//                         />
//                         {districts.map((district) => (
//                             <Picker.Item
//                                 key={district._id}
//                                 label={district.name}
//                                 value={district.name} // Display district name
//                             />
//                         ))}
//                     </Picker>
//                 </View>
//             )}

//             <Text style={styles.label}>Phường, xã</Text>
//             {loadingWards ? (
//                 <ActivityIndicator />
//             ) : (
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={selectedWard}
//                         onValueChange={(value) => {
//                             setSelectedWard(value, value); // Set ward name
//                         }}
//                         enabled={!!selectedDistrict}
//                         style={styles.picker}
//                     >
//                         <Picker.Item
//                             label="Chọn phường, xã"
//                             value={undefined}
//                         />
//                         {wards.map((ward) => (
//                             <Picker.Item
//                                 key={ward._id}
//                                 label={ward.name}
//                                 value={ward.name} // Display ward name
//                             />
//                         ))}
//                     </Picker>
//                 </View>
//             )}

//             {showStreetInput && (
//                 <>
//                     <Text style={styles.label}>Địa chỉ:</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Vui lòng nhập địa chỉ"
//                         value={street}
//                         onChangeText={setStreet}
//                     />
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         // padding: 20,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         fontWeight: 'bold',
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     picker: {
//         height: 50,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 15,
//     },
//     error: {
//         color: 'red',
//         marginBottom: 15,
//     },
// });

// export default AddressInput;


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

    const [cityNameToIdMap, setCityNameToIdMap] = useState<{ [key: string]: string }>({});
    const [districtNameToIdMap, setDistrictNameToIdMap] = useState<{ [key: string]: string }>({});
    console.log(selectedWard);

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
        if (selectedCity) {
            const cityId = cityNameToIdMap[selectedCity];
            if (cityId) {
                const fetchDistricts = async () => {
                    setLoadingDistricts(true);
                    try {
                        // Fetch districts using the ID of the selected city
                        const districtsData = await getDistricts(cityId);
                        setDistricts(districtsData);
                        const nameToIdMap = districtsData.reduce((map, district) => {
                            map[district.name] = district._id;
                            return map;
                        }, {} as { [key: string]: string });
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
        }
    }, [selectedCity, cityNameToIdMap]);

    // Fetch wards when a district is selected
    useEffect(() => {
        if (selectedDistrict) {
            const districtId = districtNameToIdMap[selectedDistrict];
            if (districtId) {
                const fetchWards = async () => {
                    setLoadingWards(true);
                    try {
                        // Fetch wards using the ID of the selected district
                        const wardsData = await getWards(districtId);
                        setWards(wardsData);
                        setErrorMessage(null);
                    } catch (error) {
                        setErrorMessage('Lỗi khi tải phường/xã. Vui lòng thử lại.');
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
        }
    }, [selectedDistrict, districtNameToIdMap]);

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
                            setSelectedCity(value, value); // Set city name
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label="Chọn tỉnh, thành phố"
                            value={undefined}
                        />
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
                            setSelectedDistrict(value, value); // Set district name
                        }}
                        enabled={!!selectedCity}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label="Chọn quận, huyện"
                            value={undefined}
                        />
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
                            setSelectedWard(value, value); // Set ward name
                        }}
                        enabled={!!selectedDistrict}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label="Chọn phường, xã"
                            value={undefined}
                        />
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
                        placeholder="Vui lòng nhập địa chỉ"
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