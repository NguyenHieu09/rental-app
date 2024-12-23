import { NavigationProp, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  readConversation,
  setSelectedConversation,
} from "../../redux-toolkit/slices/conversationSlice";
import { socket } from "../../redux-toolkit/slices/socketSlice";
import { AppDispatch, RootState } from "../../redux-toolkit/store";
import { ChatStatus, IChat, IMediaType } from "../../types/chat";
import { IReadConversationSocket } from "../../types/conversation";
import { RootStackParamList } from "../../types/navigation";
import { getFirstAndLastName } from "../../utils/avatar";
import ChatInput from "./ChatInput";
import FileComponent from "./FileComponent";
import VideoPlayer from "./VideoPlayer";

const ChatDetail: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const selectedConversation = useSelector(
    (state: RootState) => state.conversations.selectedConversation
  );
  const [inputText, setInputText] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);
  const chats = selectedConversation?.chats || [];
  const dispatch = useDispatch<AppDispatch>();
  const flatListRef = useRef<FlatList<IChat>>(null);

  useEffect(() => {
    const friend = selectedConversation?.participants.find(
      (p) => p.userId !== user?.userId
    );
    // const defaultAvatar = 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';
    if (friend) {
      navigation.setOptions({
        headerTitle: () => (
          // <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          //     <Image source={{ uri: friend.avatar || defaultAvatar }} style={styles.avatar} />
          //     <Text style={styles.headerTitle}>{friend.name}</Text>
          // </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {friend.avatar ? (
              <Image source={{ uri: friend.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.nameInitials}>
                <Text style={styles.initials}>
                  {getFirstAndLastName(friend.name)}
                </Text>
              </View>
            )}
            <Text style={styles.headerTitle}>{friend.name}</Text>
          </View>
        ),
      });
    }
  }, [selectedConversation, user, navigation]);

  useEffect(() => {
    if (selectedConversation && user) {
      const lastChat =
        selectedConversation.chats[selectedConversation.chats.length - 1];
      if (
        lastChat &&
        lastChat.senderId !== user.userId &&
        lastChat.status !== "READ"
      ) {
        socket.emit("read-conversation", {
          conversationId: selectedConversation.conversationId,
          chatId: lastChat.chatId,
          userId: user.userId,
          time: new Date().toISOString(),
        });
        const readData: IReadConversationSocket = {
          conversationId: selectedConversation.conversationId,
          chatId: lastChat.chatId,
          userId: user.userId,
          time: new Date().toISOString(),
        };
        dispatch(readConversation(readData));
      }
    }
  }, [selectedConversation, user, dispatch]); // Chạy khi selectedConversation hoặc user thay đổi

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [chats]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedConversation(null));
    };
  }, []);

  const handleSend = async (text: string, uploadedImageUrls: string[]) => {
    if ((text.trim().length === 0 && uploadedImageUrls.length === 0) || !user) {
      return; // Không gửi nếu không có văn bản hoặc hình ảnh
    }

    const newMessage: IChat = {
      chatId: Math.random().toString(),
      senderId: user.userId,
      message: text,
      medias: uploadedImageUrls.map((url, index) => ({
        key: (index + 1).toString(),
        name: `Image ${index + 1}`,
        url,
        type: "image/jpeg",
      })),
      savedBy: [],
      deletedBy: [],
      status: "RECEIVED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const receiver = selectedConversation?.participants.find(
      (p) => p.userId !== user.userId
    );
    if (!receiver) {
      console.error("Receiver is undefined");
      return;
    }

    const socketData = {
      sender: {
        userId: user.userId,
        name: user.name,
        avatar: user.avatar,
      },
      receiver,
      message: text,
      medias: newMessage.medias,
      createdAt: newMessage.createdAt,
      chatId: newMessage.chatId,
    };

    socket.emit("receive-message", socketData);

    setInputText(""); // Xóa nội dung văn bản sau khi gửi
  };

  const getChatStatusText = (status: ChatStatus) => {
    if (status === "RECEIVED") return "Đã nhận";
    if (status === "READ") return "Đã đọc";
    return "Không xác định";
  };

  const renderMessage = ({ item, index }: { item: IChat; index: number }) => {
    const showTimestamp =
      index === 0 ||
      moment(item.createdAt).diff(
        moment(chats[index - 1]?.createdAt),
        "minutes"
      ) > 5;

    const renderMedia = (media: IMediaType) => {
      if (media.type.startsWith("image/")) {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ImageDetailScreen", { imageUrl: media.url })
            }
          >
            <Image source={{ uri: media.url }} style={styles.mediaImage} />
          </TouchableOpacity>
        );
      } else if (media.type.startsWith("video/")) {
        return <VideoPlayer videoUrl={media.url} />;
      } else {
        return <FileComponent fileName={media.name} fileUri={media.url} />;
      }
    };

    const isLastMessage = index === chats.length - 1;

    return (
      <View>
        {showTimestamp && (
          <Text style={styles.timestamp}>
            {moment(item.createdAt).format("HH:mm")}
          </Text>
        )}
        <View
          style={[
            styles.messageContainer,
            item.senderId === user?.userId
              ? styles.userMessage
              : styles.friendMessage,
          ]}
        >
          {item.message && item.message.length > 0 && (
            <View>
              <Text
                style={[
                  styles.messageText,
                  item.senderId === user?.userId && styles.userMessageText,
                ]}
              >
                {item.message}
              </Text>
            </View>
          )}
          {Array.isArray(item.medias) &&
            item.medias.length > 0 &&
            item.medias.map((media) => (
              <View key={media.key} style={styles.mediaContainer}>
                {renderMedia(media)}
              </View>
            ))}
          {isLastMessage &&
            item.senderId === user?.userId && ( // Chỉ hiển thị trạng thái cho tin nhắn cuối cùng
              <Text style={styles.messageStatus}>
                {getChatStatusText(item.status)}
              </Text>
            )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={chats}
        renderItem={renderMessage}
        keyExtractor={(item) => item.chatId}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
        getItemLayout={(_, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }}
      />
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    backgroundColor: "#E5E5EA",
  },
  userMessage: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  friendMessage: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  textMessage: {
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    alignSelf: "center",
    marginBottom: 5,
    color: "#888",
    fontSize: 12,
  },
  mediaContainer: {
    marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  mediaImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  messageStatus: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userMessageText: {},
  nameInitials: {
    backgroundColor: "#f4f4f5",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  initials: {
    fontSize: 16,
    fontWeight: "500",
    color: "#09090b",
  },
});

export default ChatDetail;
