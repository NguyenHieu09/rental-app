export interface IRentalRequest {
    property: {
        propertyId: string;
        title: string;
        images: string[];
        slug: string;
    };
    requestId: string;
    renterId: string;
    ownerId: string;
    status: RentalRequestStatus;
    rentalPrice: number;
    rentalDeposit: number;
    rentalStartDate: string;
    rentalEndDate: string;
    createdAt: string;
    updatedAt: string;
    propertyId: string;

}

export type RentalRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface IGenerateContractRequest {
    renterId: string;
    propertyId: string;
    rentalPrice: number;
    rentalDeposit: number;
    rentalStartDate: string;
    rentalEndDate: string;
}

export interface IGenerateContractResponse {
    contractContent: string;
    ownerId: string;
    renterId: string;
    propertyId: string;
    startDate: string;
    endDate: string;
    monthlyRent: number;
    depositAmount: number;
}

// types.ts
export interface RequestRental {
    contractData: any;
    requestId: string;
}
