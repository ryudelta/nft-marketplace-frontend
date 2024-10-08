export const DateToIntTime = (value: string): number => {
    return Math.floor(new Date(value).getTime())
}

export const IntTimeToDate = (value: number): Date => {
    return new Date(value)
}