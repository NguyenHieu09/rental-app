// // // import React, { useState, useRef } from 'react';
// // // import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
// // // import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// // // import { Ionicons } from '@expo/vector-icons';
// // // import Icon from 'react-native-vector-icons/MaterialIcons';
// // // import * as ImagePicker from 'expo-image-picker';
// // // import axios from 'axios';

// // // const AuthenticationScreen = () => {
// // //     const [permission, requestPermission] = useCameraPermissions();
// // //     const [frontImage, setFrontImage] = useState<string | null>(null);
// // //     const [backImage, setBackImage] = useState<string | null>(null);
// // //     const [isFrontCamera, setIsFrontCamera] = useState(true);
// // //     const [facing, setFacing] = useState<CameraType>('back');
// // //     const cameraRef = useRef<CameraView | null>(null);
// // //     const [isCameraVisible, setIsCameraVisible] = useState(false);
// // //     const [isCapturingFront, setIsCapturingFront] = useState(true);
// // //     const [loading, setLoading] = useState(false);

// // //     const takePicture = async () => {
// // //         if (cameraRef.current) {
// // //             const photo = await cameraRef.current.takePictureAsync();
// // //             if (photo && photo.uri) {
// // //                 if (isCapturingFront) {
// // //                     setFrontImage(photo.uri);
// // //                 } else {
// // //                     setBackImage(photo.uri);
// // //                 }
// // //                 setIsCameraVisible(false);
// // //             } else {
// // //                 console.error("Failed to take picture or photo is undefined");
// // //             }
// // //         }
// // //     };

// // //     function toggleCameraFacing() {
// // //         setFacing(current => (current === 'back' ? 'front' : 'back'));
// // //     }

// // //     const handleOpenCamera = (isFront: boolean) => {
// // //         setIsCapturingFront(isFront);
// // //         setIsCameraVisible(true);
// // //     };

// // //     const pickImage = async () => {
// // //         const result = await ImagePicker.launchImageLibraryAsync({
// // //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // //             allowsEditing: true,
// // //             quality: 1,
// // //         });

// // //         if (!result.canceled) {
// // //             const selectedImage = result.assets[0].uri;
// // //             if (isCapturingFront) {
// // //                 setFrontImage(selectedImage);
// // //             } else {
// // //                 setBackImage(selectedImage);
// // //             }
// // //             setIsCameraVisible(false);
// // //         }
// // //     };




// // //     if (!permission) {
// // //         return <Text>Requesting for camera permission...</Text>;
// // //     }

// // //     if (!permission.granted) {
// // //         return (
// // //             <View style={styles.container}>
// // //                 <Text style={styles.message}>We need your permission to show the camera</Text>
// // //                 <Button onPress={requestPermission} title="Grant Permission" />
// // //             </View>
// // //         );
// // //     }

// // //     return (
// // //         <View style={styles.container}>
// // //             <View style={styles.imageSection}>
// // //                 <View style={styles.imageContainer}>
// // //                     <Text style={styles.label}>Ảnh mặt trước CCCD</Text>
// // //                     {frontImage ? (
// // //                         <>
// // //                             <TouchableOpacity onPress={() => handleOpenCamera(true)}>
// // //                                 <Image source={{ uri: frontImage }} style={styles.image} />
// // //                             </TouchableOpacity>
// // //                         </>
// // //                     ) : (
// // //                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(true)}>
// // //                             <Text style={styles.placeholderText}>Front Image</Text>
// // //                         </TouchableOpacity>
// // //                     )}
// // //                 </View>

// // //                 <View style={styles.imageContainer}>
// // //                     <Text style={styles.label}>Ảnh mặt sau CCCD</Text>
// // //                     {backImage ? (
// // //                         <>
// // //                             <TouchableOpacity onPress={() => handleOpenCamera(false)}>
// // //                                 <Image source={{ uri: backImage }} style={styles.image} />
// // //                             </TouchableOpacity>
// // //                         </>
// // //                     ) : (
// // //                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(false)}>
// // //                             <Text style={styles.placeholderText}>Back Image</Text>
// // //                         </TouchableOpacity>
// // //                     )}
// // //                 </View>
// // //             </View>

// // //             <TouchableOpacity style={styles.verifyButton} onPress={handleUpload}>
// // //                 <Text style={styles.verifyButtonText}>Xác thực</Text>
// // //             </TouchableOpacity>

