// // // import { RouteProp, useRoute } from '@react-navigation/native';
// // // import React, { useState } from 'react';
// // // import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
// // // import { RootStackParamList } from '../../../types/navigation';

// // // type ContractScreenRouteProp = RouteProp<RootStackParamList, 'ContractScreen'>;

// // // const ContractScreen = () => {
// // //     const route = useRoute<ContractScreenRouteProp>();
// // //     const { contractData } = route.params;
// // //     console.log(contractData);

// // //     // const [city, setCity] = useState('Hồ Chí Minh');
// // //     // const [date, setDate] = useState('');
// // //     // const [month, setMonth] = useState('');
// // //     // const [year, setYear] = useState('');
// // //     // const [renter, setRenter] = useState('');
// // //     // const [owner, setOwner] = useState('');
// // //     // const [cardId, setCardId] = useState('');
// // //     // const [cardAddresses, setCardAddresses] = useState('');
// // //     // const [cardDate, setCardDate] = useState('');
// // //     // const [address, setAddress] = useState('');
// // //     // const [floor, setFloor] = useState('');
// // //     // const [propertyAddress, setPropertyAddress] = useState('');
// // //     // const [propertyArea, setPropertyArea] = useState('');
// // //     // const [rentalStartDate, setRentalStartDate] = useState('');
// // //     // const [rentalEndDate, setRentalEndDate] = useState('');
// // //     // const [rentalTerm, setRentalTerm] = useState('');
// // //     // const [deposit, setDeposit] = useState('');
// // //     // const [rentAmount, setRentalAmount] = useState('');

// // //     return (
// // //         <ScrollView style={styles.container}>
// // //             <Text style={styles.subtitle}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
// // //             <View style={styles.underlineContainer}>
// // //                 <Text style={styles.subtitle}>Độc lập – Tự do – Hạnh phúc</Text>
// // //                 <View style={styles.underline} />
// // //             </View>
// // //             <View style={styles.inlineContainer}>
// // //                 <TextInput style={styles.inlineInput} placeholder="..." />
// // //                 <Text> ngày </Text>
// // //                 <TextInput style={styles.inlineInput} placeholder="..." />
// // //                 <Text> tháng </Text>
// // //                 <TextInput style={styles.inlineInput} placeholder="..." />
// // //                 <Text> năm </Text>
// // //                 <TextInput style={styles.inlineInput} placeholder="..." />
// // //             </View>
// // //             <Text style={styles.title}>HỢP ĐỒNG THUÊ NHÀ</Text>

// // //             <View>
// // //                 <Text>- Căn cứ Bộ luật Dân sự số 91/2015/QH13 ngày 24/11/2015;</Text>
// // //                 <Text>- Căn cứ vào Luật Thương mại số 36/2005/QH11 ngày 14 tháng 06 năm 2005;</Text>
// // //                 <Text>- Căn cứ vào nhu cầu và sự thỏa thuận của các bên tham gia Hợp đồng;</Text>
// // //             </View>

// // //             <View style={styles.inputContainer}>
// // //                 <Text>Hôm nay, ngày </Text>
// // //                 <TextInput style={styles.inlineInput} placeholder="..." />
// // //                 <Text> tháng </Text>
// // //                 <TextInput style={styles.inlineInput} placeholder="..." />
// // //                 <Text> năm </Text>
// // //                 <TextInput style={styles.inlineInput} placeholder="..." />
// // //                 <Text>, các Bên gồm:</Text>
// // //             </View>

// // //             <Text style={styles.sectionTitle}>BÊN CHO THUÊ NHÀ:</Text>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>Họ và tên:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>CMND số:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>Cơ quan cấp:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>Ngày cấp:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>Nơi ĐKTT:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>

// // //             <Text style={styles.sectionTitle}>BÊN THUÊ NHÀ:</Text>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>Họ và tên:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>CMND số:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>Cơ quan cấp:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>Ngày cấp:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>
// // //             <View style={styles.inputContainer}>
// // //                 <Text>Nơi ĐKTT:</Text>
// // //                 <TextInput style={styles.input} placeholder="..." />
// // //             </View>

