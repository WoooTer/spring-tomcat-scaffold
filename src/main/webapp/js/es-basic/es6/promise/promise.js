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