// // //             <Modal visible={isCameraVisible} animationType="slide">
// // //                 <View style={styles.cameraContainer}>
// // //                     <CameraView style={[styles.camera]} ref={cameraRef} facing={facing}>
// // //                         <TouchableOpacity style={styles.closeButton} onPress={() => setIsCameraVisible(false)}>
// // //                             <Ionicons name="close" size={30} color="white" />
// // //                         </TouchableOpacity>
// // //                         <View style={styles.buttonContainer}>
// // //                             <TouchableOpacity style={styles.libraryButton} onPress={pickImage}>
// // //                                 <Ionicons name="images" size={30} color="#fff" />
// // //                             </TouchableOpacity>

// // //                             <TouchableOpacity style={styles.circularButton} onPress={takePicture}>
// // //                             </TouchableOpacity>
// // //                             <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
// // //                                 <Icon name="flip-camera-android" size={30} color="#fff" />
// // //                             </TouchableOpacity>
// // //                         </View>
// // //                     </CameraView>
// // //                 </View>
// // //             </Modal>
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //         justifyContent: 'center',
// // //         alignItems: 'center',
// // //         backgroundColor: '#f0f0f0',
// // //     },
// // //     imageSection: {
// // //         marginBottom: 30,
// // //     },
// // //     imageContainer: {
// // //         marginHorizontal: 10,
// // //         alignItems: 'center',
// // //     },
// // //     label: {
// // //         fontSize: 14,
// // //         marginBottom: 10,
// // //         color: '#333',
// // //     },
// // //     image: {
// // //         width: 290,
// // //         height: 200,
// // //         resizeMode: 'contain',
// // //         borderWidth: 1,
// // //         borderColor: '#ddd',
// // //     },
// // //     placeholder: {
// // //         width: 290,
// // //         height: 200,
// // //         backgroundColor: '#eee',
// // //         justifyContent: 'center',
// // //         alignItems: 'center',
// // //         borderWidth: 1,
// // //         borderColor: '#ddd',
// // //     },
// // //     placeholderText: {
// // //         color: '#aaa',
// // //     },
// // //     cameraContainer: {
// // //         flex: 1,
// // //         justifyContent: 'center',
// // //         alignItems: 'center',
// // //     },
// // //     camera: {
// // //         width: '100%',
// // //         aspectRatio: 3 / 4,
// // //     },
// // //     buttonContainer: {
// // //         position: 'absolute',
// // //         bottom: 0,
// // //         width: '100%',
// // //         flexDirection: 'row',
// // //         justifyContent: 'space-between',
// // //         alignItems: 'center',
// // //         padding: 20,
// // //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // //     },
// // //     verifyButton: {
// // //         backgroundColor: '#007bff',
// // //         paddingVertical: 10,
// // //         paddingHorizontal: 20,
// // //         borderRadius: 5,
// // //         alignItems: 'center',
// // //     },
// // //     verifyButtonText: {
// // //         color: '#fff',
// // //         fontSize: 16,
// // //     },
// // //     retakeButton: {
// // //         marginTop: 10,
// // //         backgroundColor: '#ff9933',
// // //         paddingVertical: 10,
// // //         paddingHorizontal: 20,
// // //         borderRadius: 5,
// // //         alignItems: 'center',
// // //     },
// // //     retakeButtonText: {
// // //         color: '#fff',
// // //         fontSize: 16,
// // //     },
// // //     message: {
// // //         textAlign: 'center',
// // //         paddingBottom: 10,
// // //     },
// // //     cameraButton: {
// // //         right: 10,
// // //         alignItems: 'flex-end',
// // //     },
// // //     cameraButtonText: {
// // //         color: '#fff',
// // //         fontSize: 16,
// // //     },
// // //     closeButton: {
// // //         position: 'absolute',
// // //         top: 0,
// // //         right: 0,
// // //         paddingVertical: 10,
// // //         paddingHorizontal: 20,
// // //         borderRadius: 5,
// // //     },
// // //     closeButtonText: {
// // //         color: '#fff',
// // //         fontSize: 16,
// // //     },
// // //     circularButton: {
// // //         width: 60,
// // //         height: 60,
// // //         backgroundColor: '#fff',
// // //         borderRadius: 30,
// // //         justifyContent: 'center',
// // //         alignItems: 'center',
// // //         shadowColor: '#000',
// // //         shadowOffset: { width: 0, height: 2 },
// // //         shadowOpacity: 0.25,
// // //         shadowRadius: 3.84,
// // //         elevation: 5,
// // //     },
// // //     buttonText: {
// // //         fontSize: 24,
// // //         color: '#000',
// // //     },
// // //     libraryButton: {
// // //         borderRadius: 5,
// // //         alignItems: 'center',
// // //         justifyContent: 'center',
// // //     },
// // //     libraryButtonText: {
// // //         color: '#fff',
// // //         fontSize: 16,
// // //     },
// // // });