// // //             <Text>Bên A và Bên B sau đây gọi chung là “Hai Bên” hoặc “Các Bên”.</Text>
// // //             <Text>Sau khi thảo luận, Hai Bên thống nhất đi đến ký kết Hợp đồng thuê nhà (“Hợp Đồng”) với các điều khoản và điều kiện dưới đây:</Text>

// // //             <View>
// // //                 <Text>Điều 1. Nhà ở và các tài sản cho thuê kèm theo nhà ở:</Text>
// // //                 <View style={styles.inputContainer}>
// // //                     <Text>1.1. Bên A đồng ý cho Bên B thuê và Bên B cũng đồng ý thuê quyền sử dụng đất và một căn nhà</Text>
// // //                     <TextInput style={styles.inlineInput} placeholder=".............m2;" />
// // //                     <Text> gắn liền với quyền sử dụng đất tại địa chỉ</Text>
// // //                     <TextInput style={styles.inlineInput} placeholder="............." />
// // //                     <Text>để sử dụng làm nơi để ở.</Text>
// // //                 </View>
// // //                 <View style={styles.inputContainer}>
// // //                     <Text>Diện tích quyền sử dụng đất:</Text>
// // //                     <TextInput style={styles.inlineInput} placeholder=".............m2;" />
// // //                 </View>
// // //                 <View style={styles.inputContainer}>
// // //                     <Text>Diện tích căn nhà :</Text>
// // //                     <TextInput style={styles.inlineInput} placeholder=".............m2;" />
// // //                 </View>
// // //                 <Text>1.2. Bên A cam kết quyền sử dụng đất và căn nhà gắn liền trên đất trên là tài sản sở hữu hợp pháp của Bên A. Mọi tranh chấp phát sinh từ tài sản cho thuê trên Bên A hoàn toàn chịu trách nhiệm trước pháp luật.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 2. Bàn giao và sử dụng diện tích thuê:</Text>
// // //                 <View style={styles.inputContainer}>
// // //                     <Text>2.1. Thời điểm Bên A bàn giao tài sản thuê vào </Text>
// // //                     <Text>ngày </Text>
// // //                     <TextInput style={styles.inlineInput} placeholder="..." />
// // //                     <Text> tháng </Text>
// // //                     <TextInput style={styles.inlineInput} placeholder="..." />
// // //                     <Text> năm </Text>
// // //                     <TextInput style={styles.inlineInput} placeholder="..." />

