const convertToDMS = (lat: number, lng: number) => {
    function toDMS(coordinate: number, isLatitude: boolean): string {
        const degrees = Math.floor(Math.abs(coordinate));
        const minutes = Math.floor((Math.abs(coordinate) - degrees) * 60);
        const seconds = +(
            ((Math.abs(coordinate) - degrees) * 60 - minutes) *
            60
        ).toFixed(1);
        const direction =
            coordinate >= 0 ? (isLatitude ? 'N' : 'E') : isLatitude ? 'S' : 'W';

        return `${degrees}°${String(minutes).padStart(
            2,
            '0',
        )}'${seconds.toFixed(1)}"${direction}`;
    }

    return {
        latitude: toDMS(lat, true),
        longitude: toDMS(lng, false),
    };
};

export default convertToDMS;