// // // export default AuthenticationScreen;

// // import React, { useState, useRef } from 'react';
// // import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
// // import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// // import { Ionicons } from '@expo/vector-icons';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import * as ImagePicker from 'expo-image-picker';
// // import * as FileSystem from 'expo-file-system';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import * as ImageManipulator from 'expo-image-manipulator';
// // import { processImage } from '../../utils/imageUtils';

// // const AuthenticationScreen = () => {
// //     const [permission, requestPermission] = useCameraPermissions();
// //     const [frontImage, setFrontImage] = useState<string | null>(null);
// //     const [backImage, setBackImage] = useState<string | null>(null);
// //     const [isFrontCamera, setIsFrontCamera] = useState(true);
// //     const [facing, setFacing] = useState<CameraType>('back');
// //     const cameraRef = useRef<CameraView | null>(null);
// //     const [isCameraVisible, setIsCameraVisible] = useState(false);
// //     const [isCapturingFront, setIsCapturingFront] = useState(true);
// //     const [loading, setLoading] = useState(false);

// //     const takePicture = async () => {
// //         if (cameraRef.current) {
// //             const photo = await cameraRef.current.takePictureAsync();
// //             if (photo && photo.uri) {
// //                 if (isCapturingFront) {
// //                     setFrontImage(photo.uri);
// //                 } else {
// //                     setBackImage(photo.uri);
// //                 }
// //                 setIsCameraVisible(false);
// //             } else {
// //                 console.error("Failed to take picture or photo is undefined");
// //             }
// //         }
// //     };

// //     function toggleCameraFacing() {
// //         setFacing(current => (current === 'back' ? 'front' : 'back'));
// //     }

// //     const handleOpenCamera = (isFront: boolean) => {
// //         setIsCapturingFront(isFront);
// //         setIsCameraVisible(true);
// //     };

// //     const uriToBlob = async (uri: string): Promise<Blob> => {
// //         const response = await fetch(uri);
// //         const blob = await response.blob();
// //         return blob;
// //     };

// //     const processImage = async (uri: string) => {
// //         const manipResult = await ImageManipulator.manipulateAsync(
// //             uri,
// //             [{ resize: { width: 600 } }], // Resize the image
// //             { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress the image
// //         );
// //         return await uriToBlob(manipResult.uri);
// //     };

// //     const handleUpload = async () => {
// //         if (!frontImage || !backImage) {
// //             Alert.alert('Error', 'Please capture both front and back images.');
// //             return;
// //         }

// //         setLoading(true);

// //         try {
// //             console.log('Uploading images...');

// //             // Xử lý hình ảnh (thay đổi kích thước, nén và chuyển sang base64)
// //             const frontBase64 = await processImage(frontImage);
// //             const backBase64 = await processImage(backImage);

// //             // Chuyển đổi base64 thành Blob
// //             const frontBlob = await fetch(`data:image/jpeg;base64,${frontBase64}`).then(res => res.blob());
// //             const backBlob = await fetch(`data:image/jpeg;base64,${backBase64}`).then(res => res.blob());

// //             // Tạo FormData
// //             const formData = new FormData();
// //             formData.append('files[front]', frontBlob, 'front.jpg');
// //             formData.append('files[back]', backBlob, 'back.jpg');

// //             console.log('FormData payload:', formData);

// //             const token = await AsyncStorage.getItem('accessToken');
// //             if (!token) {
// //                 throw new Error('No token provided');
// //             }

// //             const response = await fetch('http://192.168.1.13:4000/api/v1/estate-manager-service/users/verify', {
// //                 method: 'POST',
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                     // Không cần thiết phải đặt 'Content-Type' khi sử dụng FormData
// //                 },
// //                 body: formData,
// //             });