// // //                 </View>
// // //                 <Text>2.2. Bên B được toàn quyền sử dụng tài sản thuê kể từ thời điểm được Bên A bàn giao từ thời điểm quy định tại Mục 2.1 trên đây.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 3. Thời hạn thuê</Text>
// // //                 <View style={styles.inputContainer}>
// // //                     <Text>3.1. Bên A cam kết cho Bên B thuê tài sản thuê với thời hạn là</Text>
// // //                     <TextInput style={styles.inlineInput} placeholder="......" />
// // //                     <Text>tháng kể từ ngày bàn giao Tài sản thuê;</Text>
// // //                 </View>
// // //                 <Text>3.2. Hết thời hạn thuê nêu trên nếu bên B có nhu cầu tiếp tục sử dụng thì Bên A phải ưu tiên cho Bên B tiếp tục thuê.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 4. Đặt cọc tiền thuê nhà</Text>
// // //                 <View style={styles.inputContainer}>
// // //                     <Text>4.1. Bên B sẽ giao cho Bên A một khoản tiền là </Text>
// // //                     <TextInput style={styles.inlineInput} placeholder="..." />
// // //                     <Text>VNĐ ngay sau khi ký hợp đồng này. Số tiền này là tiền đặt cọc để đảm bảo thực hiện Hợp đồng cho thuê nhà.</Text>
// // //                 </View>
// // //                 <Text>4.2. Nếu Bên B đơn phương chấm dứt hợp đồng mà không thực hiện nghĩa vụ báo trước tới Bên A thì Bên A sẽ không phải hoàn trả lại Bên B số tiền đặt cọc này.</Text>
// // //                 <Text>Nếu Bên A đơn phương chấm dứt hợp đồng mà không thực hiện nghĩa vụ báo trước tới bên B thì bên A sẽ phải hoàn trả lại Bên B số tiền đặt cọc và phải bồi thường thêm một khoản bằng chính tiền đặt cọc.</Text>
// // //                 <Text>4.3. Tiền đặt cọc của Bên B sẽ không được dùng để thanh toán tiền thuê. Nếu Bên B vi phạm Hợp Đồng làm phát sinh thiệt hại cho Bên A thì Bên A có quyền khấu trừ tiền đặt cọc để bù đắp các chi phí khắc phục thiệt hại phát sinh. Mức chi phí bù đắp thiệt hại sẽ được Các Bên thống nhất bằng văn bản.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 5. Tiền thuê nhà:</Text>
// // //                 <View style={[styles.inputContainer]}>
// // //                     <Text>5.1 Tiền thuê nhà đối với diện tích thuê nêu tại mục 1.1 Điều 1 là:</Text>
// // //                     <TextInput style={styles.inlineInput} placeholder="..." />
// // //                     <Text>VNĐ/tháng</Text>
// // //                 </View>
// // //                 <Text>5.2 Tiền thuê nhà không bao gồm chi phí khác như tiền điện, nước, vệ sinh.... Khoản tiền này sẽ do bên B trả theo khối lượng, công suất sử dụng thực tế của Bên B hàng tháng, được tính theo đơn giá của nhà nước.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 6. Phương thức thanh toán tiền thuê nhà</Text>
// // //                 <Text>Điều 6. Phương thức thanh toán tiền thuê nhà</Text>
// // //                 <Text>Các chi phí khác được bên B tự thanh toán với các cơ quan, đơn vị có liên quan khi được yêu cầu.</Text>
// // //                 <Text>Việc thanh toán tiền thuê nhà được thực hiện bằng đồng tiền Việt Nam theo hình thức trả trực tiếp bằng tiền mặt.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 7. Quyền và nghĩa vụ của bên cho thuê nhà</Text>
// // //                 <Text>7.1. Quyền lợi</Text>
// // //                 <Text>- Yêu cầu Bên B thanh toán tiền thuê và chi phí khác đầy đủ, đúng hạn theo thỏa thuận trong Hợp Đồng;</Text>
// // //                 <Text>- Yêu cầu Bên B phải sửa chữa phần hư hỏng, thiệt hại do lỗi của Bên B gây ra.</Text>
// // //                 <Text>7.2. Nghĩa vụ của</Text>
// // //                 <Text>- Bàn giao diện tích thuê cho Bên B theo thời gian quy định trong Hợp Đồng;</Text>
// // //                 <Text>- Đảm bảo việc cho thuê theo Hợp đồng này là đúng quy định của pháp luật;</Text>
// // //                 <Text>- Đảm bảo cho Bên B thực hiện quyền sử dụng diện tích thuê một cách độc lập và liên tục trong suốt thời hạn thuê, trừ trường hợp vi phạm pháp luật và/hoặc các quy định của Hợp đồng này.</Text>
// // //                 <Text>- Không xâm phạm trái phép đến tài sản của Bên B trong phần diện tích thuê. Nếu Bên A có những hành vi vi phạm gây thiệt hại cho Bên B trong thời gian thuê thì Bên A phải bồi thường.</Text>
// // //                 <Text>- Tuân thủ các nghĩa vụ khác theo thoả thuận tại Hợp đồng này hoặc/và các văn bản kèm theo Hợp đồng này; hoặc/và theo quy định của pháp luật Việt Nam.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 8. Quyền và nghĩa vụ của bên thuê nhà</Text>
// // //                 <Text>8.1. Quyền lợi</Text>
// // //                 <Text>- Nhận bàn giao diện tích thuê theo đúng thoả thuận trong Hợp đồng;</Text>
// // //                 <Text>- Được sử dụng phần diện tích thuê làm nơi ở và các hoạt động hợp pháp khác;</Text>
// // //                 <Text>- Yêu cầu Bên A sửa chữa kịp thời những hư hỏng không phải do lỗi của Bên B trong phần diện tích thuê để bảo đảm an toàn;</Text>
// // //                 <Text>- Được tháo dỡ và đem ra khỏi phần diện tích thuê các tài sản, trang thiết bị của Bên B đã lắp đặt trong phần diện tích thuê khi hết thời hạn thuê hoặc đơn phương chấm dứt hợp đồng.</Text>
// // //                 <Text>8.2. Nghĩa vụ của</Text>
// // //                 <Text>- Sử dụng diện tích thuê đúng mục đích đã thỏa thuận, giữ gìn nhà ở và có trách nhiệm trong việc sửa chữa những hư hỏng do mình gây ra;</Text>
// // //                 <Text>- Thanh toán tiền đặt cọc, tiền thuê đầy đủ, đúng thời hạn đã thỏa thuận;</Text>
// // //                 <Text>- Trả lại diện tích thuê cho Bên A khi hết thời hạn thuê hoặc chấm dứt Hợp đồng thuê;</Text>
// // //                 <Text>- Mọi việc sửa chữa, cải tạo, lắp đặt bổ sung các trang thiết bị làm ảnh hưởng đến kết cấu của căn phòng…, Bên B phải có văn bản thông báo cho Bên A và chỉ được tiến hành các công việc này sau khi có sự đồng ý bằng văn bản của Bên A;</Text>
// // //                 <Text>- Tuân thủ một cách chặt chẽ quy định tại Hợp đồng này và các quy định của pháp luật Việt Nam.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 9. Đơn phương chấm dứt hợp đồng thuê nhà:</Text>
// // //                 <Text>Trong trường hợp một trong Hai Bên muốn đơn phương chấm dứt Hợp đồng trước hạn thì phải thông báo bằng văn bản cho bên kia trước 30 (ba mươi) ngày so với ngày mong muốn chấm dứt. Nếu một trong Hai Bên không thực hiện nghĩa vụ thông báo cho Bên kia thì sẽ phải bồi thường cho bên đó một khoản tiền thuê tương đương với thời gian không thông báo và các thiệt hại khác phát sinh do việc chấm dứt Hợp đồng trái quy định.</Text>
// // //             </View>

