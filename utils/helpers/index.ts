export const range = (
    value: number,
    low1: number,
    high1: number,
    low2: number,
    high2: number
): number => {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

export const randomBetween = (min: number, max: number): number =>
    Math.random() * (max - min + 1) + min;

export const randomIntBetween = (min: number, max: number) =>
    Math.floor(randomBetween(min, max));

export const randomFromArray = (array: any[]) =>
    array[randomIntBetween(0, array.length - 1)];
