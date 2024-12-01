import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
    ICancelContractRequest,
    ICancelContractResponse,
} from '../types/cancelContract';
import { IContract, ICreateContractRequest } from '../types/contract';
import { IContractDetail } from '../types/contractDetail';
import { IGenerateContractRequest } from '../types/rentalRequest';
import { IDepositTransaction, ITransaction } from '../types/transaction';
import {
    ICreateExtensionRequest,
    IExtensionRequest,
    IUpdateExtensionRequestStatus,
} from '../types/extensionRequest';
import { IReport, IReportDetail, IReportFilterByOwner } from '../types/report';

const API_CONTRACT_URL = `${API_URL}/contract-service`;

// Function to fetch contracts from the API
// export const createContract = async (contractRequest: ICreateContractRequest): Promise<IContract> => {
//     try {
//         const token = await AsyncStorage.getItem('accessToken');

//         if (!token) {
//             throw new Error('No token provided');
//         }

//         const response = await axios.post<IContract>(`${API_CONTRACT_URL}/contracts`, contractRequest, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data;
//     } catch (error: any) {
//         if (error.response && error.response.data && error.response.data.message) {
//             console.error('Error message:', error.response.data.message);
//             throw new Error(error.response.data.message);
//         } else {
//             console.error('Error creating contract:', error);
//             throw error;
//         }
//     }
// };

export const createContractAndApproveRequest = async (
    params: ICreateContractRequest & { requestId: string },
): Promise<IContract> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post<IContract>(
            `${API_CONTRACT_URL}/contracts`,
            params,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error creating contract:', error);
            throw error;
        }
    }
};

export const fetchTransactions = async (
    type: string,
    take: number,
    skip: number,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(`${API_CONTRACT_URL}/transactions`, {
            params: {
                // userId,
                type,
                take,
                skip,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const transactions = response.data.data;
        const total = response.data.pageInfo.total;

        return { transactions, total };
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }
};

export const fetchContractsForOwner = async (take: number, skip: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/contracts/owner`,
            {
                params: { take, skip },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const contracts = response.data.data;
        const total = response.data.pageInfo.total;

        return { contracts, total };
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching rental contracts:', error);
            throw error;
        }
    }
};

export const fetchRentalContractsForRenter = async (
    take: number,
    skip: number,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/contracts/renter`,
            {
                params: { take, skip },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const contracts = response.data.data;
        const total = response.data.pageInfo.total;

        return { contracts, total };
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching rental contracts:', error);
            throw error;
        }
    }
};

export const fetchAllTransactionsForRenter = async (): Promise<
    ITransaction[]
> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/transactions/renter`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching transactions for renter:', error);
            throw error;
        }
    }
};

export const fetchContractDetails = async (
    contractId: string,
): Promise<IContractDetail> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get<IContractDetail>(
            `${API_CONTRACT_URL}/contracts/${contractId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching contract details:', error);
            throw error;
        }
    }
};

export const fetchWalletBalance = async (): Promise<number> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/contracts/wallet-balance`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching wallet balance:', error);
            throw error;
        }
    }
};

export const payMonthlyRent = async (
    rentTransaction: IDepositTransaction,
): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        await axios.post(`${API_CONTRACT_URL}/contracts/pay`, rentTransaction, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error making payment:', error);
            throw error;
        }
    }
};

export const deposit = async (
    depositTransaction: IDepositTransaction,
): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        await axios.post(
            `${API_CONTRACT_URL}/contracts/deposit`,
            depositTransaction,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error making payment:', error);
            throw error;
        }
    }
};

export const fetchRentalRequestsForOwner = async (
    take: number,
    skip: number,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await axios.get(
            `${API_CONTRACT_URL}/rental-requests/owner`,
            {
                params: {
                    take,
                    skip,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        // console.log('Rental requests response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching rental requests:', error);
        throw error;
    }
};

export const sendRentalRequest = async (rentalRequestData: {
    ownerId: string;
    // property: { propertyId: string };
    propertyId: string;
    rentalDeposit: number;
    rentalEndDate: string;
    rentalPrice: number;
    rentalStartDate: string;
    // renterId: string;
}) => {
    try {
        // Lấy token xác thực từ AsyncStorage
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        console.log('Sending rental request with data:', rentalRequestData);

        const response = await axios.post(
            `${API_CONTRACT_URL}/rental-requests`,
            rentalRequestData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        console.log('Rental request response:', response.data);
        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            // Handle other errors
            console.error('Error sending rental request:', error);
            throw error;
        }
    }
};

export const updateRentalRequestStatus = async (
    requestId: string,
    status: string,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.patch(
            `${API_CONTRACT_URL}/rental-requests/owner/status`,
            { requestId, status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating rental request status:', error);
            throw error;
        }
    }
};

export const updateRentalRequestStatusRenter = async (
    requestId: string,
    status: string,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.patch(
            `${API_CONTRACT_URL}/rental-requests/renter/status`,
            { requestId, status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating rental request status:', error);
            throw error;
        }
    }
};

export const generateContract = async (
    contractRequest: IGenerateContractRequest,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/contracts/generate`,
            contractRequest,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error generating rental contract:', error);
            throw error;
        }
    }
};

