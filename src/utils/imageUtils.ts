import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

/**
 * Xử lý hình ảnh: thay đổi kích thước, nén và chuyển sang base64
 * @param uri Đường dẫn của ảnh
 * @returns Chuỗi base64 của ảnh đã xử lý
 */
export const processImage = async (uri: string): Promise<string> => {
    try {
        // Thay đổi kích thước và nén ảnh
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 600 } }], // Thay đổi kích thước ảnh
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Nén ảnh
        );

        // Đọc ảnh dưới dạng base64
        const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        console.log(`Processed image size: ${base64.length} bytes`);
        return base64;
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
};