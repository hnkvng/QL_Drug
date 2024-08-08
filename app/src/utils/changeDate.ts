export const getDateString = (date : Date) => {
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
};