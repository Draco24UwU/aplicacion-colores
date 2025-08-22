export interface StatusData<
    T extends string = string,
    R extends string = string,
> {
    label: string;
    slug: T;
    field: R;
    severity:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warn'
        | 'danger'
        | 'contrast';
}

export interface StateData {
    model: string;
    buffer: Record<string, StatusData>;
}