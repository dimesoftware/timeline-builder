import Timeline from '../src';

test('No overlapping range should not be contained in timeline', () => {
    const timeline = new Timeline();
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 5));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 15));

    const contains = timeline.contains(new Date(2023, 0, 6), new Date(2023, 0, 7))
    expect(contains).toBe(false);
});

test('Overlapping range that ends in the range should be contained in timeline', () => {
    const timeline = new Timeline();
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 5));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 15));

    const contains = timeline.contains(new Date(2023, 0, 1), new Date(2023, 0, 3))
    expect(contains).toBe(true);
});

test('Overlapping range that starts in the range should be contained in timeline', () => {
    const timeline = new Timeline();
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 5));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 15));

    const contains = timeline.contains(new Date(2023, 0, 3), new Date(2023, 0, 8))
    expect(contains).toBe(true);
});

test('Fully overlapping range should be contained in timeline', () => {
    const timeline = new Timeline();
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 5));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 15));

    const contains = timeline.contains(new Date(2022, 11, 31), new Date(2023, 1, 16))
    expect(contains).toBe(true);
});

test('Reject that new dates will be added ', () => {
    const timeline = new Timeline();
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 5));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 15));

    const willExpand = timeline.containsAll(new Date(2023, 0, 1), new Date(2023, 0, 4))
    expect(willExpand).toBe(false);
});

test('Claim that a partially overlapping range will be added ', () => {
    const timeline = new Timeline();
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 5));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 15));

    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 0, 7);
    const willExpand = timeline.containsAll(startDate, endDate)
    expect(willExpand).toBe(true);

    timeline.add(startDate, endDate);
    expect(timeline.toList()[0].end).toStrictEqual(endDate);
});

test('Claim that a fully overlapping range will be added ', () => {
    const timeline = new Timeline();
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 5));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 15));

    const startDate = new Date(2022, 11, 31);
    const endDate = new Date(2023, 0, 15);
    const willExpand = timeline.containsAll(startDate, endDate);
    expect(willExpand).toBe(true);

    timeline.add(startDate, endDate);

    expect(timeline.count).toBe(1);
    expect(timeline.toList()[0].start).toStrictEqual(startDate);
    expect(timeline.toList()[0].end).toStrictEqual(endDate);
});