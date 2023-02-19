import DateRange from "./daterange";
export default class Timeline {
    private _timeRanges;
    constructor();
    add(start: Date, end: Date): any;
    addRange(range: DateRange): any;
    toList(): DateRange[];
    get count(): number;
}
