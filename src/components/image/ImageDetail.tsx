import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { IconOutline } from "@ant-design/icons-react-native";

const { width, height } = Dimensions.get("window");

const ImageDetailScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { imageUrl } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "white",
      headerRight: () => (
        <IconOutline
          name="download"
          size={26}
          color="white"
          style={{ marginRight: 20 }}
          onPress={downloadImage}
        />
      ),
    });
  }, [navigation]);

  const downloadImage = async () => {
    try {
      // Kiểm tra quyền
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Lỗi",
          "Bạn cần cấp quyền lưu hình ảnh vào thư viện của mình"
        );
        return;
      }

      // Tải ảnh về thư mục tạm thời
      const filename = imageUrl.split("/").pop();
      const fileUri = FileSystem.documentDirectory + filename;
      await FileSystem.downloadAsync(imageUrl, fileUri);

      // Lưu vào album
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Thành công", "Ảnh đã được lưu vào thư viện.");
    } catch (error) {
      console.error("Lỗi:", error);
      Alert.alert("Lỗi", "Không thể tài ảnh được.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.zoomableContainer}>
        <ReactNativeZoomableView
          maxZoom={3}
          initialZoom={1}
          contentWidth={width}
          contentHeight={height * 0.7}
          panBoundaryPadding={50}
        >
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </ReactNativeZoomableView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  zoomableContainer: {
    width: width,
    height: height * 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ImageDetailScreen;
