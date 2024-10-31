

// FileComponent.tsx  
import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';

interface FileComponentProps {
    fileName: string;
    fileUri: string;
}

const FileComponent: React.FC<FileComponentProps> = ({ fileName, fileUri }) => {
    const downloadFile = async () => {
        const fileUriPath = FileSystem.documentDirectory + fileName;

        const { uri } = await FileSystem.downloadAsync(fileUri, fileUriPath);
        Alert.alert('Download Complete', `File saved to: ${uri}`);
    };

    // Extract file type from file name
    const fileType = fileName.split('.').pop();

    return (
        <View style={styles.container}>
            <AntDesign name="filetext1" size={20} color="#4A90E2" />
            <View style={styles.textContainer}>
                <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
                <Text style={{ fontSize: 10 }}>{fileType}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: 200,
        // backgroundColor: 'red',
    },
    textContainer: {
        flex: 1,
        marginLeft: 5,
    },
    fileName: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 10,
    },
});

export default FileComponent;