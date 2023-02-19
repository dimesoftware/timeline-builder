"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var daterange_1 = require("./daterange");
var Timeline = /** @class */ (function () {
    function Timeline() {
        this._timeRanges = new Array();
    }
    Timeline.prototype.add = function (start, end) {
        return this.addRange(new daterange_1.default(start, end));
    };
    Timeline.prototype.addRange = function (range) {
        // Iterate through the existing time ranges to see if the new range overlaps with any of them
        var overlapFound = false;
        for (var _i = 0, _a = this._timeRanges; _i < _a.length; _i++) {
            var timeRange = _a[_i];
            if (timeRange.overlapsWith(range)) {
                timeRange.reconcile(range);
                overlapFound = true;
                break;
            }
        }
        // If no overlap was found, add the new range to the array
        if (!overlapFound) {
            this._timeRanges.push(range);
        }
        // Sort the time ranges by start time
        this._timeRanges.sort(function (a, b) { return a.start.getTime() - b.start.getTime(); });
        // Merge overlapping time ranges
        for (var i = 0; i < this._timeRanges.length - 1; i++) {
            if (this._timeRanges[i].end >= this._timeRanges[i + 1].start) {
                this._timeRanges[i].reconcileEnd(this._timeRanges[i + 1]);
                this._timeRanges.splice(i + 1, 1);
                i--;
            }
        }
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
