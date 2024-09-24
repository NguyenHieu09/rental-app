// ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

const ProfileScreen: React.FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [profile, setProfile] = useState<UserProfile>({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+123456789',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Avatar mẫu
    });

    const [updatedProfile, setUpdatedProfile] = useState<UserProfile>(profile);

    const handleEditToggle = () => {
        if (isEditing) {
            // Khi tắt chế độ chỉnh sửa, cập nhật thông tin profile
            setProfile(updatedProfile);
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (key: keyof UserProfile, value: string) => {
        setUpdatedProfile({ ...updatedProfile, [key]: value });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: profile.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{profile.name}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={updatedProfile.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />
                ) : (
                    <Text style={styles.infoText}>{profile.email}</Text>
                )}

                <Text style={styles.label}>Phone</Text>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={updatedProfile.phone}
                        onChangeText={(text) => handleChange('phone', text)}
                    />
                ) : (
                    <Text style={styles.infoText}>{profile.phone}</Text>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
                <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom: 15,
    },
    input: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileScreen;
