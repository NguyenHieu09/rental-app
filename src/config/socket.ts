import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux-toolkit/store';
import {
    IConversationSocket,
    IReadConversationSocket,
} from '../types/conversation';
import { INotification } from '../types/notification';
import {
    addConversation,
    readConversation,
} from '../redux-toolkit/slices/conversationSlice';
import {
    connectSocket,
    disconnectSocket,
    socket,
} from '../redux-toolkit/slices/socketSlice';
import { IConversation } from '../types/chat';
import { addChat } from '../redux-toolkit/slices/chatSlice'; // Import addChat từ chatSlice
import { addNotification } from '../redux-toolkit/slices/notificationSlice';

const Socket: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const selectedConversation = useSelector(
        (state: RootState) => state.conversations.selectedConversation,
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Kết nối socket khi người dùng có sẵn
        if (user) {
            dispatch(connectSocket());
            socket.emit('online', user.userId);
        } else {
            dispatch(disconnectSocket());
        }

        return () => {
            dispatch(disconnectSocket());
        };
    }, [user, dispatch]);

    useEffect(() => {
        const handleSendMessage = (data: IConversationSocket) => {
            console.log('🚀 ~ handleSendMessage ~ data:', data);
            // console.log('Message received:', data);
            const participants = [data.sender, data.receiver];
            console.log(data.receiver);

            const receiver = participants.find(
                (p) => p.userId !== user?.userId,
            );
            const isSelected =
                selectedConversation?.conversationId === data.conversationId &&
                data.sender.userId !== user?.userId;

            const conversation: IConversation = {
                conversationId: data.conversationId,
                createdAt: data.createdAt,
                updatedAt: data.createdAt,
                participants,
                receiver: data.receiver,
                chats: [
                    {
                        chatId: data.chatId,
                        createdAt: data.createdAt,
                        deletedBy: [],
                        medias: data.medias,
                        message: data.message,
                        savedBy: [],
                        senderId: data.sender.userId,
                        status: isSelected ? 'READ' : 'RECEIVED',
                        updatedAt: data.createdAt,
                    },
                ],
                deletedBy: [],
                unreadCount:
                    data.sender.userId === user?.userId || isSelected ? 0 : 1,
            };

            // Gọi addConversation để thêm cuộc trò chuyện
            dispatch(addConversation(conversation));

            // Gọi addChat để thêm chat vào state
            dispatch(
                addChat({
                    receiver: receiver?.userId || '',
                    chat: conversation.chats[0],
                }),
            );

            if (isSelected) {
                socket.emit('read-conversation', {
                    conversationId: selectedConversation.conversationId,
                    time: new Date().toISOString(),
                    chatId: data.chatId,
                    userId: receiver?.userId,
                });
            }
        };

        const handleReadConversation = (data: IReadConversationSocket) => {
            dispatch(readConversation(data));
            console.log('Conversation marked as read:', data);
        };

        const handleCreateNotification = (data: INotification) => {
            dispatch(addNotification(data));
            console.log('Notification received:', data);
            // Xử lý thông báo
        };

        // Đăng ký các sự kiện socket
        socket.on('connect', () => console.log('Connected to socket server'));
        socket.on('disconnect', () =>
            console.log('Disconnected from socket server'),
        );
        socket.on('send-message', handleSendMessage);
        socket.on('read-conversation', handleReadConversation);
        socket.on('create-notification', handleCreateNotification);

        return () => {
            // Hủy đăng ký các sự kiện socket
            socket.off('connect');
            socket.off('disconnect');
            socket.off('send-message', handleSendMessage);
            socket.off('read-conversation', handleReadConversation);
            socket.off('create-notification', handleCreateNotification);
        };
    }, [dispatch, selectedConversation, user?.userId]);

    return null;
};

export default Socket;
