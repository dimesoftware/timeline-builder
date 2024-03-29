export default class DateRange {
  constructor(public start: Date, public end: Date) { }

  get startTime() {
    return this.start.getTime();
  }

  get endTime() {
    return this.end.getTime();
  }

  overlaps(start: Date, end: Date) {
    return this.overlapsWith(new DateRange(start, end));
  }

  overlapsWith(other: DateRange) {
    return (other.start >= this.start && other.start <= this.end)
      || (other.end >= this.start && other.end <= this.end)
      || (other.start <= this.start && other.end >= this.end);
  }

  expand(other: DateRange) {
    this.expandLeft(other);
    this.expandRight(other);
  }

  expandLeft(other: DateRange) {
    this.start = new Date(Math.min(this.startTime, other.startTime));
  }

  expandRight(other: DateRange) {
    this.end = new Date(Math.max(this.endTime, other.endTime));
  }
}
