import Timeline from '../src';
test('Should add 1 date range', () => {
    const timeline = new Timeline();    
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
    expect(timeline.count).toBe(1);
});

test('Should add 2 non-overlapping date ranges', () => {
    const timeline = new Timeline();    
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
    timeline.add(new Date(2023, 0, 5), new Date(2023, 0, 6));

    expect(timeline.count).toBe(2);
});

test('Should merge 2 overlapping date ranges', () => {
    const timeline = new Timeline();    
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
    timeline.add(new Date(2023, 0, 2), new Date(2023, 0, 6));

    console.log(timeline.toList());

    expect(timeline.count).toBe(1);
    expect(timeline.toList()[0].start).toStrictEqual(new Date(2023, 0, 1));
    expect(timeline.toList()[0].end).toStrictEqual(new Date(2023, 0, 6));
});

test('Should merge 2 overlapping date ranges', () => {
    const timeline = new Timeline();    
    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
    timeline.add(new Date(2023, 0, 2), new Date(2023, 0, 6));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 12));

    expect(timeline.count).toBe(2);
    expect(timeline.toList()[0].start).toStrictEqual(new Date(2023, 0, 1));
    expect(timeline.toList()[0].end).toStrictEqual(new Date(2023, 0, 6));

    expect(timeline.toList()[1].start).toStrictEqual(new Date(2023, 0, 10));
    expect(timeline.toList()[1].end).toStrictEqual(new Date(2023, 0, 12));
});

test('Should merge with new date range that preceeds it', () => {
    const timeline = new Timeline();    

    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
    timeline.add(new Date(2022, 11, 31), new Date(2023, 0, 1));

    expect(timeline.count).toBe(1);
    expect(timeline.toList()[0].start).toStrictEqual(new Date(2022, 11, 31));
    expect(timeline.toList()[0].end).toStrictEqual(new Date(2023, 0, 3));
});

test('Long date range should merge all existing date ranges', () => {
    const timeline = new Timeline();    

    timeline.add(new Date(2023, 0, 1), new Date(2023, 0, 3));
    timeline.add(new Date(2023, 0, 10), new Date(2023, 0, 15));

    timeline.add(new Date(2022, 11, 1), new Date(2023, 1, 1));

    expect(timeline.count).toBe(1);
    expect(timeline.toList()[0].start).toStrictEqual(new Date(2022, 11, 1));
    expect(timeline.toList()[0].end).toStrictEqual(new Date(2023, 1, 1));
});