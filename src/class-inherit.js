// 类继承使用的是新语法，但背后依旧使用的是原型链。

class Vehicle {}

class Bus extends Vehicle {}
let b = new Bus();
console.log(b instanceof Bus) // true
console.log(b instanceof Vehicle) // true

function Person() {}
class Enginer extends Person {}
let e = new Enginer();
console.log(e instanceof Enginer) // true
console.log(e instanceof Person) // true

// 派生类都会通过原型链访问到类和原型上定义的方法。this 的值会反映调用相应方法的实例或者类：
class Vehicle {
  identifyPrototype(id) {
    console.log(id, this);
  }

  static identifyClass(id) {
    console.log(id, this);
  }
}

class Bus extends Vehicle {}

let b2 = new Bus();
let v = new Vehicle();

b2.identifyPrototype(1); // 1 Bus {}
v.identifyPrototype(2); // 2 Vehicle {}

Bus.identifyClass(3); // 3 class Bus {}
Vehicle.identifyClass(4); // 4 class Vehicle {}

class Vehicle {
  constructor() {
    this.hasEngine = true;
  }
  static identify() {
    console.log('Vehicle');
  }
}
class Bus extends Vehicle {
  constructor() {
    super();
    console.log(this.hasEngine); // true
    console.log(this instanceof Vehicle); // true
    console.log(this); // Bus { hasEngine: true }
  }
  static identify() {
    super.identify();
    console.log('Bus');
  }
}
// new Bus();
Bus.identify(); // Vehicle, Bus

// super 只能在派生类构造函数和静态方法中使用。

class Vehicle {}
class Bus extends Vehicle {
  constructor() {
    console.log(this);
  }
}
new Bus();

class Vehicle {
  constructor() {
    console.log(new.target);
  }
}

// 另外，通过在抽象基类构造函数中进行检查，可以要求派生类必须定义某个方法。
// 因为原型方法在调用类构造函数之前就已经存在了，所以可通过 this 关键字来检查相应的方法。

class Vehicle {
  constructor() {
    if (new.target === Vehicle) {
      throw new Error('Vehicle cannot be directly instantiated');
    }
    if (this.foo === undefined) {
      throw new Error('Inheriting class must define foo()');
    }
    console.log('Vehicle constructor Success');
  }
}
class Bus extends Vehicle {
  foo() {}
}
class Van extends Vehicle {}
new Bus();
new Van();

// 继承内置类型
// ES6 类为继承内置引用类型提供顺畅的机制，开发者可以方便地扩展内置类型。

class SuperArray extends Array {
  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  }
}
let a = new SuperArray(1, 2, 3, 4, 5);
console.log(a instanceof Array); // true
console.log(a instanceof SuperArray); // true

console.log(a.shuffle()); // [ 5, 1, 4, 3, 2 ]

class SuperArray extends Array {}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => x % 2 === 0);
console.log(a2); // [ 2, 4 ]
console.log(a2 instanceof SuperArray); // true

// 覆盖默认行为，需要覆盖 Symbol.species 访问器，这个访问器决定在创建返回的实例时使用的类。

class SuperArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => x % 2 === 0);
console.log(a2); // [ 2, 4 ]
console.log(a2 instanceof SuperArray); // false

// 类混入
// 把不同类的行为集中到一个类是一种常见的 JavaScript 模式。

// 连缀调用
class Vehicle {}
let FooMixin = superclass => class extends superclass {
  foo() {
    console.log('foo');
  }
}
let BarMixin = superclass => class extends superclass {
  bar() {
    console.log('bar');
  }
}
let BazMixin = superclass => class extends superclass {
  baz() {
    console.log('baz');
  }
}

function mix(Base, ...Mixins) {
  return Mixins.reduce((accumulator, current) => current(accumulator), Base);
}
// class Bus extends FooMixin(BarMixin(BazMixin(Vehicle))) {}
class Bus extends mix(Vehicle, FooMixin, BarMixin, BazMixin) {}
let b1 = new Bus();
b1.foo(); // foo
b1.bar(); // bar
b1.baz(); // baz

// 很多JS 框架已经抛弃混入模式，转向组合模式，即把方法提取到独立的类和辅助对象中，然后把它们组合起来，但不使用继承。
// 组合胜过继承 composition over inheritance 这个设计原则被很多人遵循，在代码设计中提供极大的灵活性。