// //             console.log('Response status:', response.status);

// //             if (!response.ok) {
// //                 const errorText = await response.text();
// //                 console.error('Response error text:', errorText);
// //                 throw new Error('Failed to verify user');
// //             }

// //             const userData = await response.json();
// //             Alert.alert('Success', 'User verified successfully');
// //             console.log('User data:', userData);
// //         } catch (error) {
// //             console.error('Error verifying user:', error);
// //             Alert.alert('Error', 'Failed to verify user');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const pickImage = async () => {
// //         const result = await ImagePicker.launchImageLibraryAsync({
// //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //             allowsEditing: true,
// //             quality: 1,
// //         });

// //         if (!result.canceled) {
// //             const selectedImage = result.assets[0].uri;
// //             if (isCapturingFront) {
// //                 setFrontImage(selectedImage);
// //             } else {
// //                 setBackImage(selectedImage);
// //             }
// //             setIsCameraVisible(false);
// //         }
// //     };

// //     if (!permission) {
// //         return <Text>Requesting for camera permission...</Text>;
// //     }

// //     if (!permission.granted) {
// //         return (
// //             <View style={styles.container}>
// //                 <Text style={styles.message}>We need your permission to show the camera</Text>
// //                 <Button onPress={requestPermission} title="Grant Permission" />
// //             </View>
// //         );
// //     }

// //     return (
// //         <View style={styles.container}>
// //             <View style={styles.imageSection}>
// //                 <View style={styles.imageContainer}>
// //                     <Text style={styles.label}>Ảnh mặt trước CCCD</Text>
// //                     {frontImage ? (
// //                         <TouchableOpacity onPress={() => handleOpenCamera(true)}>
// //                             <Image source={{ uri: frontImage }} style={styles.image} />
// //                         </TouchableOpacity>
// //                     ) : (
// //                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(true)}>
// //                             <Text style={styles.placeholderText}>Front Image</Text>
// //                         </TouchableOpacity>
// //                     )}
// //                 </View>

// //                 <View style={styles.imageContainer}>
// //                     <Text style={styles.label}>Ảnh mặt sau CCCD</Text>
// //                     {backImage ? (
// //                         <TouchableOpacity onPress={() => handleOpenCamera(false)}>
// //                             <Image source={{ uri: backImage }} style={styles.image} />
// //                         </TouchableOpacity>
// //                     ) : (
// //                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(false)}>
// //                             <Text style={styles.placeholderText}>Back Image</Text>
// //                         </TouchableOpacity>
// //                     )}
// //                 </View>
// //             </View>

// //             <TouchableOpacity style={styles.verifyButton} onPress={handleUpload}>
// //                 <Text style={styles.verifyButtonText}>Xác thực</Text>
// //             </TouchableOpacity>

// //             <Modal visible={isCameraVisible} animationType="slide">
// //                 <View style={styles.cameraContainer}>
// //                     <CameraView style={[styles.camera]} ref={cameraRef} facing={facing}>
// //                         <TouchableOpacity style={styles.closeButton} onPress={() => setIsCameraVisible(false)}>
// //                             <Ionicons name="close" size={30} color="white" />
// //                         </TouchableOpacity>
// //                         <View style={styles.buttonContainer}>
// //                             <TouchableOpacity style={styles.libraryButton} onPress={pickImage}>
// //                                 <Ionicons name="images" size={30} color="#fff" />
// //                             </TouchableOpacity>

