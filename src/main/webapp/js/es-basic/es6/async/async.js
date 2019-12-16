const asyncSetTimeout = async function () {
    var r1 = await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, 'co 1000ms');
    });
    console.log(r1 + "\n\n");

    var r2 = await new Promise((resolve, reject) => {
        setTimeout(resolve, 500, 'co 500ms');
    });
    console.log(r2);
};

asyncSetTimeout().then(() => {
    console.log("asyncSetTimeout over!");
});
