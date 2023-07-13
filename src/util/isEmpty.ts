export const isEmpty = (value: any) => {
    return value === undefined || String(value).trim() === "" || value === null;
}