function timeout(ms, isRejected) {
    return new Promise((resolve, reject) => {
        if (isRejected) {
            reject();
        }
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100, true).then((value) => {
    console.log(value);
}, () => {
    console.log("rejected");
});

/**
 * eg.1
 * resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例
 */
const eg1_p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject('eg1_p1 fail'), 3000)
});

const eg1_p2 = new Promise(function (resolve, reject) {
    //若此处调用 reject，则无需等待 p1状态改变，直接返回结果，且入参即为 p1这个 Promise对象
    //若调用 resolve，则入参为 p1的，resolve/reject的入参
    setTimeout(() => resolve(eg1_p1), 1000)
});

eg1_p2.then(result => console.log(result))
    .catch(error => console.log(error));

/**
 * eg.2
 * then 的链式调用，回调函数中返回 非Promise对象
 */
//then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
//因此可以采用链式写法，即then方法后面再调用另一个then方法。
const eg2_p1 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve('eg2_p1 success'), 1000);
});

eg2_p1.then(result => {
    console.log(result);
    return result;
}).then(result => console.log(result + " 第二次"));

/**
 * then 的链式调用，回调函数中返回 Promise对象
 */
//前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），
//这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
new Promise(function (resolve, reject) {
    setTimeout(() => resolve('then_promise_1'), 1000);
}).then((result) => {
    console.log(result);
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve('then_promise_2'), 1000);
    })
}).then(result => console.log(result));