export const fetchRentalRequestsBySlug = async (slug: string) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/rental-requests/owner/${slug}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching rental requests by slug:', error);
            throw error;
        }
    }
};

export const fetchRentalRequestsForRenter = async (
    take: number,
    skip: number,
) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await axios.get(
            `${API_CONTRACT_URL}/rental-requests/renter`,
            {
                params: {
                    take,
                    skip,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching rental requests for renter:', error);
        throw error;
    }
};

export const cancelContractBeforeDeposit = async (
    contractId: string,
): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/contracts/cancel-before-deposit`,
            { contractId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            console.log('Cancel contract before deposit successful');
        } else {
            throw new Error('Failed to cancel contract before deposit');
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error canceling contract before deposit:', error);
            throw error;
        }
    }
};

export const createCancelContractRequest = async (
    cancelRequest: ICancelContractRequest,
): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/contract-cancellation-requests`,
            cancelRequest,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 201) {
            console.log('Cancel contract request successful:');
        } else {
            throw new Error('Failed to create cancel contract request');
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error creating cancel contract request:', error);
            throw error;
        }
    }
};

export const fetchNotHandledCancelContractRequest = async (
    contractId: string,
): Promise<ICancelContractResponse> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/contract-cancellation-requests/not-handled/${contractId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching cancel contract request:', error);
            throw error;
        }
    }
};

export const fetchHandledCancelContractRequest = async (
    contractId: string,
): Promise<ICancelContractResponse> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/contract-cancellation-requests/handled/${contractId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        // console.log(response.data);

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error(
                'Error fetching handled cancel contract request:',
                error,
            );
            throw error;
        }
    }
};

export const updateCancelContractRequestStatus = async (
    requestId: number,
    status: string,
): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.patch(
            `${API_CONTRACT_URL}/contract-cancellation-requests/${requestId}`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            console.log('Cancel contract request status updated successfully');
        } else {
            throw new Error('Failed to update cancel contract request status');
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error(
                'Error updating cancel contract request status:',
                error,
            );
            throw error;
        }
    }
};

export const fetchContractOverview = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/dashboard/owner/overview`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching contract overview:', error);
            throw error;
        }
    }
};

export const fetchIncomeExpenditure = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/dashboard/owner/income-expenditure`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching income and expenditure:', error);
            throw error;
        }
    }
};

export const fetchContractCancellationRate = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/dashboard/owner/contract-cancellation-rate`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching contract cancellation rate:', error);
            throw error;
        }
    }
};

export const fetchRentalRequestRating = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get(
            `${API_CONTRACT_URL}/dashboard/owner/rental-request-rating`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching rental request rating:', error);
            throw error;
        }
    }
};

export const createExtensionRequest = async (
    extensionRequest: ICreateExtensionRequest,
): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/contract-extension-requests`,
            extensionRequest,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 201) {
            console.log('Extension request created successfully');
        } else {
            throw new Error('Failed to create extension request');
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error creating extension request:', error);
            throw error;
        }
    }
};

