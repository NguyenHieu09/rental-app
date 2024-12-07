// import React, { useState, useRef } from 'react';
// import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
// import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';
// import { verifyUser } from '../../api/api';
// import { commonStyles } from '../../styles/theme';
// import { RootState } from '../../redux-toolkit/store';
// import { useSelector } from 'react-redux';

// const AuthenticationScreen = () => {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [frontImage, setFrontImage] = useState<string | null>(null);
//     const [backImage, setBackImage] = useState<string | null>(null);
//     const [facing, setFacing] = useState<CameraType>('back');
//     const cameraRef = useRef<CameraView | null>(null);
//     const [isCameraVisible, setIsCameraVisible] = useState(false);
//     const [isCapturingFront, setIsCapturingFront] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const user = useSelector((state: RootState) => state.user.user);

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
//         return manipResult.uri;
//     };

//     const handleUpload = async () => {

//         if (user?.isVerified) {
//             Alert.alert('Thông báo', 'Bạn đã xác thực rồi.');
//             return;
//         }

//         if (!frontImage || !backImage) {
//             Alert.alert('Lỗi', 'Vui lòng chụp cả hai mặt trước và sau của CCCD.');
//             return;
//         }

//         setLoading(true);

//         try {
//             console.log('Uploading images...');

//             const frontUri = await processImage(frontImage);
//             const backUri = await processImage(backImage);

//             const userData = await verifyUser(frontUri, backUri);
//             Alert.alert('Thành công', 'Người dùng đã xác thực thành công');
//             console.log('User data:', userData);
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 console.error('Error verifying user:', error.message);
//                 Alert.alert('Error', error.message || 'Failed to verify user');
//             } else {
//                 console.error('Unexpected error:', error);
//                 Alert.alert('Error', 'Đã xảy ra lỗi');
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
//         <View style={commonStyles.container}>
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
//         // flex: 1,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         // backgroundColor: '#f0f0f0',
//     },
//     imageSection: {
//         marginBottom: 30,
//     },
//     imageContainer: {
//         marginHorizontal: 10,
//         alignItems: 'center',
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '700',
//         marginBottom: 10,
//         marginTop: 10,
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
//         // width: '90%',
//     },
//     verifyButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default AuthenticationScreen;

import React, { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { verifyUser } from "../../api/api";
import { commonStyles } from "../../styles/theme";
import { RootState } from "../../redux-toolkit/store";
import { useSelector } from "react-redux";

const AuthenticationScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isCapturingFront, setIsCapturingFront] = useState(true);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

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
    setFacing((current) => (current === "back" ? "front" : "back"));
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
    return manipResult.uri;
  };

  const handleUpload = async () => {
    if (user?.isVerified) {
      Alert.alert("Thông báo", "Bạn đã xác thực rồi.");
      return;
    }

    if (!frontImage || !backImage) {
      Alert.alert("Lỗi", "Vui lòng chụp cả hai mặt trước và sau của CCCD.");
      return;
    }

    setLoading(true);

    try {
      console.log("Uploading images...");

      const frontUri = await processImage(frontImage);
      const backUri = await processImage(backImage);

      const userData = await verifyUser(frontUri, backUri);
      Alert.alert("Thành công", "Người dùng đã xác thực thành công");
      console.log("User data:", userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error verifying user:", error.message);
        Alert.alert("Lỗi", error.message || "Xác thực người dùng thất bại");
      } else {
        console.error("Unexpected error:", error);
        Alert.alert("Lỗi", "Đã xảy ra lỗi");
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
    return <Text>Đang yêu cầu quyền truy cập camera...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={commonStyles.container}>
        <Text style={{ textAlign: "center", margin: 10 }}>
          Chúng tôi cần quyền truy cập camera của bạn
        </Text>
        <Button onPress={requestPermission} title="Cấp quyền" />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <View style={styles.imageSection}>
        <View style={styles.imageContainer}>
          <Text style={styles.label}>Ảnh mặt trước CCCD</Text>
          {frontImage ? (
            <TouchableOpacity onPress={() => handleOpenCamera(true)}>
              <Image source={{ uri: frontImage }} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.placeholder}
              onPress={() => handleOpenCamera(true)}
            >
              <Text style={styles.placeholderText}>Ảnh mặt trước</Text>
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
            <TouchableOpacity
              style={styles.placeholder}
              onPress={() => handleOpenCamera(false)}
            >
              <Text style={styles.placeholderText}>Ảnh mặt sau</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleUpload}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.verifyButtonText}>Đang xác thực...</Text>
        ) : (
          <Text style={styles.verifyButtonText}>Xác thực</Text>
        )}
      </TouchableOpacity>

      <Modal visible={isCameraVisible} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView style={[styles.camera]} ref={cameraRef} facing={facing}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCameraVisible(false)}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.libraryButton}
                onPress={pickImage}
              >
                <Ionicons name="images" size={30} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.circularButton}
                onPress={takePicture}
              />
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={toggleCameraFacing}
              >
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f0f0f0',
  },
  imageSection: {
    marginBottom: 30,
  },
  imageContainer: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
    color: "#333",
  },
  image: {
    width: 290,
    height: 200,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  placeholder: {
    width: 290,
    height: 200,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  placeholderText: {
    color: "#aaa",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  closeButton: {
    padding: 10,
  },
  circularButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  cameraButton: {
    padding: 10,
  },
  libraryButton: {
    padding: 10,
  },
  verifyButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    // width: '90%',
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AuthenticationScreen;
