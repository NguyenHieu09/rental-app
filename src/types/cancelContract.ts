export type ContractCancelRequestStatus =
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'CANCELLED'
    | 'CONTINUE'
    | 'UNILATERAL_CANCELLATION';

export interface ICancelContractRequest {
    contractId: string;
    cancelDate: string;
    reason: string;
    signature: string;
}

export interface IUserRequest {
    avatar: string | null;
    name: string;
    email: string;
    userId: string;
}

export interface ICancelContractResponse {
    id: number;
    contractId: string;
    requestedBy: string;
    requestedAt: string;
    cancelDate: string;
    reason: string;
    deleted: boolean;
    updatedAt: string;
    status: ContractCancelRequestStatus;
    userRequest: IUserRequest;
}