// // //             <View>
// // //                 <Text>Điều 10. Điều khoản thi hành:</Text>
// // //                 <Text>- Hợp đồng này có hiệu lực kể từ ngày hai bên cùng ký kết;</Text>
// // //                 <Text>- Các Bên cam kết thực hiện nghiêm chỉnh và đầy đủ các thoả thuận trong Hợp đồng này trên tinh thần hợp tác, thiện chí;</Text>
// // //                 <Text>- Mọi sửa đổi, bổ sung đối với bất kỳ điều khoản nào của Hợp đồng phải được lập thành văn bản, có đầy đủ chữ ký của mỗi Bên. Văn bản sửa đổi bổ sung Hợp đồng có giá trị pháp lý như Hợp đồng, là một phần không tách rời của Hợp đồng này.</Text>
// // //                 <Text>- Hợp đồng được lập thành 02 (hai) bản có giá trị như nhau, mỗi Bên giữ 01 (một) bản để thực hiện.</Text>
// // //             </View>
// // //         </ScrollView>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         padding: 10,
// // //     },
// // //     title: {
// // //         fontSize: 24,
// // //         fontWeight: 'bold',
// // //         textAlign: 'center',
// // //     },
// // //     underlineContainer: {
// // //         alignItems: 'center',
// // //     },
// // //     underline: {
// // //         width: '60%',
// // //         height: 1,
// // //         backgroundColor: 'black',
// // //     },
// // //     subtitle: {
// // //         fontSize: 16,
// // //         textAlign: 'center',
// // //     },
// // //     sectionTitle: {
// // //         fontSize: 16,
// // //         fontWeight: 'bold',
// // //         marginTop: 20,
// // //     },
// // //     inputContainer: {
// // //         flexDirection: 'row',
// // //         alignItems: 'center',
// // //         flexWrap: 'wrap',
// // //     },
// // //     input: {
// // //         marginLeft: 5,
// // //         fontWeight: 'bold',
// // //     },
// // //     inlineInput: {
// // //         textAlign: 'center',
// // //         fontWeight: 'bold',

// // //     },
// // //     inlineContainer: {
// // //         flexDirection: 'row',
// // //         alignItems: 'center',
// // //         justifyContent: 'flex-end',
// // //         flexWrap: 'wrap',
// // //         marginTop: 10,
// // //     },
// // // });

// // // export default ContractScreen;


// // import React, { useState, useEffect } from 'react';
// // import { Text, View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
// // import { useRoute, RouteProp } from '@react-navigation/native';
// // import RenderHtml from 'react-native-render-html';
// // import { RootStackParamList } from '../../../types/navigation';
// // import { commonStyles } from '../../../styles/theme';
// // import { createContract } from '../../../api/contract';
// // import { ICreateContractRequest } from '../../../types/contract';

