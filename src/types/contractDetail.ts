import { ContractStatus } from './contract';
import { IProperty } from './property';
import { IUser } from './user';

export interface IContractDetail {
    contractId: string;
    ownerId: string;
    renterId: string;
    propertyId: string;
    startDate: string;
    endDate: string;
    deleted: boolean;
    status: ContractStatus;
    createdAt: string;
    endDateActual: string;
    updatedAt: string;
    monthlyRent: number;
    depositAmount: number;
    transactionHashContract: string;
    owner: IUser;
    renter: IUser;
    cancellationRequests: any[];
    property: IProperty;
}
