import { ContractCancelRequestStatus } from '../types/cancelContract';
import { ContractStatus } from '../types/contract';
import { ContractExtensionRequestStatus } from '../types/extensionRequest';
import { PropertyStatus } from '../types/property';
import { RentalRequestStatus } from '../types/rentalRequest';
import { ReportPriority, ReportStatus, ReportType } from '../types/report';
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

export const getCancelRequestColor = (status: ContractCancelRequestStatus) => {
    if (status === 'PENDING') return PROCESSING_COLOR;
    if (status === 'APPROVED') return SUCCESS_COLOR;
    if (status === 'REJECTED') return ERROR_COLOR;
    if (status === 'CONTINUE') return WARNING_COLOR;
    if (status === 'UNILATERAL_CANCELLATION') return PURPLE_COLOR;
    return DEFAULT_COLOR;
};

export const getExtensionRequestStatusColor = (
    status: ContractExtensionRequestStatus,
) => {
    if (status === 'PENDING') return PROCESSING_COLOR;
    if (status === 'APPROVED') return SUCCESS_COLOR;
    if (status === 'REJECTED') return ERROR_COLOR;
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

export const getReportStatusColor = (status: ReportStatus) => {
    if (status === 'pending_owner') return PROCESSING_COLOR;
    if (status === 'pending_renter') return PROCESSING_COLOR;
    if (status === 'owner_proposed') return PROCESSING_COLOR;
    if (status === 'owner_accepted') return SUCCESS_COLOR;
    if (status === 'renter_accepted') return SUCCESS_COLOR;
    if (status === 'renter_rejected') return ERROR_COLOR;
    if (status === 'admin_processing') return PROCESSING_COLOR;
    if (status === 'admin_resolved') return SUCCESS_COLOR;
    if (status === 'in_progress') return PROCESSING_COLOR;
    if (status === 'owner_completed') return SUCCESS_COLOR;
    if (status === 'renter_completed') return SUCCESS_COLOR;
    if (status === 'owner_not_resolved') return ERROR_COLOR;
    if (status === 'cancelled') return DEFAULT_COLOR;
    return DEFAULT_COLOR;
};

export const getReportTypeColor = (type: ReportType) => {
    if (type === 'incident') return ERROR_COLOR;
    if (type === 'violation') return WARNING_COLOR;
    return DEFAULT_COLOR;
};

export const getReportPriorityColor = (priority: ReportPriority) => {
    if (priority === 'low') return SUCCESS_COLOR;
    if (priority === 'medium') return WARNING_COLOR;
    if (priority === 'high') return ERROR_COLOR;
    return DEFAULT_COLOR;
};

export const getReportStatusText = (status: ReportStatus) => {
    if (status === 'pending_owner') return 'Chờ xác nhận chủ nhà';
    if (status === 'pending_renter') return 'Chờ xác nhận người thuê';
    if (status === 'owner_proposed') return 'Chủ nhà đề xuất';
    if (status === 'owner_accepted') return 'Chủ nhà chấp nhận';
    if (status === 'renter_accepted') return 'Người thuê chấp nhận';
    if (status === 'renter_rejected') return 'Người thuê từ chối';
    if (status === 'admin_processing') return 'Admin xử lý';
    if (status === 'admin_resolved') return 'Admin đã giải quyết';
    if (status === 'in_progress') return 'Đang xử lý';
    if (status === 'owner_completed') return 'Chủ nhà đã hoàn thành';
    if (status === 'renter_completed') return 'Người thuê đã hoàn thành';
    if (status === 'owner_not_resolved') return 'Chủ nhà chưa giải quyết';
    if (status === 'cancelled') return 'Đã hủy';
    return 'Không xác định';
};

export const getReportTypeText = (type: ReportType) => {
    if (type === 'incident') return 'Sự cố';
    if (type === 'violation') return 'Vi phạm';
    return 'Không xác định';
};

export const getReportPriorityText = (priority: ReportPriority) => {
    if (priority === 'low') return 'Thấp';
    if (priority === 'medium') return 'Trung bình';
    if (priority === 'high') return 'Cao';
    return 'Không xác định';
};
