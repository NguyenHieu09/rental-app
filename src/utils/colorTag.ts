import { ContractStatus } from '../types/contract';
import { PropertyStatus } from '../types/property';
import { RentalRequestStatus } from '../types/rentalRequest';
import { TransactionStatus } from '../types/transaction';

export const PROCESSING_COLOR = '#1677ff';
export const SUCCESS_COLOR = '#52c41a';
export const ERROR_COLOR = '#ff4d4f';
export const WARNING_COLOR = '#faad14';
export const DEFAULT_COLOR = 'rgba(0, 0, 0, 0.88)';
export const PURPLE_COLOR = '#531dab';
export const VOLCANO_COLOR = '#d4380d';
export const CYAN_COLOR = '#08979c';
export const GREEN_COLOR = '#389e0d';
export const RED_COLOR = '#cf1322';

export const getRentalRequestColor = (status: RentalRequestStatus) => {
    if (status === 'PENDING') return PROCESSING_COLOR;
    if (status === 'APPROVED') return SUCCESS_COLOR;
    if (status === 'REJECTED') return ERROR_COLOR;
    if (status === 'CANCELLED') return WARNING_COLOR;
    return DEFAULT_COLOR;
};

export const getPropertyStatusColor = (propertyStatus: PropertyStatus) => {
    if (propertyStatus === 'ACTIVE') return SUCCESS_COLOR;
    if (propertyStatus === 'INACTIVE') return WARNING_COLOR;
    if (propertyStatus === 'UNAVAILABLE') return PURPLE_COLOR;
    if (propertyStatus === 'REJECTED') return ERROR_COLOR;
    return PROCESSING_COLOR;
};

export const getContractColor = (status: ContractStatus) => {
    if (status === 'WAITING') return PROCESSING_COLOR;
    if (status === 'DEPOSITED') return WARNING_COLOR;
    if (status === 'ONGOING') return SUCCESS_COLOR;
    if (status === 'ENDED') return DEFAULT_COLOR;
    if (status === 'OVERDUE') return ERROR_COLOR;
    if (status === 'CANCELLED') return VOLCANO_COLOR;
    if (status === 'PENDING_CANCELLATION') return CYAN_COLOR;
    if (status === 'UNILATERAL_CANCELLATION') return PURPLE_COLOR;
    if (status === 'APPROVED_CANCELLATION') return GREEN_COLOR;
    if (status === 'REJECTED_CANCELLATION') return RED_COLOR;
    return DEFAULT_COLOR;
};

export const getTransactionColor = (status: TransactionStatus) => {
    if (status === 'PENDING') return PROCESSING_COLOR;
    if (status === 'COMPLETED') return SUCCESS_COLOR;
    if (status === 'FAILED') return ERROR_COLOR;
    if (status === 'OVERDUE') return ERROR_COLOR;
    return DEFAULT_COLOR;
};

export const getBgColor = (color: string) => {
    switch (color) {
        case PROCESSING_COLOR:
            return '#e6f4ff';
        case SUCCESS_COLOR:
            return '#f6ffed';
        case ERROR_COLOR:
            return '#fff2f0';
        case WARNING_COLOR:
            return '#fffbe6';
        case PURPLE_COLOR:
            return '#f9f0ff';
        case VOLCANO_COLOR:
            return '#fff2e8';
        case CYAN_COLOR:
            return '#e6fffb';
        case GREEN_COLOR:
            return '#f6ffed';
        case RED_COLOR:
            return '#fff1f0';
        default:
            return '#fafafa';
    }
};

export const getBorderColor = (color: string) => {
    switch (color) {
        case PROCESSING_COLOR:
            return '#91caff';
        case SUCCESS_COLOR:
            return '#b7eb8f';
        case ERROR_COLOR:
            return '#ffccc7';
        case WARNING_COLOR:
            return '#ffe58f';
        case PURPLE_COLOR:
            return '#d3adf7';
        case VOLCANO_COLOR:
            return '#ffccc7';
        case CYAN_COLOR:
            return '#87e8de';
        case GREEN_COLOR:
            return '#b7eb8f';
        case RED_COLOR:
            return '#ffa39e';
        default:
            return '#d9d9d9';
    }
};
