"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateRange = /** @class */ (function () {
    function DateRange(start, end) {
        this.start = start;
        this.end = end;
    }
    Object.defineProperty(DateRange.prototype, "startTime", {
        get: function () {
            return this.start.getTime();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateRange.prototype, "endTime", {
        get: function () {
            return this.end.getTime();
        },
        enumerable: false,
        configurable: true
    });
    DateRange.prototype.overlaps = function (start, end) {
        return this.overlapsWith(new DateRange(start, end));
    };
    DateRange.prototype.overlapsWith = function (other) {
        return (other.start >= this.start && other.start <= this.end)
            || (other.end >= this.start && other.end <= this.end)
            || (other.start <= this.start && other.end >= this.end);
    };
    DateRange.prototype.reconcile = function (other) {
        this.start = new Date(Math.min(this.startTime, other.startTime));
        this.reconcileEnd(other);
    };
    DateRange.prototype.reconcileEnd = function (other) {
        this.end = new Date(Math.max(this.endTime, other.endTime));
    };
    return DateRange;
}());
exports.default = DateRange;
