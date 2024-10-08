// // import React, { useState, useRef } from 'react';
// // import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
// // import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// // import { Ionicons } from '@expo/vector-icons';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import * as ImagePicker from 'expo-image-picker';

// // const AuthenticationScreen = () => {
// //     const [permission, requestPermission] = useCameraPermissions();
// //     const [frontImage, setFrontImage] = useState<string | null>(null);
// //     const [backImage, setBackImage] = useState<string | null>(null);
// //     const [isFrontCamera, setIsFrontCamera] = useState(true);
// //     const [facing, setFacing] = useState<CameraType>('back');
// //     const cameraRef = useRef<CameraView | null>(null);
// //     const [isCameraVisible, setIsCameraVisible] = useState(false);
// //     const [isCapturingFront, setIsCapturingFront] = useState(true);

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
// //                         <>
// //                             {/* <Image source={{ uri: frontImage }} style={styles.image} />
// //                             <TouchableOpacity style={styles.retakeButton} onPress={() => handleOpenCamera(true)}>
// //                                 <Text style={styles.retakeButtonText}>Chụp lại</Text>
// //                             </TouchableOpacity> */}
// //                             <TouchableOpacity onPress={() => handleOpenCamera(true)}>
// //                                 <Image source={{ uri: frontImage }} style={styles.image} />
// //                             </TouchableOpacity>
// //                         </>
// //                     ) : (
// //                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(true)}>
// //                             <Text style={styles.placeholderText}>Front Image</Text>
// //                         </TouchableOpacity>
// //                     )}
// //                 </View>

// //                 <View style={styles.imageContainer}>
// //                     <Text style={styles.label}>Ảnh mặt sau CCCD</Text>
// //                     {backImage ? (
// //                         <>
// //                             <TouchableOpacity onPress={() => handleOpenCamera(false)}>
// //                                 <Image source={{ uri: backImage }} style={styles.image} />
// //                             </TouchableOpacity>
// //                         </>
// //                     ) : (
// //                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(false)}>
// //                             <Text style={styles.placeholderText}>Back Image</Text>
// //                         </TouchableOpacity>
// //                     )}
// //                 </View>
// //             </View>

// //             <TouchableOpacity style={styles.verifyButton}>
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
// //         // backgroundColor: '#ff0000',
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
// //         backgroundColor: '#fff', // White background color
// //         borderRadius: 30, // Half of width/height to make it circular
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 3.84,
// //         elevation: 5, // For shadow effect on Android
// //     },
// //     buttonText: {
// //         fontSize: 24,
// //         color: '#000',
// //     },
// //     libraryButton: {

// //         borderRadius: 5,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         // marginTop: 20,
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
// import { verifyUserWithImages } from '../../api/api';
// // import { verifyUserWithImages } from './api/api'; // Import the verifyUserWithImages function

// const AuthenticationScreen = () => {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [frontImage, setFrontImage] = useState<string | null>(null);
//     const [backImage, setBackImage] = useState<string | null>(null);
//     const [isFrontCamera, setIsFrontCamera] = useState(true);
//     const [facing, setFacing] = useState<CameraType>('back');
//     const cameraRef = useRef<CameraView | null>(null);
//     const [isCameraVisible, setIsCameraVisible] = useState(false);
//     const [isCapturingFront, setIsCapturingFront] = useState(true);

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

//     function toggleCameraFacing() {
//         setFacing(current => (current === 'back' ? 'front' : 'back'));
//     }

//     const handleOpenCamera = (isFront: boolean) => {
//         setIsCapturingFront(isFront);
//         setIsCameraVisible(true);
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

//     const convertUriToFile = async (uri: string, name: string): Promise<File> => {
//         const response = await fetch(uri);
//         const blob = await response.blob();
//         return new File([blob], name, { type: blob.type });
//     };

//     const handleVerify = async () => {
//         if (!frontImage || !backImage) {
//             Alert.alert('Error', 'Please capture both front and back images.');
//             return;
//         }

//         try {
//             const frontFile = await convertUriToFile(frontImage, 'front.jpg');
//             const backFile = await convertUriToFile(backImage, 'back.jpg');
//             console.log('frontFile:', frontFile);
//             console.log('backFile:', backFile);

