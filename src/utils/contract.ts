import { ICreateContractRequest } from '../types/contract';

export const getStatusInVietnamese = (status: string): string => {
    if (status === 'WAITING') return 'Chờ xác nhận';
    if (status === 'DEPOSITED') return 'Đã đặt cọc';
    if (status === 'ONGOING') return 'Đang thuê';
    if (status === 'ENDED') return 'Đã kết thúc';
    if (status === 'OVERDUE') return 'Quá hạn';
    if (status === 'CANCELLED') return 'Đã hủy';
    if (status === 'PENDING_CANCELLATION') return 'Chờ xác nhận huỷ';
    if (status === 'UNILATERAL_CANCELLATION') return 'Huỷ một phía';
    if (status === 'APPROVED_CANCELLATION') return 'Chấp nhận huỷ';
    if (status === 'REJECTED_CANCELLATION') return 'Từ chối huỷ';
    return 'Không xác định';
};

export const getCancellationStatusInVietnamese = (status: string): string => {
    switch (status) {
        case 'PENDING':
            return 'Đang chờ';
        case 'APPROVED':
            return 'Đã chấp nhận hủy';
        case 'REJECTED':
            return 'Từ chối hủy';
        case 'CANCELLED':
            return 'Đã hủy';
        case 'CONTINUE':
            return 'Tiếp tục thuê';
        case 'UNILATERAL_CANCELLATION':
            return 'Hủy đơn phương';
        default:
            return status;
    }
};

export const getOwnerCreateContractMessage = (data: ICreateContractRequest) => {
    return `Tạo hợp đồng thuê nhà với ${data.renterId} tại ${data.propertyId} từ ${data.startDate} đến ${data.endDate} với giá ${data.monthlyRent} và cọc ${data.depositAmount}`;
};
