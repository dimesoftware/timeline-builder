export default class DateRange {
    start: Date;
    end: Date;
    constructor(start: Date, end: Date);
    get startTime(): number;
    get endTime(): number;
    overlaps(start: Date, end: Date): boolean;
    overlapsWith(other: DateRange): boolean;
    expand(other: DateRange): void;
    expandLeft(other: DateRange): void;
    expandRight(other: DateRange): void;
}
