export const getFirstAndLastName = (name: string) => {
    const nameParts = name.split(' ');
    const firstLetter = nameParts[0].charAt(0);
    const lastLetter = nameParts[nameParts.length - 1].charAt(0);
    return `${firstLetter}${lastLetter}`;
};