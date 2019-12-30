var rxjsOperatorTest = {};

/**
 * 多个 Obserable 的级联，后一个 Obserable 必须等到前一个 Obserable 的所有事件都被观察后，才能开始被观察
 */
rxjsOperatorTest.concat = function () {
    const timer = interval(1000).pipe(take(4));
    // const timer_1 = interval(1000).pipe(
    //     take(4),
    //     map(ev => interval(1000).pipe(
    //         take(3)
    //     ).subscribe(x => console.log(x)))
    // );
    const sequence = range(1, 10);
    const result = concat(timer, sequence);
    result.subscribe(x => console.log(x));
};

/**
 * @ 将 二阶Obserable观察链 flatten 成一阶
 * @ 多条 二阶Obserable观察链 的级联：后一条 二阶Obserable观察链 的头必须等到前一个 二阶Obserable观察链 的尾结束后，才能被观察
 * @ concatAll 等价于 concurrency 参数(最大并发数)为1的 mergeAll
 */
rxjsOperatorTest.concatAll = function () {
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(
        map(ev => interval(1000).pipe(take(4))),
    );
    const firstOrder = higherOrder.pipe(concatAll());
    firstOrder.subscribe(x => console.log(x));
};

rxjsOperatorTest.concatAll_1 = function () {
    fromEvent(document, 'click').pipe(
        map(ev => interval(1000).pipe(take(4))),
        concatAll(),
        map(ev => interval(1000).pipe(take(3))),
        concatAll()
    ).subscribe(x => console.log(x));
};

/**
 *  先 map 再 concatAll 的组合
 */
rxjsOperatorTest.concatMap = function () {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(
        concatMap(ev => interval(1000).pipe(take(4))),
        concatMap(ev => interval(1000).pipe(take(3))),
    );
    result.subscribe(x => console.log(x));
};

/**
 * @ 多个 Obserable 的穿插混合，每个 Obserable 的所有事件都保持它原来的被观察时间
 */
rxjsOperatorTest.merge = function () {
    const clicks = fromEvent(document, 'click');
    const timer = interval(1000);
    const clicksOrTimer = merge(clicks, timer);
    clicksOrTimer.subscribe(x => console.log(x));
};

/**
 * @ 将 二阶Obserable观察链 flatten 成一阶
 * @ 多条 二阶Obserable观察链 的穿插混合，每个事件都尽可能保持它原来的被观察时间（由最大并发参数来决定）
 */
rxjsOperatorTest.mergeAll = function () {
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(map((ev) => interval(1000)));
    const firstOrder = higherOrder.pipe(mergeAll());
    firstOrder.subscribe(x => console.log(x));
};

rxjsOperatorTest.mergeMap = function () {
    const letters = of('a', 'b', 'c');
    const result = letters.pipe(
        mergeMap(x => interval(1000).pipe(map(i => x+i))),
    );
    result.subscribe(x => console.log(x));
};

/**
 * 等同于 concatAll 再增加一个效果：
 * 若前一条 二阶Obserable观察链 还未结束，后一条 二阶Obserable观察链 就已经起效，那么前一条直接丢弃不产生结果
 */
rxjsOperatorTest.switchAll = function () {
    const clicks = fromEvent(document, 'click').pipe(tap(() => console.log('click')));
    const source = clicks.pipe(map((ev) => interval(1000)));
    source.pipe(
        switchAll()
    ).subscribe(x => console.log(x));
};

rxjsOperatorTest.switchMap = function () {
    const switched = of(1, 2, 3).pipe(
        switchMap((x) => of(x, x ** 2, x ** 3))
    );
    switched.subscribe(x => console.log(x));
};

/**
 * 等同于 concatAll 再增加一个效果：
 * 若前一条 二阶Obserable观察链 还未结束，后一条 二阶Obserable观察链 就已经起效，那么后一条直接丢弃不产生结果
 */
rxjsOperatorTest.exhaust = function () {
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(
        map((ev) => interval(1000).pipe(take(5))),
    );
    const result = higherOrder.pipe(exhaust());
    result.subscribe(x => console.log(x));
};

rxjsOperatorTest.exhausMap = function () {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(
        exhaustMap(ev => interval(1000).pipe(take(5))),
        // exhaustMap(ev => interval(1000).pipe(take(3)))
    );
    result.subscribe(x => console.log(x));
};