import DateRange from "./daterange";

export default class Timeline {
  private _timeRanges: DateRange[];

  constructor() {
    this._timeRanges = new Array<DateRange>();
  }
  
  public add(start: Date, end: Date): any {
    // Iterate through the existing time ranges to see if the new range overlaps with any of them
    let overlapFound = false;
    for (const timeRange of this._timeRanges) {
      if (
        (start >= timeRange.start && start <= timeRange.end) ||
        (end >= timeRange.start && end <= timeRange.end) ||
        (start <= timeRange.start && end >= timeRange.end)
      ) {
        // The new range overlaps with this existing range, so update the existing range
        timeRange.start = new Date(Math.min(timeRange.start.getTime(), start.getTime()));
        timeRange.end = new Date(Math.max(timeRange.end.getTime(), end.getTime()));
        overlapFound = true;
        break;
      }
    }

    // If no overlap was found, add the new range to the array
    if (!overlapFound) {
      this._timeRanges.push(new DateRange(start, end));
    }

    // Sort the time ranges by start time
    this._timeRanges.sort((a, b) => a.start.getTime() - b.start.getTime());

    // Merge overlapping time ranges
    for (let i = 0; i < this._timeRanges.length - 1; i++) {
      if (this._timeRanges[i].end >= this._timeRanges[i + 1].start) {
        this._timeRanges[i].end = new Date(Math.max(
          this._timeRanges[i].end.getTime(),
          this._timeRanges[i + 1].end.getTime(),
        ));

        this._timeRanges.splice(i + 1, 1);
        i--;
      }
    }
  }

  public addRange(range: DateRange) {
    return this.add(range.start, range.end);
  }
  
  public toList(): DateRange[] {
    return this._timeRanges;
  }

  public get count(): number {
    return this._timeRanges.length;
  }
}