// // type ContractScreenRouteProp = RouteProp<RootStackParamList, 'ContractScreen'>;

// // const ContractScreen = () => {
// //     const [loading, setLoading] = useState(true);
// //     const route = useRoute<ContractScreenRouteProp>();
// //     const { contractData } = route.params;
// //     const { contractContent, ownerId, renterId, propertyId, startDate, endDate, monthlyRent, depositAmount } = contractData;

// //     // Simulate data fetching
// //     useEffect(() => {
// //         // Simulate a delay to fetch data
// //         const timer = setTimeout(() => {
// //             setLoading(false);
// //         }, 2000); // 2 seconds delay

// //         // Cleanup the timer
// //         return () => clearTimeout(timer);
// //     }, []);

// //     const handleCreateContract = async () => {
// //         const contractRequest: ICreateContractRequest = {
// //             ownerId: ownerId,
// //             renterId: renterId,
// //             propertyId: propertyId,
// //             startDate: startDate,
// //             endDate: endDate,
// //             contractTerms: contractContent,
// //             monthlyRent: monthlyRent,
// //             depositAmount: depositAmount,
// //         };

// //         try {
// //             const response = await createContract(contractRequest);
// //             console.log(response);

// //             Alert.alert('Success', 'Contract created successfully');
// //         } catch (error) {
// //             Alert.alert('Error', 'Failed to create contract');
// //         }
// //     };

// //     if (loading) {
// //         return (
// //             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
// //                 <ActivityIndicator size="large" color="#0000ff" />
// //             </View>
// //         );
// //     }

// //     // Get the screen width
// //     const screenWidth = Dimensions.get('window').width;
// //     return (
// //         <View style={styles.container}>
// //             <ScrollView style={styles.scrollView}>
// //                 <RenderHtml
// //                     contentWidth={screenWidth}
// //                     source={{ html: contractContent }}
// //                 />
// //             </ScrollView>
// //             <View style={styles.buttonContainer}>
// //                 <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
// //                     <Text style={commonStyles.buttonText}>Hủy</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity style={styles.button} onPress={handleCreateContract}>
// //                     <Text style={commonStyles.buttonText}>Tạo hợp đồng</Text>
// //                 </TouchableOpacity>
// //             </View>
// //         </View >
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //     },
// //     scrollView: {
// //         flex: 1,
// //         padding: 10,
// //     },
// //     buttonContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-around',
// //         padding: 10,
// //         borderTopWidth: 1,
// //         borderTopColor: '#ccc',

// //     },
// //     button: {
// //         backgroundColor: '#007BFF',
// //         justifyContent: 'center',
// //         borderRadius: 10,
// //         width: 100,
// //         height: 40,
// //         alignItems: 'center',
// //     }
// // });

// // export default ContractScreen;

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
// import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
// import RenderHtml from 'react-native-render-html';
// import { RootStackParamList } from '../../../types/navigation';
// import { commonStyles } from '../../../styles/theme';
// import { ICreateContractRequest } from '../../../types/contract';
// import { createContract, updateRentalRequestStatus } from '../../../api/contract';
// // import { updateRentalRequestStatus } from '../../../api/api';


// type ContractScreenRouteProp = RouteProp<RootStackParamList, 'ContractScreen'>;

// const ContractScreen = () => {
//     const [loading, setLoading] = useState(true);
//     const route = useRoute<ContractScreenRouteProp>();
//     const { contractData, requestId } = route.params;
//     const { contractContent, ownerId, renterId, propertyId, startDate, endDate, monthlyRent, depositAmount } = contractData;
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//     // Simulate data fetching
//     useEffect(() => {
//         // Simulate a delay to fetch data
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 2000); // 2 seconds delay

//         // Cleanup the timer
//         return () => clearTimeout(timer);
//     }, []);

//     const handleCreateContract = async () => {
//         const contractRequest: ICreateContractRequest = {
//             ownerId: ownerId,
//             renterId: renterId,
//             propertyId: propertyId,
//             startDate: startDate,
//             endDate: endDate,
//             contractTerms: contractContent,
//             monthlyRent: monthlyRent,
//             depositAmount: depositAmount,
//         };