// //                             <TouchableOpacity style={styles.circularButton} onPress={takePicture}>
// //                             </TouchableOpacity>
// //                             <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
// //                                 <Icon name="flip-camera-android" size={30} color="#fff" />
// //                             </TouchableOpacity>
// //                         </View>
// //                     </CameraView>
// //                 </View>
// //             </Modal>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         backgroundColor: '#f0f0f0',
// //     },
// //     imageSection: {
// //         marginBottom: 30,
// //     },
// //     imageContainer: {
// //         marginHorizontal: 10,
// //         alignItems: 'center',
// //     },
// //     label: {
// //         fontSize: 14,
// //         marginBottom: 10,
// //         color: '#333',
// //     },
// //     image: {
// //         width: 290,
// //         height: 200,
// //         resizeMode: 'contain',
// //         borderWidth: 1,
// //         borderColor: '#ddd',
// //     },
// //     placeholder: {
// //         width: 290,
// //         height: 200,
// //         backgroundColor: '#eee',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         borderWidth: 1,
// //         borderColor: '#ddd',
// //     },
// //     placeholderText: {
// //         color: '#aaa',
// //     },
// //     cameraContainer: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     camera: {
// //         width: '100%',
// //         aspectRatio: 3 / 4,
// //     },
// //     buttonContainer: {
// //         position: 'absolute',
// //         bottom: 0,
// //         width: '100%',
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         padding: 20,
// //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     },
// //     verifyButton: {
// //         backgroundColor: '#007bff',
// //         paddingVertical: 10,
// //         paddingHorizontal: 20,
// //         borderRadius: 5,
// //         alignItems: 'center',
// //     },
// //     verifyButtonText: {
// //         color: '#fff',
// //         fontSize: 16,
// //     },
// //     retakeButton: {
// //         marginTop: 10,
// //         backgroundColor: '#ff9933',
// //         paddingVertical: 10,
// //         paddingHorizontal: 20,
// //         borderRadius: 5,
// //         alignItems: 'center',
// //     },
// //     retakeButtonText: {
// //         color: '#fff',
// //         fontSize: 16,
// //     },
// //     message: {
// //         textAlign: 'center',
// //         paddingBottom: 10,
// //     },
// //     cameraButton: {
// //         right: 10,
// //         alignItems: 'flex-end',
// //     },
// //     cameraButtonText: {
// //         color: '#fff',
// //         fontSize: 16,
// //     },
// //     closeButton: {
// //         position: 'absolute',
// //         top: 0,
// //         right: 0,
// //         paddingVertical: 10,
// //         paddingHorizontal: 20,
// //         borderRadius: 5,
// //     },
// //     closeButtonText: {
// //         color: '#fff',
// //         fontSize: 16,
// //     },
// //     circularButton: {
// //         width: 60,
// //         height: 60,
// //         backgroundColor: '#fff',
// //         borderRadius: 30,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 3.84,
// //         elevation: 5,
// //     },
// //     buttonText: {
// //         fontSize: 24,
// //         color: '#000',
// //     },
// //     libraryButton: {
// //         borderRadius: 5,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //     },
// //     libraryButtonText: {
// //         color: '#fff',
// //         fontSize: 16,
// //     },
// // });

// // export default AuthenticationScreen;

// import React, { useState, useRef } from 'react';
// import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
// import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImageManipulator from 'expo-image-manipulator';

// const AuthenticationScreen = () => {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [frontImage, setFrontImage] = useState<string | null>(null);
//     const [backImage, setBackImage] = useState<string | null>(null);
//     const [facing, setFacing] = useState<CameraType>('back');
//     const cameraRef = useRef<CameraView | null>(null);
//     const [isCameraVisible, setIsCameraVisible] = useState(false);
//     const [isCapturingFront, setIsCapturingFront] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const takePicture = async () => {
//         if (cameraRef.current) {
//             const photo = await cameraRef.current.takePictureAsync();
//             if (photo && photo.uri) {
//                 if (isCapturingFront) {
//                     setFrontImage(photo.uri);
//                 } else {
//                     setBackImage(photo.uri);
//                 }
//                 setIsCameraVisible(false);
//             } else {
//                 console.error("Failed to take picture or photo is undefined");
//             }
//         }
//     };

//     const toggleCameraFacing = () => {
//         setFacing(current => (current === 'back' ? 'front' : 'back'));
//     };

//     const handleOpenCamera = (isFront: boolean) => {
//         setIsCapturingFront(isFront);
//         setIsCameraVisible(true);
//     };

//     const processImage = async (uri: string) => {
//         const manipResult = await ImageManipulator.manipulateAsync(
//             uri,
//             [{ resize: { width: 600 } }],
//             { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
//         );
//         return manipResult.uri; // return the processed image URI
//     };

//     const handleUpload = async () => {
//         if (!frontImage || !backImage) {
//             Alert.alert('Error', 'Please capture both front and back images.');
//             return;
//         }

//         setLoading(true);

//         try {
//             console.log('Uploading images...');

//             // Process images
//             const frontUri = await processImage(frontImage);
//             const backUri = await processImage(backImage);

