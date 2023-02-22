import DateRange from "./daterange";

export default class Timeline {
  private _timeRanges: DateRange[];

  constructor() {
    this._timeRanges = new Array<DateRange>();
  }

  public add(start: Date, end: Date): void {
    return this.addRange(new DateRange(start, end));
  }

  public addRange(range: DateRange): void {
    // Iterate through the existing time ranges to see if the new range overlaps with any of them
    let overlapFound = false;
    for (const timeRange of this._timeRanges) {
      if (timeRange.overlapsWith(range)) {
        timeRange.expand(range);
        overlapFound = true;
        break;
      }
    }

    // If no overlap was found, add the new range to the array
    if (!overlapFound) {
      this._timeRanges.push(range);
    }

    // Sort the time ranges by start time
    this._timeRanges.sort((a, b) => a.start.getTime() - b.start.getTime());

    // Merge overlapping time ranges
    for (let i = 0; i < this._timeRanges.length - 1; i++) {
      if (this._timeRanges[i].end >= this._timeRanges[i + 1].start) {
        this._timeRanges[i].expandRight(this._timeRanges[i + 1]);
        this._timeRanges.splice(i + 1, 1);
        i--;
      }
    }
  }

  public contains(start: Date, end: Date): boolean {
    return this._timeRanges.some(x => x.overlaps(start, end));
  }

  public containsAll(start: Date, end: Date): boolean { 
    return this._timeRanges.some(x => x.start <= start && x.end >= end);
  }

  public toList(): DateRange[] {
    return this._timeRanges;
  }

  public clear(): void {
    this._timeRanges.splice(0, this._timeRanges.length);
  }

  public get count(): number {
    return this._timeRanges.length;
  }
}
