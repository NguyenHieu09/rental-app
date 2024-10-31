import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';

import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { AntDesign } from '@expo/vector-icons';

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    const videoRef = useRef<Video>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handlePlayPause = async () => {
        if (isPlaying) {
            await videoRef.current?.pauseAsync();
        } else {
            await videoRef.current?.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVideoPress = async () => {
        if (isPlaying) {
            await videoRef.current?.presentFullscreenPlayer();
        } else {
            handlePlayPause();
        }
    };

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded && !status.isBuffering) {
            setIsPlaying((status as AVPlaybackStatusSuccess).isPlaying);
        }
    };

    return (
        <View style={styles.videoContainer}>
            <TouchableOpacity onPress={handleVideoPress} style={styles.videoTouchable}>
                <Video
                    ref={videoRef}
                    source={{ uri: videoUrl }}
                    style={styles.mediaVideo}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                />
                {!isPlaying && (
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={handlePlayPause} // Handle play/pause in one function
                    >
                        <AntDesign name="playcircleo" size={50} color="#fff" />
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    videoContainer: {
        position: 'relative',
    },
    videoTouchable: {
        width: 200,
        height: 200,
    },
    mediaVideo: {
        width: '100%',
        height: '100%',
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }], // Center the button
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50,

    },
    playButtonText: {
        color: '#fff',
        fontSize: 24, // Adjust size as needed
    },
});

export default VideoPlayer;