//             // Create FormData
//             const formData = new FormData();
//             formData.append('front', {
//                 uri: frontUri,
//                 name: 'front.jpg',
//                 type: 'image/jpeg',
//             } as any);
//             formData.append('back', {
//                 uri: backUri,
//                 name: 'back.jpg',
//                 type: 'image/jpeg',
//             } as any);

//             console.log('FormData payload:', formData);

//             const token = await AsyncStorage.getItem('accessToken');
//             if (!token) {
//                 throw new Error('No token provided');
//             }

//             const response = await fetch('http://192.168.1.13:4000/api/v1/estate-manager-service/users/verify', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${token}`,

//                 },
//                 body: formData,
//             });

//             console.log('Response status:', response.status);

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 console.error('Response error text:', errorText);
//                 throw new Error('Failed to verify user');
//             }

//             const userData = await response.json();
//             Alert.alert('Success', 'User verified successfully');
//             console.log('User data:', userData);
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 console.error('Error verifying user:', error.message);
//                 Alert.alert('Error', error.message || 'Failed to verify user');
//             } else {
//                 console.error('Unexpected error:', error);
//                 Alert.alert('Error', 'An unexpected error occurred');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };



//     const pickImage = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const selectedImage = result.assets[0].uri;
//             if (isCapturingFront) {
//                 setFrontImage(selectedImage);
//             } else {
//                 setBackImage(selectedImage);
//             }
//             setIsCameraVisible(false);
//         }
//     };

//     if (!permission) {
//         return <Text>Requesting for camera permission...</Text>;
//     }

//     if (!permission.granted) {
//         return (
//             <View style={styles.container}>
//                 <Text >We need your permission to show the camera</Text>
//                 <Button onPress={requestPermission} title="Grant Permission" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.imageSection}>
//                 <View style={styles.imageContainer}>
//                     <Text style={styles.label}>Ảnh mặt trước CCCD</Text>
//                     {frontImage ? (
//                         <TouchableOpacity onPress={() => handleOpenCamera(true)}>
//                             <Image source={{ uri: frontImage }} style={styles.image} />
//                         </TouchableOpacity>
//                     ) : (
//                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(true)}>
//                             <Text style={styles.placeholderText}>Front Image</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 <View style={styles.imageContainer}>
//                     <Text style={styles.label}>Ảnh mặt sau CCCD</Text>
//                     {backImage ? (
//                         <TouchableOpacity onPress={() => handleOpenCamera(false)}>
//                             <Image source={{ uri: backImage }} style={styles.image} />
//                         </TouchableOpacity>
//                     ) : (
//                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(false)}>
//                             <Text style={styles.placeholderText}>Back Image</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </View>

//             <TouchableOpacity style={styles.verifyButton} onPress={handleUpload} disabled={loading}>
//                 <Text style={styles.verifyButtonText}>Xác thực</Text>
//             </TouchableOpacity>

//             <Modal visible={isCameraVisible} animationType="slide">
//                 <View style={styles.cameraContainer}>
//                     <CameraView style={[styles.camera]} ref={cameraRef} facing={facing}>
//                         <TouchableOpacity style={styles.closeButton} onPress={() => setIsCameraVisible(false)}>
//                             <Ionicons name="close" size={30} color="white" />
//                         </TouchableOpacity>
//                         <View style={styles.buttonContainer}>
//                             <TouchableOpacity style={styles.libraryButton} onPress={pickImage}>
//                                 <Ionicons name="images" size={30} color="#fff" />
//                             </TouchableOpacity>

//                             <TouchableOpacity style={styles.circularButton} onPress={takePicture} />
//                             <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
//                                 <Icon name="flip-camera-android" size={30} color="#fff" />
//                             </TouchableOpacity>
//                         </View>
//                     </CameraView>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0',
//     },
//     imageSection: {
//         marginBottom: 30,
//     },
//     imageContainer: {
//         marginHorizontal: 10,
//         alignItems: 'center',
//     },
//     label: {
//         fontSize: 14,
//         marginBottom: 10,
//         color: '#333',
//     },
//     image: {
//         width: 290,
//         height: 200,
//         resizeMode: 'contain',
//         borderWidth: 1,
//         borderColor: '#ddd',
//     },
//     placeholder: {
//         width: 290,
//         height: 200,
//         backgroundColor: '#eee',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#ddd',
//     },
//     placeholderText: {
//         color: '#aaa',
//     },
//     cameraContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     camera: {
//         width: '100%',
//         aspectRatio: 3 / 4,
//     },
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: 'transparent',
//     },
//     closeButton: {
//         padding: 10,
//     },
//     circularButton: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: '#fff',
//         alignSelf: 'center',
//     },
//     cameraButton: {
//         padding: 10,
//     },
//     libraryButton: {
//         padding: 10,
//     },
//     verifyButton: {
//         backgroundColor: '#007BFF',
//         padding: 15,
//         borderRadius: 5,
//         marginTop: 10,
//         alignItems: 'center',
//         width: '90%',
//     },
//     verifyButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default AuthenticationScreen;

