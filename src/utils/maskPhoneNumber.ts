
export const maskPhoneNumber = (phoneNumber: string | null): string => {
    if (!phoneNumber) {
        return 'N/A';
    }
    if (phoneNumber.length < 4) {
        return phoneNumber;
    }
    return phoneNumber.slice(0, -4) + '****';
};