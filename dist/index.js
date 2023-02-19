"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var daterange_1 = require("./daterange");
var Timeline = /** @class */ (function () {
    function Timeline() {
        this._timeRanges = new Array();
    }
    Timeline.prototype.add = function (start, end) {
        // Iterate through the existing time ranges to see if the new range overlaps with any of them
        var overlapFound = false;
        for (var _i = 0, _a = this._timeRanges; _i < _a.length; _i++) {
            var timeRange = _a[_i];
            if ((start >= timeRange.start && start <= timeRange.end) ||
                (end >= timeRange.start && end <= timeRange.end) ||
                (start <= timeRange.start && end >= timeRange.end)) {
                // The new range overlaps with this existing range, so update the existing range
                timeRange.start = new Date(Math.min(timeRange.start.getTime(), start.getTime()));
                timeRange.end = new Date(Math.max(timeRange.end.getTime(), end.getTime()));
                overlapFound = true;
                break;
            }
        }
        // If no overlap was found, add the new range to the array
        if (!overlapFound) {
            this._timeRanges.push(new daterange_1.default(start, end));
        }
        // Sort the time ranges by start time
        this._timeRanges.sort(function (a, b) { return a.start.getTime() - b.start.getTime(); });
        // Merge overlapping time ranges
        for (var i = 0; i < this._timeRanges.length - 1; i++) {
            if (this._timeRanges[i].end >= this._timeRanges[i + 1].start) {
                this._timeRanges[i].end = new Date(Math.max(this._timeRanges[i].end.getTime(), this._timeRanges[i + 1].end.getTime()));
                this._timeRanges.splice(i + 1, 1);
                i--;
            }
        }
    };
    Timeline.prototype.addRange = function (range) {
        return this.add(range.start, range.end);
    };
    Timeline.prototype.toList = function () {
        return this._timeRanges;
    };
    Object.defineProperty(Timeline.prototype, "count", {
        get: function () {
            return this._timeRanges.length;
        },
        enumerable: false,
        configurable: true
    });
    return Timeline;
}());
exports.default = Timeline;
