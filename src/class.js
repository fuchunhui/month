class Person {}

const Animal = class {};

console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
class ClassDeclaration {}
console.log(ClassDeclaration); // [class ClassDeclaration]

let Person = class PersonName {
  identify() {
    console.log(Person.name);
    console.log(PersonName.name);
  }
}

let p10 = new Person();
p10.identify(); // PersonName, PersonName

// 对 class 来说，使用 new 调用类的构造函数会执行如下操作：
// 1. 在内存中创建一个新对象
// 2. 这个新对象内部的 [[Prototype]] 特性被赋值为构造函数的 prototype 属性
// 3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
// 4. 执行构造函数内部的代码（给新对象添加属性）
// 5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

class Animal {}
class Person {
  constructor () {
    console.log('person ctor...')
  }
}
class Vegetable {
  constructor() {
    this.color = 'orange';
  }
}

let a = new Animal();
let p = new Person(); // person ctor...
let v = new Vegetable();
console.log(v.color); // orange

let classList = [
  class {
    constructor(id) {
      this.id_ = id;
      console.log(`instance ${this.id_}`);
    }
  }
];

function createInstance(clazz, id) {
  return new clazz(id);
}

let i1 = createInstance(classList[0], 10); // instance 10

class Person {
  constructor () {
    this.name = new String('Jack');
    this.sayName = () => console.log(this.name);
    this.nicknames = ['Jake', 'J-Dog'];
  }
}

let p1 = new Person();
let p2 = new Person();
p1.sayName(); // Jack
p2.sayName(); // Jack

console.log(p1.name === p2.name); // false
console.log(p1.sayName === p2.sayName); // false
console.log(p1.nicknames === p2.nicknames); // false

class Person {
  constructor() {
    // 添加到 this 的所有内容都会存在于不同的实例上
    this.locate = () => console.log('instance');
  }

  // 在类块中定义的所有内容都会存在于类的原型上
  locate() {
    console.log('prototype');
  }
}

let p3 = new Person();
p3.locate(); // instance
Person.prototype.locate(); // prototype

class Person {
  stringKey() {
    console.log('Invoked stringKey');
  }
  'string key'() {
    console.log('Invoked string key');
  }
  [Symbol('symbolKey')]() {
    console.log('Invoked symbolKey');
  }
  ['computed' + 'Key']() {
    console.log('Invoked computedKey');
  }
}

class Person {
  set name(value) {
    this.name_ = value;
  }
  get name() {
    return this.name_;
  }
}
let p5 = new Person();
p5.name = 'Mike';
console.log(p5.name); // Mike

// 静态类成员在类定义中使用 static 关键字作为前缀。在静态成员中，this 引用类本身，而不是类的实例。其他所有约定跟原型成员一样。

class Person {
  constructor() {
    // 添加到 this 的所有内容都会存在于不同的实例上
    this.locate = () => console.log('instance', this);
  }

  // 定义在类的原型对象上
  locate() {
    console.log('prototype', this);
  }

  // 定义在类本身上
  static locate() {
    console.log('class', this);
  }
}
let p6 = new Person();
p6.locate(); // instance, Person {}
Person.prototype.locate(); // prototype, Person {}
Person.locate(); // class, class Person {}

class Person {
  constructor(age) {
    this.age = age;
  }
  saveAge() {
    // 保存年龄到数据库
    console.log(this.age);
  }
  static create() {
    return new Person(Math.floor(Math.random() * 100));
  }
}

console.log(Person.create()); // Person { age: 42 }

// 迭代器和生成器方法
// 类定义语法支持在原型和类本身上定义生成器方法。

class Person {
  *createNicknameIterator() {
    yield 'Jack';
    yield 'Jake';
    yield 'J-Dog';
  }
  static *createJobIterator() {
    yield 'Butcher';
    yield 'Baker';
    yield 'Candlestick maker';
  }
}
let jobIter = Person.createJobIterator();
console.log(jobIter.next().value); // Butcher
console.log(jobIter.next().value); // Baker
console.log(jobIter.next().value); // Candlestick maker

let p7 = new Person();
let nicknameIter = p7.createNicknameIterator();
console.log(nicknameIter.next().value); // Jack
console.log(nicknameIter.next().value); // Jake
console.log(nicknameIter.next().value); // J-Dog

class Person {
  constructor() {
    this.nicknames = ['Jack', 'Jake', 'J-Dog'];
  }

  *[Symbol.iterator]() {
    yield * this.nicknames.entries();
  }
}
let p8 = new Person();
for (let [idx, nickname] of p8) {
  console.log(idx, nickname);
}

class Person {
  constructor() {
    this.nicknames = ['Jack', 'Jake', 'J-Dog'];
  }

  [Symbol.iterator]() {
    return this.nicknames.entries();
  }
}
let p9 = new Person();
for (let [idx, nickname] of p9) {
  console.log(idx, nickname);
}
