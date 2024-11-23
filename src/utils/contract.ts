import { ICreateContractRequest } from "../types/contract";

export const getStatusInVietnamese = (status: string): string => {
    switch (status) {
        case 'WAITING':
            return 'Đang chờ';
        case 'DEPOSITED':
            return 'Đã đặt cọc';
        case 'ONGOING':
            return 'Đang diễn ra';
        case 'ENDED':
            return 'Đã kết thúc';
        case 'OVERDUE':
            return 'Quá hạn';
        case 'CANCELLED':
            return 'Đã hủy';
        case 'PENDING_CANCELLATION':
            return 'Đang chờ hủy';
        case 'UNILATERAL_CANCELLATION':
            return 'Hủy đơn phương';
        case 'APPROVED_CANCELLATION':
            return 'Đã duyệt hủy';
        case 'REJECTED_CANCELLATION':
            return 'Từ chối hủy';
        default:
            return status;
    }
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
