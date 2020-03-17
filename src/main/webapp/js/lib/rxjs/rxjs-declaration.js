var Observable = rxjs.Observable;
var Subject = rxjs.Subject;
var Notification  = rxjs.Notification ;

//创建
var from = rxjs.from;
var fromEvent = rxjs.fromEvent;
var interval = rxjs.interval;
var of = rxjs.of;
var range = rxjs.range;
var throwError = rxjs.throwError;
var timer = rxjs.timer;

//Join创建
var combineLatest = rxjs.combineLatest;
var concat = rxjs.concat;
var forkJoin = rxjs.forkJoin;
var merge = rxjs.merge;

//转换
var map = rxjs.operators.map;
var concatMap = rxjs.operators.concatMap;
var mergeMap = rxjs.operators.mergeMap;
var switchMap = rxjs.operators.switchMap;
var exhaustMap = rxjs.operators.exhaustMap;

var scan = rxjs.operators.scan;

//过滤
var filter = rxjs.operators.filter;
var take = rxjs.operators.take; //只发出源 Observable 最初发出的的N个值

//Join
var concatAll  = rxjs.operators.concatAll; //通过顺序地连接内部 Observable，将高阶 Observable 转化为一阶 Observable
var mergeAll  = rxjs.operators.mergeAll;
var switchAll  = rxjs.operators.switchAll;
var exhaust = rxjs.operators.exhaust;
var combineAll = rxjs.operators.combineAll;

//多播

//错误处理
var catchError = rxjs.operators.catchError;
var retry = rxjs.operators.retry;
var retryWhen = rxjs.operators.retryWhen;

//工具
var tap  = rxjs.operators.tap;
var delay  = rxjs.operators.delay;
var materialize  = rxjs.operators.materialize;
var dematerialize  = rxjs.operators.dematerialize;

//条件和布尔
var defaultIfEmpty  = rxjs.operators.defaultIfEmpty;

//数学和聚合