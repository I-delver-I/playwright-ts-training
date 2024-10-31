export function arraysHaveSameElements(arr1: string[], arr2: string[]): boolean {
    return arr1.sort().toString() === arr2.sort().toString();
}