export const fetchExtensionRequests = async (
    contractId: string,
): Promise<IExtensionRequest[]> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get<IExtensionRequest[]>(
            `${API_CONTRACT_URL}/contract-extension-requests/contracts/${contractId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching extension requests:', error);
            throw error;
        }
    }
};

export const updateExtensionRequestStatus = async (
    updateRequest: IUpdateExtensionRequestStatus,
): Promise<void> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const { id, status, contractId } = updateRequest;

        const response = await axios.patch(
            `${API_CONTRACT_URL}/contract-extension-requests`,
            { id, status, contractId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            console.log('Extension request status updated successfully');
        } else {
            throw new Error('Failed to update extension request status');
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error updating extension request status:', error);
            throw error;
        }
    }
};

export const fetchReportsByOwner = async (
    filter: IReportFilterByOwner,
): Promise<IReport[]> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get<IReport[]>(
            `${API_CONTRACT_URL}/reports/owner`,
            {
                params: filter,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching reports by owner:', error);
            throw error;
        }
    }
};


export const fetchReportsByRenter = async (): Promise<IReport[]> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get<IReport[]>(
            `${API_CONTRACT_URL}/reports/renter`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching reports by renter:', error);
            throw error;
        }
    }
};

export const fetchReportDetails = async (reportId: number): Promise<IReportDetail> => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.get<IReportDetail>(
            `${API_CONTRACT_URL}/reports/${reportId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error fetching report details:', error);
            throw error;
        }
    }
};

export const createReportByRenter = async (formData: FormData) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/reports/renter`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            },
        );


        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to create property' };
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            console.error('Error message:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error creating property:', error);
            throw (error as any).response;
        }
    }
};

export const ownerProposeReport = async (formData: FormData) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/reports/owner/propose`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            },
        );


        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to create property' };
        }
    } catch (error: any) {
        if (error.response) {
            const { data, status } = error.response;
            console.error('Error response data:', data);
            console.error('HTTP status:', status);
            if (data.details) {
                console.error('Error details:', data.details);
            }
            throw new Error(
                data.message || ''
            );
        } else {
            console.error('Error creating property:', error.message);
            throw new Error('Network error or unknown issue occurred.');
        }

    }
};

export const acceptProposal = async (reportId: number, reportChildId: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/reports/owner/accept`,
            { reportId, reportChildId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to accept proposal' };
        }
    } catch (error: any) {
        if (error.response) {
            const { data, status } = error.response;
            console.error('Error response data:', data);
            console.error('HTTP status:', status);
            if (data.details) {
                console.error('Error details:', data.details);
            }
            throw new Error(data.message || '');
        } else {
            console.error('Error accepting proposal:', error.message);
            throw new Error('Network error or unknown issue occurred.');
        }
    }
};


export const acceptProposalByRenter = async (reportChildId: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/reports/renter/accept`,
            { reportChildId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to accept proposal' };
        }
    } catch (error: any) {
        if (error.response) {
            const { data, status } = error.response;
            console.error('Error response data:', data);
            console.error('HTTP status:', status);
            if (data.details) {
                console.error('Error details:', data.details);
            }
            throw new Error(data.message || '');
        } else {
            console.error('Error accepting proposal:', error.message);
            throw new Error('Network error or unknown issue occurred.');
        }
    }
};

export const rejectProposalByRenter = async (reportChildId: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/reports/renter/reject`,
            { reportChildId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to accept proposal' };
        }
    } catch (error: any) {
        if (error.response) {
            const { data, status } = error.response;
            console.error('Error response data:', data);
            console.error('HTTP status:', status);
            if (data.details) {
                console.error('Error details:', data.details);
            }
            throw new Error(data.message || '');
        } else {
            console.error('Error accepting proposal:', error.message);
            throw new Error('Network error or unknown issue occurred.');
        }
    }
};


export const cancelReport = async (reportId: number) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token provided');
        }

        const response = await axios.post(
            `${API_CONTRACT_URL}/reports/${reportId}/cancel`, {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Failed to cancel report' };
        }
    } catch (error: any) {
        if (error.response) {
            const { data, status } = error.response;
            console.error('Error response data:', data);
            console.error('HTTP status:', status);
            if (data.details) {
                console.error('Error details:', data.details);
            }
            throw new Error(data.message || '');
        } else {
            console.error('Error canceling report:', error.message);
            throw new Error('Network error or unknown issue occurred.');
        }
    }
};