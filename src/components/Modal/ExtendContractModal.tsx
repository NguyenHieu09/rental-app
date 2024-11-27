// // // // ExtendContractModal.tsx
// // // import React, { useState } from 'react';
// // // import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
// // // import { commonStyles } from '../../styles/theme';
// // // import { format } from 'date-fns';
// // // import DateTimePickerModal from 'react-native-modal-datetime-picker';
// // // import { IContract } from '../../types/contract';


// // // interface ExtendContractModalProps {
// // //     visible: boolean;
// // //     onClose: () => void;
// // //     onConfirm: (extensionDate: string, reason: string) => void;
// // //     contract: IContract;
// // //     type: string;
// // // }

// // // const ExtendContractModal: React.FC<ExtendContractModalProps> = ({ visible, onClose, onConfirm, type, contract }) => {
// // //     const [extensionDate, setExtensionDate] = useState('');
// // //     const [reason, setReason] = useState('');
// // //     const [loading, setLoading] = useState(false);
// // //     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


// // //     const handleConfirmDate = (date: Date) => {
// // //         const formattedDate = format(date, 'dd/MM/yyyy');
// // //         setExtensionDate(formattedDate);
// // //         setDatePickerVisibility(false);
// // //     };

// // //     const handleConfirm = () => {
// // //         if (!extensionDate) {
// // //             Alert.alert('Lỗi', 'Vui lòng nhập ngày gia hạn');
// // //             return;
// // //         }
// // //         onConfirm(format(extensionDate, 'yyyy-MM-dd'), reason);
// // //     };

// // //     return (
// // //         <Modal visible={visible} transparent={true} animationType="slide">
// // //             <View style={styles.modalContainer}>
// // //                 <View style={styles.modalContent}>
// // //                     <Text style={styles.title}>
// // //                         {type === 'EXTEND_CONTRACT' ? 'Gia hạn hợp đồng' : 'Gia hạn hóa đơn'}
// // //                     </Text>

// // //                     <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
// // //                         <TextInput
// // //                             style={styles.input}
// // //                             placeholder="Ngày gia hạn"
// // //                             value={extensionDate ? format(extensionDate, 'dd/MM/yyyy') : ''}
// // //                             editable={false}
// // //                         />
// // //                     </TouchableOpacity>
// // //                     <DateTimePickerModal
// // //                         isVisible={isDatePickerVisible}
// // //                         mode="date"
// // //                         onConfirm={handleConfirmDate}
// // //                         onCancel={() => setDatePickerVisibility(false)}
// // //                         minimumDate={new Date()}
// // //                     />
// // //                     <TextInput
// // //                         style={styles.input}
// // //                         placeholder="Lý do"
// // //                         value={reason}
// // //                         onChangeText={setReason}
// // //                     />

// // //                     <View style={styles.buttonContainer}>
// // //                         <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336" }]} onPress={onClose}>
// // //                             <Text style={commonStyles.buttonText}>Hủy</Text>
// // //                         </TouchableOpacity>
// // //                         <TouchableOpacity style={[styles.button]} onPress={handleConfirm}>
// // //                             {loading ? (
// // //                                 // <ActivityIndicator size="small" color="#fff" />
// // //                                 <Text style={commonStyles.buttonText}>Đang xử lý...</Text>
// // //                             ) : (
// // //                                 <Text style={commonStyles.buttonText}>Đồng ý</Text>
// // //                             )}
// // //                         </TouchableOpacity>
// // //                     </View>

// // //                     {/* 
// // //                     <View style={styles.buttonContainer}>
// // //                         <TouchableOpacity style={commonStyles.button} onPress={handleConfirm}>
// // //                             <Text style={commonStyles.buttonText}>Xác nhận</Text>
// // //                         </TouchableOpacity>
// // //                         <TouchableOpacity style={[commonStyles.button, styles.cancelButton]} onPress={onClose}>
// // //                             <Text style={commonStyles.buttonText}>Hủy</Text>
// // //                         </TouchableOpacity>
// // //                     </View> */}
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
// // //         backgroundColor: '#fff',
// // //         borderRadius: 10,
// // //         padding: 20,
// // //         alignItems: 'center',
// // //     },
// // //     title: {
// // //         fontSize: 18,
// // //         fontWeight: 'bold',
// // //         marginBottom: 20,
// // //     },
// // //     input: {
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
// // //         backgroundColor: '#2196F3',
// // //         padding: 8,
// // //         borderRadius: 5,
// // //         alignItems: 'center',
// // //         justifyContent: 'center',
// // //         flex: 1,
// // //         marginHorizontal: 10,
// // //     },
// // //     buttonText: {
// // //         color: 'white',
// // //         fontSize: 16,
// // //     },
// // // });

