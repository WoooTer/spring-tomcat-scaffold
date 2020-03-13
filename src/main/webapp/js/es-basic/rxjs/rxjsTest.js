
var rxjsTest = {
    observable: {},
    subject: {},
    operator: {}
};

/**
 * 【关键词】：非惰性/惰性、主动/被动、单个值/多个值
 * Function 是惰性的评估运算，调用时会同步地返回一个单一值。
   Generator 是惰性的评估运算，调用时会同步地返回零到(有可能的)无限多个值。
   Promise 是最终可能(或可能不)返回单个值的运算。
   Observable 是惰性的评估运算，它可以从它被调用的时刻起同步或异步地返回零到(有可能的)无限多个值。
 */
rxjsTest.observable.pushMultipleValue = function () {
    const observable = new Observable(subscriber => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        setTimeout(() => {
            subscriber.next(4);
            subscriber.complete();
        }, 1000);
    });
    console.log('just before subscribe');
    observable.subscribe({
        next(x) { console.log('got value ' + x); },
        error(err) { console.error('something wrong occurred: ' + err); },
        complete() { console.log('done'); }
    });
    console.log('just after subscribe');
};

/**
 * 因为 Observable 执行可能会是无限的，并且观察者通常希望能在有限的时间内中止执行,以避免浪费计算能力或内存资源。
 */
rxjsTest.observable.unsubscribe = function () {
    const observable = new Observable(function subscribe(subscriber) {
        // Keep track of the interval resource
        const intervalId = setInterval(() => {
            subscriber.next('hi');
        }, 1000);

        // Provide a way of canceling and disposing the interval resource
        return function unsubscribe() {
            clearInterval(intervalId);
        };
    });

    const subscription = observable.subscribe({
        next(x) { console.log('got value ' + x); }
    });
    setTimeout(() => {
        subscription.unsubscribe();
    }, 5000);
};

/**
 *  operator 的两种调用方式
 */
rxjsTest.operator.constructed = function () {
    map(x => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
};

rxjsTest.operator.computeChain = function() {
    range(0, 10).pipe(
        filter(x => x % 2 === 0),
        map(x => x + x),
        scan((acc, x) => acc + x, 0)
    ).subscribe(x => console.log(x))
};

/**
 * 每个 Subject 都是 Observable
 */
rxjsTest.subject.multicast = function () {
    const subject = new Subject();

    subject.subscribe({
        next: (v) => console.log(`observerA: ${v}`)
    });
    subject.subscribe({
        next: (v) => console.log(`observerB: ${v}`)
    });

    subject.next(1);
    subject.next(2);
};

/**
 * 每个 Subject 也都是 观察者
 */
rxjsTest.subject.asObserver = function () {
    const  subject = new Subject();

    subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });

    const  observable = from([1, 2, 3]);
    observable.subscribe(subject); // 你可以提供一个 Subject 进行订阅
};

let subject_pipeTest = null;
rxjsTest.subject.pipeTest = function () {
    subject_pipeTest = new Subject();

    fromEvent(document, 'click').pipe(
        concatMap(e => subject_pipeTest),
        concatMap(() => interval(1000).pipe(take(3)))
    ).subscribe(console.log);

    setTimeout(() => {
        subject_pipeTest.next(88)
    }, 3000);
};

rxjsTest.subject.pipeTest2 = function () {
    const subject = new Subject();
    const click = fromEvent(document, 'click');

    combineLatest(
        subject, click
    ).subscribe(console.log);

    setTimeout(() => {
        subject.next(88)
    }, 3000);
};