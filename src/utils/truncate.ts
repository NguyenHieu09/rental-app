export const truncate = (input: string, maxLength: number) => {
    return input.length > maxLength ? input.substring(0, maxLength) + '...' : input;
};