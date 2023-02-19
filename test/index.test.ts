import Timeline from '../src';
import DateRange from '../src/daterange';

//           Jan    Feb      Mar     Apr     May     Jun     Jul     Aug     Sep     Oct     Nov    Dec
//      ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
// T1         *       *
// T2         *       *               x       x      
// T3         *       *               x       x       +       +                
// T4         *       x        *      x
// T5         x       *        x      *
// T6         x                x      *       *
// T7         x                *      *       x            
// T8         *                x      x       *            

enum Month {
    January = 1,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
};

const createDate = (month: Month) => new Date(2023, month, 1);
const assertCount = (timeline: Timeline, expectedCount: number): void => expect(timeline.count).toBe(expectedCount);
const assertRange = (range: DateRange, start: Date, end: Date): void => {
    expect(range.start).toStrictEqual(start);
    expect(range.end).toStrictEqual(end);
}

test('[T1] Add a range to an empty timeline', () => {
    const timeline = new Timeline();
    timeline.add(new Date(2023, 0, 1), new Date(2023, 1, 1));

    expect(timeline.count).toBe(1);
});

test('[T2] Add two non-overlapping ranges', () => {
    const timeline = new Timeline();
    timeline.add(createDate(Month.January), createDate(Month.February));
    timeline.add(createDate(Month.April), createDate(Month.May));

    assertCount(timeline, 2);

    assertRange(timeline.toList()[0], createDate(Month.January), createDate(Month.February));
    assertRange(timeline.toList()[1], createDate(Month.April), createDate(Month.May));
});

test('[T3] Add two non-overlapping ranges', () => {
    const timeline = new Timeline();
    timeline.add(createDate(Month.January), createDate(Month.February));
    timeline.add(createDate(Month.April), createDate(Month.May));
    timeline.add(createDate(Month.June), createDate(Month.July));

    assertCount(timeline, 3);
    assertRange(timeline.toList()[0], createDate(Month.January), createDate(Month.February));
    assertRange(timeline.toList()[1], createDate(Month.April), createDate(Month.May));
    assertRange(timeline.toList()[2], createDate(Month.June), createDate(Month.July));
});

test('[T4] Add overlapping range at the upper tail', () => {
    const timeline = new Timeline();
    timeline.add(createDate(Month.February), createDate(Month.April));
    timeline.add(createDate(Month.January), createDate(Month.March));

    assertCount(timeline, 1);
    assertRange(timeline.toList()[0], createDate(Month.January), createDate(Month.April));
});

test('[T5] Add overlapping range at the lower tail', () => {
    const timeline = new Timeline();
    timeline.add(createDate(Month.January), createDate(Month.March));
    timeline.add(createDate(Month.February), createDate(Month.April));

    assertCount(timeline, 1);
    assertRange(timeline.toList()[0], createDate(Month.January), createDate(Month.April));
});

test('[T6] Add non-overlapping range at the lower tail', () => {
    const timeline = new Timeline();
    timeline.add(createDate(Month.April), createDate(Month.May));
    timeline.add(createDate(Month.January), createDate(Month.March));

    assertCount(timeline, 2);
    assertRange(timeline.toList()[0], createDate(Month.January), createDate(Month.March));
    assertRange(timeline.toList()[1], createDate(Month.April), createDate(Month.May));
});

test('[T7] Add overlapping range at both tails', () => {
    const timeline = new Timeline();
    timeline.add(createDate(Month.April), createDate(Month.May));
    timeline.add(createDate(Month.January), createDate(Month.May));

    assertCount(timeline, 1);
    assertRange(timeline.toList()[0], createDate(Month.January), createDate(Month.May));
});

test('[T8] Add range that exists entirely inside timeline', () => {
    const timeline = new Timeline();
    timeline.add(createDate(Month.March), createDate(Month.April));
    timeline.add(createDate(Month.January), createDate(Month.May));

    assertCount(timeline, 1);
    assertRange(timeline.toList()[0], createDate(Month.January), createDate(Month.May));
});