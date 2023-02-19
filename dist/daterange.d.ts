export default class DateRange {
    start: Date;
    end: Date;
    constructor(start: Date, end: Date);
    get startTime(): number;
    get endTime(): number;
    overlaps(start: Date, end: Date): boolean;
    overlapsWith(other: DateRange): boolean;
    reconcile(other: DateRange): void;
    reconcileEnd(other: DateRange): void;
}
