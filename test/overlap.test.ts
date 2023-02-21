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
