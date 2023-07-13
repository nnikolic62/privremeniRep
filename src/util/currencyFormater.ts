const CURRENCY_FOMATER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: 'currency'
});

export function formatNumber (number: number) {
    return CURRENCY_FOMATER.format(number);
}