// // // export default ExtendContractModal;

// // // ExtendContractModal.tsx
// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
// // import { commonStyles } from '../../styles/theme';
// // import { format, parseISO } from 'date-fns';
// // import DateTimePickerModal from 'react-native-modal-datetime-picker';
// // import { IContract } from '../../types/contract';

// // interface ExtendContractModalProps {
// //     visible: boolean;
// //     onClose: () => void;
// //     onConfirm: (extensionDate: string, reason: string) => void;
// //     contract: IContract;
// //     type: string;
// // }

// // const ExtendContractModal: React.FC<ExtendContractModalProps> = ({ visible, onClose, onConfirm, type, contract }) => {
// //     const [extensionDate, setExtensionDate] = useState('');
// //     const [reason, setReason] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

// //     const handleConfirmDate = (date: Date) => {
// //         const formattedDate = format(date, 'dd/MM/yyyy');
// //         setExtensionDate(formattedDate);
// //         setDatePickerVisibility(false);
// //     };

// //     const handleConfirm = () => {
// //         if (!extensionDate) {
// //             Alert.alert('Lỗi', 'Vui lòng nhập ngày gia hạn');
// //             return;
// //         }
// //         onConfirm(format(parseISO(extensionDate), 'yyyy-MM-dd'), reason);
// //     };

// //     const today = new Date();
// //     const contractEndDate = parseISO(contract.endDate);
// //     const minDate = type === 'EXTEND_CONTRACT' ? contractEndDate : today;
// //     const maxDate = new Date(today);
// //     maxDate.setDate(today.getDate() + 5);

// //     return (
// //         <Modal visible={visible} transparent={true} animationType="slide">
// //             <View style={styles.modalContainer}>
// //                 <View style={styles.modalContent}>
// //                     <Text style={styles.title}>
// //                         {type === 'EXTEND_CONTRACT' ? 'Gia hạn hợp đồng' : 'Gia hạn hóa đơn'}
// //                     </Text>

// //                     <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ width: "100%" }}>
// //                         <TextInput
// //                             style={styles.input}
// //                             placeholder="Ngày gia hạn"
// //                             value={extensionDate}
// //                             editable={false}
// //                         />
// //                     </TouchableOpacity>
// //                     <DateTimePickerModal
// //                         isVisible={isDatePickerVisible}
// //                         mode="date"
// //                         onConfirm={handleConfirmDate}
// //                         onCancel={() => setDatePickerVisibility(false)}
// //                         minimumDate={minDate}
// //                     // maximumDate={maxDate}
// //                     />

// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Lý do"
// //                         value={reason}
// //                         onChangeText={setReason}
// //                     />

// //                     <View style={styles.buttonContainer}>
// //                         <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336" }]} onPress={onClose}>
// //                             <Text style={commonStyles.buttonText}>Hủy</Text>
// //                         </TouchableOpacity>
// //                         <TouchableOpacity style={[styles.button]} onPress={handleConfirm}>
// //                             {loading ? (
// //                                 <Text style={commonStyles.buttonText}>Đang xử lý...</Text>
// //                             ) : (
// //                                 <Text style={commonStyles.buttonText}>Đồng ý</Text>
// //                             )}
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
// //         backgroundColor: '#fff',
// //         borderRadius: 10,
// //         padding: 20,
// //         alignItems: 'center',
// //     },
// //     title: {
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
// //         backgroundColor: '#2196F3',
// //         padding: 8,
// //         borderRadius: 5,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         flex: 1,
// //         marginHorizontal: 10,
// //     },
// //     buttonText: {
// //         color: 'white',
// //         fontSize: 16,
// //     },
// // });

// // export default ExtendContractModal;


// // ExtendContractModal.tsx
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
// import { commonStyles } from '../../styles/theme';
// import { format, parseISO, isValid, parse } from 'date-fns';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { IContract } from '../../types/contract';

// interface ExtendContractModalProps {
//     visible: boolean;
//     onClose: () => void;
//     onConfirm: (extensionDate: string, reason: string) => void;
//     contract?: IContract;
//     type: string;
// }

// const ExtendContractModal: React.FC<ExtendContractModalProps> = ({ visible, onClose, onConfirm, type, contract }) => {
//     const [extensionDate, setExtensionDate] = useState('');
//     const [reason, setReason] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//     const handleConfirmDate = (date: Date) => {
//         const formattedDate = format(date, 'dd/MM/yyyy');
//         setExtensionDate(formattedDate);
//         setDatePickerVisibility(false);
//     };

//     const handleConfirm = () => {
//         if (!extensionDate) {
//             Alert.alert('Lỗi', 'Vui lòng nhập ngày gia hạn');
//             return;
//         }

