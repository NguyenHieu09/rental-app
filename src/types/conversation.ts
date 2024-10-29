import { IBaseUserEmbed, IMediaType } from "./chat";

export interface IConversationSocket {
    chatId: string;
    conversationId: string;
    createdAt: string;
    medias: Array<IMediaType>;
    message: string;
    receiver: IBaseUserEmbed;
    sender: IBaseUserEmbed;
}

export interface IReadConversationSocket {
    conversationId: string;
    time: string;
    chatId: string;
    userId: string;
}