import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import { verifyUser } from '../../api/api';

const AuthenticationScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const cameraRef = useRef<CameraView | null>(null);
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [isCapturingFront, setIsCapturingFront] = useState(true);
    const [loading, setLoading] = useState(false);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo && photo.uri) {
                if (isCapturingFront) {
                    setFrontImage(photo.uri);
                } else {
                    setBackImage(photo.uri);
                }
                setIsCameraVisible(false);
            } else {
                console.error("Failed to take picture or photo is undefined");
            }
        }
    };

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const handleOpenCamera = (isFront: boolean) => {
        setIsCapturingFront(isFront);
        setIsCameraVisible(true);
    };

    const processImage = async (uri: string) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 600 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipResult.uri; // return the processed image URI
    };

    const handleUpload = async () => {
        if (!frontImage || !backImage) {
            Alert.alert('Error', 'Please capture both front and back images.');
            return;
        }

        setLoading(true);

        try {
            console.log('Uploading images...');

            const frontUri = await processImage(frontImage);
            const backUri = await processImage(backImage);

            const userData = await verifyUser(frontUri, backUri); // Use the API function
            Alert.alert('Success', 'User verified successfully');
            console.log('User data:', userData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error verifying user:', error.message);
                Alert.alert('Error', error.message || 'Failed to verify user');
            } else {
                console.error('Unexpected error:', error);
                Alert.alert('Error', 'An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };



    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0].uri;
            if (isCapturingFront) {
                setFrontImage(selectedImage);
            } else {
                setBackImage(selectedImage);
            }
            setIsCameraVisible(false);
        }
    };

    if (!permission) {
        return <Text>Requesting for camera permission...</Text>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text >We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageSection}>
                <View style={styles.imageContainer}>
                    <Text style={styles.label}>Ảnh mặt trước CCCD</Text>
                    {frontImage ? (
                        <TouchableOpacity onPress={() => handleOpenCamera(true)}>
                            <Image source={{ uri: frontImage }} style={styles.image} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(true)}>
                            <Text style={styles.placeholderText}>Front Image</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.imageContainer}>
                    <Text style={styles.label}>Ảnh mặt sau CCCD</Text>
                    {backImage ? (
                        <TouchableOpacity onPress={() => handleOpenCamera(false)}>
                            <Image source={{ uri: backImage }} style={styles.image} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(false)}>
                            <Text style={styles.placeholderText}>Back Image</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={handleUpload} disabled={loading}>
                <Text style={styles.verifyButtonText}>Xác thực</Text>
            </TouchableOpacity>

            <Modal visible={isCameraVisible} animationType="slide">
                <View style={styles.cameraContainer}>
                    <CameraView style={[styles.camera]} ref={cameraRef} facing={facing}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsCameraVisible(false)}>
                            <Ionicons name="close" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.libraryButton} onPress={pickImage}>
                                <Ionicons name="images" size={30} color="#fff" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.circularButton} onPress={takePicture} />
                            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
                                <Icon name="flip-camera-android" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    imageSection: {
        marginBottom: 30,
    },
    imageContainer: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        marginBottom: 10,
        color: '#333',
    },
    image: {
        width: 290,
        height: 200,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    placeholder: {
        width: 290,
        height: 200,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    placeholderText: {
        color: '#aaa',
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        aspectRatio: 3 / 4,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'transparent',
    },
    closeButton: {
        padding: 10,
    },
    circularButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        alignSelf: 'center',
    },
    cameraButton: {
        padding: 10,
    },
    libraryButton: {
        padding: 10,
    },
    verifyButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        width: '90%',
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AuthenticationScreen;
