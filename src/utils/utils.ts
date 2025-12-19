export function getYear(): string {
    const currentYear = new Date().getFullYear();
    return currentYear.toString();
}