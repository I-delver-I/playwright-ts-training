export function sanitizeProductPrice(priceText: string): number {
    let sanitizedText = priceText.replace(/[^0-9.]+/g, "");
    sanitizedText = sanitizedText.replace(/\.(?=.*\.)/g, "");
    return Number(sanitizedText);
}