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
        mergeMap(x => interval(1000).pipe(map(i => x + i))),
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

/**
 * 【combine】
 * of(70, 72, 76, 79, 75) 为同步流，所以会等其全部执行完，subscribe才会接收
 */
rxjsOperatorTest.combineLatest_sync = function () {
    const weight = of(70, 72, 76, 79, 75);
    const height = of(1.76, 1.77, 1.78);
    const bmi = combineLatest(weight, height).pipe(
        tap(e => console.log(e)),
        map(([w, h]) => w / (h * h)),
    );
    bmi.subscribe(x => console.log('BMI is ' + x));
};

/**
 * 由于js为单线程&事件队列，所以就算再怎么同时也依旧能分出先后
 */
rxjsOperatorTest.combineLatest_async_atSameTime = function () {
    const firstTimer = interval(1000).pipe(delay(1000), take(4));
    const secondTimer = interval(1000).pipe(delay(1100), take(4));
    const combinedTimers = combineLatest(firstTimer, secondTimer);
    combinedTimers.subscribe(value => console.log(value));
};

rxjsOperatorTest.combineAll = function () {
    const source$ = interval(1000).pipe(take(2));
    const example$ = source$.pipe(
        map(val =>
            interval(1000).pipe(
                map(i => `Result (${val}): ${i}`),
                take(5)
            )
        )
    );

    example$.pipe(combineAll())
        .subscribe(console.log);
};

rxjsOperatorTest.combineAll_withRandom = function () {
    const clicks = interval(1000).pipe(delay(1000), take(2));
    let random = null;
    const higherOrder = clicks.pipe(
        tap(() => {
            random = Math.random() * 2000; // 此处的 random值不同，会导致打印出来的结果不同
            console.log(random);
        }),
        map(ev =>
            interval(random).pipe(take(3))
        )
    );

    const result = higherOrder.pipe(
        combineAll()
    );
    result.subscribe(x => console.log(x));
};

rxjsOperatorTest.expand = function () {
    const clicks = fromEvent(document, 'click');
    const powersOfTwo = clicks.pipe(
        mapTo(1),
        expand(x => of(2 * x).pipe(delay(1000))),
        take(10),
    );
    powersOfTwo.subscribe(x => console.log(x));
};

rxjsOperatorTest.groupBy = function () {
    of(
        {id: 1, name: 'JavaScript'},
        {id: 2, name: 'Parcel'},
        {id: 2, name: 'webpack'},
        {id: 1, name: 'TypeScript'},
        {id: 3, name: 'TSLint'}
    ).pipe(
        tap(e => console.log(e.id + ':' + e.name)),
        /**
         * 每当发现新的分组元素，就会创建一个新的group$(Subject)
         * group$每次收到 一个属于它分组的值，就会通过Subject发出这个值
         */
        groupBy(p => p.id),
        tap(console.log),
        tap(group$ => {
            group$.subscribe(console.log)
        })
        // mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], [])))
    )
        .subscribe(p => {});
};

rxjsOperatorTest.defaultIfEmpty = function () {
    of(1, 2, 3).pipe(
        filter(e => e === 4),
        defaultIfEmpty('is empty')
    ).subscribe(console.log);
};