//         console.log(contractRequest);


//         try {
//             const response = await createContract(contractRequest);
//             console.log(ownerId, requestId);

//             // await updateRentalRequestStatus(requestId, 'APPROVED');

//             Alert.alert('Success', 'Contract created successfully');
//             navigation.navigate('ManageRequestRental');
//         } catch (error) {
//             Alert.alert('Error', 'Có lỗi xảy ra khi tạo hợp đồng hoặc cập nhật trạng thái yêu cầu thuê.');
//         }
//     };

//     if (loading) {
//         return (
//             <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     // Get the screen width
//     const screenWidth = Dimensions.get('window').width;
//     return (
//         <View style={styles.container}>
//             <ScrollView style={styles.scrollView}>
//                 <RenderHtml
//                     contentWidth={screenWidth}
//                     source={{ html: contractContent }}
//                 />
//             </ScrollView>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
//                     <Text style={commonStyles.buttonText}>Hủy</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.button, { backgroundColor: '#007BFF' }]} onPress={handleCreateContract}>
//                     <Text style={commonStyles.buttonText}>Tạo hợp đồng</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     scrollView: {
//         flex: 1,
//         padding: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 5,
//         borderTopWidth: 1,
//         borderTopColor: '#ccc',
//     },
//     button: {
//         flex: 1,
//         padding: 10,
//         margin: 5,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
// });

// export default ContractScreen;


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { RootStackParamList } from '../../../types/navigation';
import { commonStyles } from '../../../styles/theme';
import { ICreateContractRequest } from '../../../types/contract';
import { createContract, updateRentalRequestStatus } from '../../../api/contract';
import { Connector, useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';
import { getOwnerCreateContractMessage } from '../../../utils/contract';
// import { updateRentalRequestStatus } from '../../../api/api';


type ContractScreenRouteProp = RouteProp<RootStackParamList, 'ContractScreen'>;

const ContractScreen = () => {
    const [loading, setLoading] = useState(true);
    const route = useRoute<ContractScreenRouteProp>();
    const { contractData, requestId } = route.params;
    const { contractContent, ownerId, renterId, propertyId, startDate, endDate, monthlyRent, depositAmount } = contractData;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { signMessageAsync } = useSignMessage();
    const { connectAsync, connectors } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { address } = useAccount();
    const user = useSelector((state: RootState) => state.user.user);


    const handleSign = async ({ message }: { message: string }) => {
        const connector: Connector = connectors.find((c) => c.id === 'metaMaskSDK')!;

        if (address !== user?.walletAddress) {
            await disconnectAsync();
            await connectAsync({ connector });
        }

        if (user?.walletAddress !== address) throw new Error('Địa chỉ ví không khớp');

        const res = await signMessageAsync({
            message,
            account: address,
        });

        return res;
    };


    // Simulate data fetching
    useEffect(() => {
        // Simulate a delay to fetch data
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // 2 seconds delay

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, []);

    const handleCreateContract = async () => {
        try {
            const contractRequest: ICreateContractRequest = {
                ownerId: ownerId,
                renterId: renterId,
                propertyId: propertyId,
                startDate: startDate,
                endDate: endDate,
                contractTerms: contractContent,
                monthlyRent: monthlyRent,
                depositAmount: depositAmount,
                signature: '',
            };

            const message = getOwnerCreateContractMessage(contractRequest);

            const signature = await handleSign({ message });



            const response = await createContract({
                ...contractRequest,
                signature,
            });
            console.log(response);

            // await updateRentalRequestStatus(requestId, 'APPROVED');

            Alert.alert('Thành công', 'Tạo hợp đồng thành công');
            navigation.navigate('ManageRequestRental');
        } catch (error: any) {
            console.error('Error creating contract:', error);
            Alert.alert('Lỗi', `Có lỗi xảy ra khi tạo hợp đồng hoặc cập nhật trạng thái yêu cầu thuê: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Get the screen width
    const screenWidth = Dimensions.get('window').width;
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <RenderHtml
                    contentWidth={screenWidth}
                    source={{ html: contractContent }}
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
                    <Text style={commonStyles.buttonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#007BFF' }]} onPress={handleCreateContract}>
                    <Text style={commonStyles.buttonText}>Tạo hợp đồng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default ContractScreen;