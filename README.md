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

// [
//  DateRange {
//    start: 2023-01-01
//    end: 2023-01-06
//  }
// ]
```

Check out this [code sample](https://stackblitz.com/edit/js-yilpbp?file=index.js) to see it in action.

## Install

Add the `timeline-builder` package on npm:

```
npm install timeline-builder
```

or with yarn

```
yarn add timeline-builder
```

## License

MIT
