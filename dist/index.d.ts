import DateRange from "./daterange";
export default class Timeline {
    private _timeRanges;
    constructor();
    add(start: Date, end: Date): void;
    addRange(range: DateRange): void;
    contains(start: Date, end: Date): boolean;
    containsAll(start: Date, end: Date): boolean;
    toList(): DateRange[];
    clear(): void;
    get count(): number;
}
