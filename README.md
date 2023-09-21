<p align="center">
    <img src="https://github.com/dimesoftware/timelinebuilderjs/raw/master/assets/logo.png" height="300">
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/timeline-builder"> 
        <img src="https://img.shields.io/npm/v/timeline-builder?style=flat-square" />
    </a>
    <img src="https://img.shields.io/npm/l/timeline-builder?style=flat-square" />
    <img src="https://img.shields.io/badge/PRs-welcome-green.svg?style=flat-square" />
    <img src="https://github.com/dimesoftware/timeline-builder/actions/workflows/ci.yml/badge.svg?branch=master" />
</p>

<h1 align="center">Timeline builder</h1>

A timeline builder that stores an array of the date ranges that have been buffered by your application, as to reduce the amount of data your backend should load.

```javascript
const timeline = new Timeline();
timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
timeline.add(new Date(2023, 0, 2), new Date(2023, 0, 6));

console.log(timeline);

// Output:
// [
//  DateRange {
//    start: 2023-01-01
//    end: 2023-01-06
//  }
// ]
```

Check out this [code sample](https://stackblitz.com/edit/js-yilpbp?file=index.js) to see it in action.

## Install

<a href="https://www.npmjs.com/package/timeline-builder"> 
  <img src="https://img.shields.io/npm/v/timeline-builder?style=flat-square" />
</a>

<br />

Add the `timeline-builder` package with npm:

```
npm install timeline-builder
```

or with yarn

```
yarn add timeline-builder
```

This library is written in TypeScript and has no dependencies.

## Usage

### Building the timeline

Instantiate the builder, that will keep the collection in memory:

```javascript
const timeline = new Timeline();
```

There are two ways to fill up the timeline.

- Using plain date objects:
  
  ```javascript
  timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
  timeline.add(new Date(2023, 0, 2), new Date(2023, 0, 6));
  ```

- Using a `DateRange` object, which is essentially a composition of a start date and end date object:

  ```javascript
  timeline.addRange(new DateRange(new Date(2023, 0, 2), new Date(2023, 0, 6)));
  ```

  The `DateRange` class is used internally to compare overlapping ranges and merge them into one reconciled range.
  
### Timeline actions

The following methods can be executed on the timeline:

- `contains(start,end)`: checks if the range overlaps with the timeline
- `containsAll(start, end)`: checks if the range is entirely within the timeline
- `toList`: creates a reconciled flat list of the timeline
- `clear`: clears the timeline
- `count`: a distinct count of the unique date ranges in the timeline

## Tests

Unit tests are located in the `test` directory. Jest is used as the library. 
Run the tests by running `yarn test`.

## License

MIT
