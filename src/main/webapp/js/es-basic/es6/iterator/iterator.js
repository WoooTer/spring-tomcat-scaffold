/**
 * 自定义 iterable对象
 */
let obj = {
    data: [ 'hello', 'world', 'oh', 'my', 'god' ],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

let it = obj[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
for (let ele of obj){
    console.log(ele);
}

/**
 * 获取原生支持的 iterator对象
 */
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

console.log(iter.next()); // { value: 'a', done: false }
console.log(iter.next()); // { value: 'b', done: false }
console.log(iter.next()); // { value: 'c', done: false }
console.log(iter.next()); // { value: undefined, done: true }

for (let ele of arr){
    console.log(ele);
}
