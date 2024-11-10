export interface INotification {
    id: string;
    title: string;
    body: string;
    status: NotificationStatus;
    createdAt: string;
    updatedAt: string;
    from?: string;
    to: string;
    toRole: string | null;
    docId: string;
    type: NotificationType;
}

export type NotificationType =
    | 'RENTER_PAYMENT'
    | 'RENTAL_REQUEST'
    | 'RENTER_RENTAL_REQUEST'
    | 'OWNER_CONTRACT'
    | 'CONTRACT_DETAIL'
    | 'OWNER_DETAIL_PROPERTY'


    | 'PROPERTY'
    | 'REVIEW'
    | 'RENTER_CONTRACT'
    | 'OWNER_PROPERTY'
    | 'ADMIN_PROPERTY'
    | 'REPORT';
export type NotificationStatus = 'RECEIVED' | 'READ' | 'DELETED';
