export const formatDateTime = (date: string, toGMT7?: boolean) => {
    // const parsedDate = new Date(date); // Chuyển chuỗi thành đối tượng Date
    const parsedDate = new Date(date);
    if (toGMT7) parsedDate.setHours(parsedDate.getHours() + 7);

    // Tạo các thành phần ngày tháng năm và giờ phút giây
    const day = parsedDate.getUTCDate().toString().padStart(2, '0');
    const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getUTCFullYear();

    const hours = parsedDate.getUTCHours().toString().padStart(2, '0');
    const minutes = parsedDate.getUTCMinutes().toString().padStart(2, '0');
    const seconds = parsedDate.getUTCSeconds().toString().padStart(2, '0');

    // Trả về định dạng mong muốn: '00:55:01 25/10/2024'
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

export const formatDate = (date: string, toGMT7?: boolean) => {
    const parsedDate = new Date(date);
    if (toGMT7) parsedDate.setHours(parsedDate.getHours() + 7);

    const day = parsedDate.getUTCDate().toString().padStart(2, '0');
    const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
};
