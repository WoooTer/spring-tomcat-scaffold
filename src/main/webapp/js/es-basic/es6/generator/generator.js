/**
 * 异步操作的同步化表达
 */
function* main() {
    var result = yield request("http://some.url");
    console.log(result);
}

function request(url) {
    setTimeout(() => {
        it.next("res");
    }, 1000);
}

let it = main();
let result = it.next();
console.log(result);

