import { IUser } from "./user";

export type PropertyStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'UNAVAILABLE' | 'REJECTED';
export type ApprovalStatus = Extract<PropertyStatus, 'ACTIVE' | 'REJECTED'>;
export type VisibleStatus = Extract<PropertyStatus, 'ACTIVE' | 'INACTIVE'>;

export interface ICondition {
    type: string;
    value: string;
}

export interface IAttribute {
    id: string;
    name: string;
}

export interface IProperty {
    propertyId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deposit: number;
    minDuration: number;
    deleted: boolean;
    slug: string;
    status: PropertyStatus;
    address: {
        street: string;
        city: string;
        district: string;
        ward: string;
    };
    attributes: Array<IAttribute>;
    images: Array<string>;
    rentalConditions: Array<ICondition>;
    price: number;
    agreementPrice: boolean;
    latitude: number | null;
    longitude: number | null;
    rating: number;
    ratingCount: number;
    isFavorite: boolean;
    owner: Pick<IUser, 'userId' | 'name' | 'phoneNumber' | 'avatar' | 'email'>;
    type: {
        id: string;
        name: string;
    }

}

export type IFilterProperty = {
    title?: IProperty['title'];
    deposit_from?: IProperty['deposit'];
    deposit_to?: IProperty['deposit'];
    price_from?: IProperty['price'];
    price_to?: IProperty['price'];
    status?: IProperty['status'];
    city?: IProperty['address']['city'];
    district?: IProperty['address']['district'];
    ward?: IProperty['address']['ward'];
};