//             const response = await verifyUserWithImages(frontFile, backFile);
//             Alert.alert('Success', 'Verification successful!');
//         } catch (error) {
//             Alert.alert('Error', 'Verification failed. Please try again.');
//             console.error('Verification error:', error);
//         }
//     };

//     if (!permission) {
//         return <Text>Requesting for camera permission...</Text>;
//     }

//     if (!permission.granted) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.message}>We need your permission to show the camera</Text>
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
//                         <>
//                             <TouchableOpacity onPress={() => handleOpenCamera(true)}>
//                                 <Image source={{ uri: frontImage }} style={styles.image} />
//                             </TouchableOpacity>
//                         </>
//                     ) : (
//                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(true)}>
//                             <Text style={styles.placeholderText}>Front Image</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 <View style={styles.imageContainer}>
//                     <Text style={styles.label}>Ảnh mặt sau CCCD</Text>
//                     {backImage ? (
//                         <>
//                             <TouchableOpacity onPress={() => handleOpenCamera(false)}>
//                                 <Image source={{ uri: backImage }} style={styles.image} />
//                             </TouchableOpacity>
//                         </>
//                     ) : (
//                         <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(false)}>
//                             <Text style={styles.placeholderText}>Back Image</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </View>

//             <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
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

//                             <TouchableOpacity style={styles.circularButton} onPress={takePicture}>
//                             </TouchableOpacity>
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
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     verifyButton: {
//         backgroundColor: '#007bff',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     verifyButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     retakeButton: {
//         marginTop: 10,
//         backgroundColor: '#ff9933',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     retakeButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     message: {
//         textAlign: 'center',
//         paddingBottom: 10,
//     },
//     cameraButton: {
//         right: 10,
//         alignItems: 'flex-end',
//     },
//     cameraButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     closeButton: {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
//     closeButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     circularButton: {
//         width: 60,
//         height: 60,
//         backgroundColor: '#fff',
//         borderRadius: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     buttonText: {
//         fontSize: 24,
//         color: '#000',
//     },
//     libraryButton: {
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     libraryButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
// });

// export default AuthenticationScreen;


import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { verifyUserWithImages } from '../../api/api';

const AuthenticationScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [facing, setFacing] = useState<CameraType>('back');
    const cameraRef = useRef<CameraView | null>(null);
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [isCapturingFront, setIsCapturingFront] = useState(true);

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

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleOpenCamera = (isFront: boolean) => {
        setIsCapturingFront(isFront);
        setIsCameraVisible(true);
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

    const handleVerify = async () => {
        if (!frontImage || !backImage) {
            Alert.alert('Error', 'Please capture both front and back images.');
            return;
        }

        try {
            console.log('frontImage URI:', frontImage);
            console.log('backImage URI:', backImage);

            const response = await verifyUserWithImages(frontImage, backImage);
            Alert.alert('Success', 'Verification successful!');
        } catch (error) {
            Alert.alert('Error', 'Verification failed. Please try again.');
            console.error('Verification error:', error);
        }
    };

    if (!permission) {
        return <Text>Requesting for camera permission...</Text>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
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
                        <>
                            <TouchableOpacity onPress={() => handleOpenCamera(true)}>
                                <Image source={{ uri: frontImage }} style={styles.image} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(true)}>
                            <Text style={styles.placeholderText}>Front Image</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.imageContainer}>
                    <Text style={styles.label}>Ảnh mặt sau CCCD</Text>
                    {backImage ? (
                        <>
                            <TouchableOpacity onPress={() => handleOpenCamera(false)}>
                                <Image source={{ uri: backImage }} style={styles.image} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.placeholder} onPress={() => handleOpenCamera(false)}>
                            <Text style={styles.placeholderText}>Back Image</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
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

                            <TouchableOpacity style={styles.circularButton} onPress={takePicture}>
                            </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    verifyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    retakeButton: {
        marginTop: 10,
        backgroundColor: '#ff9933',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    retakeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    cameraButton: {
        right: 10,
        alignItems: 'flex-end',
    },
    cameraButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    circularButton: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 24,
        color: '#000',
    },
    libraryButton: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    libraryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AuthenticationScreen;