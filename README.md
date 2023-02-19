<p align="center">
    <img src="assets/logo.png" height="300">
</p>

<p align="center">
    <h1>Timeline builder</h1>
</p>

A timeline builder that stores an array of the date ranges that have been buffered by your application, as to reduce the amount of data your backend should load.

```javascript
const timeline = new Timeline();
timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
timeline.add(new Date(2023, 0, 2), new Date(2023, 0, 6));

console.log(timeline);

// [
//  DateRange {
//    start: 2022-12-01
//    end: 2023-01-06
//  }
// ]
```
