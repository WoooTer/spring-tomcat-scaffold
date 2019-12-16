/**
 * 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，
 * 将其替换成一个只接受回调函数作为参数的单参数函数。
 */
// ES5版本
var Thunk5 = function(fn){
    return function (){
        var args = Array.prototype.slice.call(arguments);
        return function (callback){
            args.push(callback);
            return fn.apply(this, args);
        }
    };
};

// ES6版本
const Thunk6 = function(fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    };
};

function mySetTimeout(timeout, fn) {
    setTimeout(fn, timeout);
}

var setTimeoutTrunk = Thunk6(mySetTimeout);
setTimeoutTrunk(1000)(function () {
    console.log("wow\n\n");
});

/**
 * Generator 函数的流程管理
 */
var gen = function* (){
    var r1 = yield setTimeoutTrunk(1000);
    console.log(r1.toString());
    var r2 = yield setTimeoutTrunk(500);
    console.log(r2.toString());
};

var g = gen();
var r1 = g.next();
r1.value(function (err, data) {
    data = "wow 1000ms";
    if (err) throw err;
    var r2 = g.next(data);

    r2.value(function (err, data) {
        data = "wow 500ms";
        if (err) throw err;
        g.next(data);
    });
});

/**
 * Thunk 函数的自动流程管理 —— 上例的递归实现
 */
function run(fn) {
    var gen = fn();

    function next(err, data) {
        data = 'woow';
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
run(gen);

/**
 *  使用 co 的前提条件是：
 *      1、Generator 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。
 *      2、如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，
 *  co 还支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
 */
co(function* () {
    var r1 = yield new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, 'co 1000ms');
    });
    console.log(r1 + "\n\n");

    var r2 = yield new Promise((resolve, reject) => {
        setTimeout(resolve, 500, 'co 500ms');
    });
    console.log(r2);
}).then((value) => {
    console.log("\nco over");
});