//         const parsedDate = parse(extensionDate, 'dd/MM/yyyy', new Date());
//         if (!isValid(parsedDate)) {
//             Alert.alert('Lỗi', 'Ngày gia hạn không hợp lệ');
//             return;
//         }

//         onConfirm(format(parsedDate, 'yyyy-MM-dd'), reason);
//     };

//     const today = new Date();
//     const contractEndDate = contract ? parseISO(contract.endDate) : today;
//     const minDate = type === 'EXTEND_CONTRACT' && isValid(contractEndDate) ? contractEndDate : today;
//     const maxDate = type === 'EXTEND_PAYMENT' ? new Date(today.setDate(today.getDate() + 5)) : undefined;

//     return (
//         <Modal visible={visible} transparent={true} animationType="slide">
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <Text style={styles.title}>
//                         {type === 'EXTEND_CONTRACT' ? 'Gia hạn hợp đồng' : 'Gia hạn hóa đơn'}
//                     </Text>

//                     <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ width: "100%" }}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Ngày gia hạn"
//                             value={extensionDate}
//                             editable={false}
//                         />
//                     </TouchableOpacity>
//                     <DateTimePickerModal
//                         isVisible={isDatePickerVisible}
//                         mode="date"
//                         onConfirm={handleConfirmDate}
//                         onCancel={() => setDatePickerVisibility(false)}
//                         minimumDate={minDate}
//                         maximumDate={maxDate}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Lý do"
//                         value={reason}
//                         onChangeText={setReason}
//                     />

//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336" }]} onPress={onClose}>
//                             <Text style={commonStyles.buttonText}>Hủy</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={[styles.button]} onPress={handleConfirm}>
//                             {loading ? (
//                                 <Text style={commonStyles.buttonText}>Đang xử lý...</Text>
//                             ) : (
//                                 <Text style={commonStyles.buttonText}>Đồng ý</Text>
//                             )}
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
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     title: {
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
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     button: {
//         backgroundColor: '#2196F3',
//         padding: 8,
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//         marginHorizontal: 10,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//     },
// });

// export default ExtendContractModal;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles } from '../../styles/theme';
import { format, parseISO, isValid, parse } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IContract } from '../../types/contract';

interface ExtendContractModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (extensionDate: string, reason: string) => void;
    contract?: IContract;
    endDate?: string;
    type: string;
}

const ExtendContractModal: React.FC<ExtendContractModalProps> = ({ visible, onClose, onConfirm, type, contract, endDate }) => {
    const [extensionDate, setExtensionDate] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirmDate = (date: Date) => {
        const formattedDate = format(date, 'dd/MM/yyyy');
        setExtensionDate(formattedDate);
        setDatePickerVisibility(false);
    };

    const handleConfirm = () => {
        if (!extensionDate) {
            Alert.alert('Lỗi', 'Vui lòng nhập ngày gia hạn');
            return;
        }

        const parsedDate = parse(extensionDate, 'dd/MM/yyyy', new Date());
        if (!isValid(parsedDate)) {
            Alert.alert('Lỗi', 'Ngày gia hạn không hợp lệ');
            return;
        }

        onConfirm(format(parsedDate, 'yyyy-MM-dd'), reason);
    };

    const today = new Date();
    const contractEndDate = contract ? parseISO(contract.endDate) : today;
    const paymentEndDate = endDate ? parseISO(endDate) : today;

    const minDate =
        type === 'EXTEND_PAYMENT' && isValid(paymentEndDate)
            ? paymentEndDate
            : type === 'EXTEND_CONTRACT' && isValid(contractEndDate)
                ? contractEndDate
                : today;

    const maxDate =
        type === 'EXTEND_PAYMENT' && isValid(paymentEndDate)
            ? new Date(paymentEndDate.getTime() + 5 * 24 * 60 * 60 * 1000)
            : undefined;

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>
                        {type === 'EXTEND_CONTRACT' ? 'Gia hạn hợp đồng' : 'Gia hạn hóa đơn'}
                    </Text>

                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ width: "100%" }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ngày gia hạn"
                            value={extensionDate}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={() => setDatePickerVisibility(false)}
                        minimumDate={minDate}
                        maximumDate={maxDate}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Lý do"
                        value={reason}
                        onChangeText={setReason}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336" }]} onPress={onClose}>
                            <Text style={commonStyles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={handleConfirm}>
                            {loading ? (
                                <Text style={commonStyles.buttonText}>Đang xử lý...</Text>
                            ) : (
                                <Text style={commonStyles.buttonText}>Gia hạn</Text>
                            )}
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ExtendContractModal;