export interface ValueFormat {
}

export class DialSettings {
    name: string = "";
    key: string = "";
    sub?: string;
    dec: number = 1;
    unit?: string;
    default?: number;
    formatValue?: (value: number) => number;
    extractValue?: (value: number) => number;
}