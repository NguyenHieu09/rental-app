export interface ICreateContractRequest {
    ownerId: string;
    renterId: string;
    propertyId: string;
    startDate: string;
    endDate: string;
    contractTerms: string;
    monthlyRent: number;
    depositAmount: number;
}

export interface IContract {
    contractId: string;
    ownerId: string;
    renterId: string;
    propertyId: string;
    startDate: string;
    endDate: string;
    deleted: boolean;
    status: ContractStatus;
    createdAt: string;
    updatedAt: string;
    monthlyRent: number;
    depositAmount: number;
    contractTerms: string;
    transactionHashContract: string;
    property: {
        title: string;
    }
    renter: {
        avatar: string | 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';
        name: string,
        userId: string,
    },
    owner: {
        avatar: string | 'https://res.cloudinary.com/dxvrdtaky/image/upload/v1727451808/avatar_iirzeq.jpg';
        name: string,
        userId: string,
    },
}

export type ContractStatus =
    | 'WAITING'
    | 'DEPOSITED'
    | 'ONGOING'
    | 'ENDED'
    | 'OVERDUE'
    | 'CANCELLED'
    | 'PENDING_CANCELLATION'
    | 'UNILATERAL_CANCELLATION'
    | 'APPROVED_CANCELLATION'
    | 'REJECTED_CANCELLATION';
