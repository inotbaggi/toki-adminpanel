export function dateCustomFormatting(date: Date): string {
    const padStart = (value: number): string =>
        value.toString().padStart(2, '0');
    return`${padStart(date.getDate())}.${padStart(date.getMonth() + 1)}.${date.getFullYear()}`;
}