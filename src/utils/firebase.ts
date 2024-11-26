import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';

type UploadFileProps = {
    fileUri: string;
    fileName: string;
    folder?: string;
};

export const uploadFile = async ({
    fileUri,
    fileName,
    folder = 'chat',
}: UploadFileProps): Promise<string> => {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const contentType = blob.type;
    const metadata = {
        contentType,
    };

    const storageRef = ref(storage, `${folder}/${Date.now()}-${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            () => {},
            (error) => reject(error),
            async () => {
                const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref,
                );
                resolve(downloadURL);
            },
        );
    });
};

export const uploadFiles = async ({
    files,
    folder = 'chat',
}: {
    files: { uri: string; name: string }[];
    folder?: string;
}): Promise<string[]> => {
    return Promise.all(
        files.map((file) =>
            uploadFile({ fileUri: file.uri, fileName: file.name, folder }),
        ),
    );
};

// Usage example with Expo ImagePicker
export const pickAndUploadImages = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
    });

    if (!pickerResult.canceled) {
        const files = pickerResult.assets.map((asset) => ({
            uri: asset.uri,
            name: asset.uri.split('/').pop() || 'image.jpg',
        }));
        return await uploadFiles({ files });
    }
    return [];
};
