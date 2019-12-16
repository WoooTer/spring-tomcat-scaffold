class Point {
    static myType = "Point";
    static wow() {
        console.log("wow");
    }

    myName = "Shally";
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

Point.wow();
console.log(Point.myType);

let p = new Point(1, 2);
console.log(p.toString());
console.log(p.myName);


class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}

