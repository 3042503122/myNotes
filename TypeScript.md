# 引言

为什么大型项目非得用 TypeScript 呢，ES6、7 不行么？

其实也没说不行，只不过我个人更倾向在一些协作开发的大型项目中使用 TypeScript 。下面我列一些我做完调研后自己的一些看法

1. 首先，TypeScript 具有类型系统，且是 JavaScript 的超集。 JavaScript 能做的，它能做。JavaScript 不能做的，它也能做。

2. 其次，TypeScript 已经比较成熟了，市面上相关资料也比较多，大部分的库和框架也读对 TypeScript 做了很好的支持。

3. 然后，保证优秀的前提下，它还在积极的开发完善之中，不断地会有新的特性加入进来
4. vscode、ws 等编辑器对 TypeScript 支持很友好

5. JavaScript 是弱类型并且没有命名空间，导致很难模块化，使得其在大型的协作项目中不是很方便

6. TypeScript 在组件以及业务的类型校验上支持比较好，比如

   ```
   // 定义枚举
   const enum StateEnum {
     TO_BE_DONE = 0,
     DOING = 1,
     DONE = 2
   }
   
   // 定义 item 接口
   interface SrvItem {
     val: string,
     key: string
   }
   
   // 定义服务接口
   interface SrvType {
     name: string,
     key: string,
     state?: StateEnum,
     item: Array<SrvItem>
   }
   
   // 然后定义初始值（如果不按照类型来，报错肯定是避免不了的）
   const types: SrvType = {
     name: '',
     key: '',
     item: []
   }
   
   ```

   **配合好编辑器，如果不按照定义好的类型来的话，编辑器本身就会给你报错，而不会等到编译才来报错**

7. 命令空间 + 接口申明更方便类型校验，防止代码的不规范

   比如，你在一个 ajax.d.ts 文件定义了 ajax 的返回类型

   ```
   declare namespace Ajax {
     // axios 返回数据
     export interface AxiosResponse {
       data: AjaxResponse
     }
   
     // 请求接口数据
     export interface AjaxResponse {
       code: number,
       data: object | null | Array<any>,
       message: string
     }
   }
   
   ```

   然后在请求的时候就能进行使用

   ```
   this.axiosRequest({ key: 'idc' }).then((res: Ajax.AjaxResponse) => {
     console.log(res)
   })
   ```

8. 可以使用 泛型 来创建可重用的组件。比如你想创建一个参数类型和返回值类型是一样的通用方法

   ```
   function foo<T> (arg: T): T {
     return arg
   }
   let output = foo('string') // type of output will be 'string'
   ```

   再比如，你想使用泛型来锁定代码里使用的类型

   ```
   interface GenericInterface<T> {
     (arg: T): T
   }
   
   function foo<T> (arg: T): T {
     return arg
   }
   
   // 锁定 myFoo 只能传入 number 类型的参数，传其他类型的参数则会报错
   let myFoo: GenericInterface<number> = foo
   myFoo(123)
   
   ```

   总之，还有很多使用 TypeScript 的好处，这里我就不一一列举了，感兴趣的小伙伴可以自己去查资料

## 参考文章

[TypeScript 入门教程](<https://github.com/xcatliu/typescript-tutorial>)

[TypeScript + 大型项目实战](https://www.jianshu.com/p/8610215a8a84 )

## 基础

### 原始数据类型

```
//原始数据类型
let bData: boolean = false;
let nData: number = 1;
let sData: string = "";
bData = 1;
nData = "2";
sData = 1;
```

### 任意值类型

> [任意值类型](<https://github.com/xcatliu/typescript-tutorial/blob/master/basics/any.md>)（Any）用来表示允许赋值为任意类型，

在任意值上访问任何属性、也允许调用任何方法 都是允许的；

```
let myFavoriteNumber: any = 'seven';
```

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型(区别类型断言，是声明同时赋值)**：

```
let something;
something = 'seven';
something = 7;

something.setName('Tom');
```

等价于

```
let something: any;
something = 'seven';
something = 7;

something.setName('Tom');
```

### 类型推论

> [类型推论 ](<https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-inference.md>)如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

和any区别：**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查**：

```
//以下代码虽然没有指定类型，但是会在编译的时候报错：

let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

### 联合类型

> [联合类型](https://github.com/xcatliu/typescript-tutorial/blob/master/basics/union-types.md) 联合类型（Union Types）表示取值可以为多种类型中的一种。

```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```



### 对象类型 - 接口

> [对象类型](<https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-of-object-interfaces.md>) 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

```
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

定义的变量比接口少了一些属性是不允许的, 多一些属性也是不允许的

```
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

全部

```
interface Person {
    name: string;
    
    //可选属性
    age?: number;
    
    //任意属性: any 、string、 number等等	
    [propName: string]: any;
    
    //只读属性
    //有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：
    //用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了
    //注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
    
    readonly id: number
}

let tom: Person = {
    name: 'Tom'
};
```



### 数组类型

> [数组类型](https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-of-array.md)

```
// 表示法1：「类型 + 方括号」
let fibonacci: number[] = [1, 1, 2, 3, 5];

// 表示法2：数组泛型
let fibonacci: Array<number> = [1, 1, 2, 3, 5];

// 表示法3：用接口表示数组
interface NumberArray {
	[index: string]: number;
}
let fibonacci: NumberArray = [1, 1] 
```



### 函数类型

> [函数类型](<https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-of-function.md>)

```
// 表示法1： 函数声明
function say(msg1: string, repeat: number): string {
	return msg1.repeat(repeat)
}

// 表示法2： 函数表达式
let say = function(msg1: string, repeat: number): string {
	return msg1.repeat(repeat)
}

// 表示法3： 用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

// 可选参数、参数默认值
function say(msg1: string, repeat?: number = 0): string {
	return msg1.repeat(repeat)
}

// 剩余参数
function addArr(arr, ...item: any): any[] {
	items.forEach(function(item) {
        array.push(item);
    });
} 
```



### 内置对象

> [内置对象](https://github.com/xcatliu/typescript-tutorial/blob/master/basics/built-in-objects.md) 中有很多[内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在 TypeScript 中当做定义好了的类型。
>
> 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。



### 类型断言

> [类型断言](https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-assertion.md) 类型断言（Type Assertion）可以用来手动指定一个值的类型。

```
//表示法1： <类型>值
function toBoolean(something: string | number): boolean {
    return <boolean>something;
}

//表示法1：值 as 类型
```



### ???声明文件



## 进阶

### 类型别名

> [类型别名](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/type-aliases.md)用来给一个类型起个新名字。

使用 `type` 创建类型别名 类型别名常用于联合类型。 类型别名常用于联合类型。

```
type Str = string;
let aaa: Str = 'hello'

type BN = boolean | number;
let bbb: BN = true
```

注意，**类型别名与字符串字面量类型都是使用 type 进行定义。**



### 字符串字面量 类型

> [字符串字面量](<https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/string-literal-types.md>) 字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```
type Sex = 'woman' | 'man';

let zhangsan: Sex = 'man'
```



### 元组

> [元祖](<https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/tuple.md>) 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

```
let xcatliu: [string, number] = ['Xcat Liu', 25];
```



### 枚举

> [枚举](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/enum.md) 枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```
// 枚举类型
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days[0] === "Sun"); // true

console.log(Days.Sun);// 0
```

手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 `1`

```
// 枚举类型
enum Days {
  Sun = 1,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days[1] === "Sun"); // true

console.log(Days.Sun);// 1
```



### 类

> [类](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/class.md)

```
//抽象类
// abstract class Animal

class Animal {
  // TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected
  // public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
  // private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
  // protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
  // 必须把属性全都定出来，
  name: string; 	
  
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal("Jack");
console.log(a.sayHi()); // My name is Jack

```



### 接口

0. 用途零：用接口定义函数形状

1. 用途一：对 对象的形状 进行描述

   看【对象类型 - 接口】

2. 用途二：对类的一部分行为进行抽象（然后类 实现 接口）

   实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，一个类可以实现多个接口，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。

   举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：

   `Car` 实现了 `Alarm` 和 `Light` 接口，既能报警，也能开关车灯。

   ```
   interface Alarm {
       alert();
   }
   
   class Door {
   }
   
   class SecurityDoor extends Door implements Alarm {
       alert() {
           console.log('SecurityDoor alert');
       }
   }
   
   interface Light {
       lightOn();
       lightOff();
   }
   
   class Car implements Alarm, Light {
       alert() {
           console.log('Car alert');
       }
   }
   ```

   **接口继承接口**

   接口与接口之间可以是继承关系：

   ```
   interface Alarm {
       alert();
   }
   
   interface LightableAlarm extends Alarm {
       lightOn();
       lightOff();
   }
   ```

   **接口继承类**

   ```
   class Point {
       x: number;
       y: number;
   }
   
   interface Point3d extends Point {
       z: number;
   }
   
   let point3d: Point3d = {x: 1, y: 2, z: 3};
   ```

   

### 泛型

> [泛型](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/generics.md) （Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

1. 用途: 泛型函数

   ```
   function createArray<T>(length: number, value: T): Array<T> {
       let result: T[] = [];
       for (let i = 0; i < length; i++) {
           result[i] = value;
       }
       return result;
   }
   
   createArray<string>(3, 'x'); // ['x', 'x', 'x']
   ```

   

   为什么要用？

   ```
   function createArray(length: number, value: any): Array<any> {
       let result = [];
       for (let i = 0; i < length; i++) {
           result[i] = value;
       }
       return result;
   }
   
   createArray(3, 'x'); // ['x', 'x', 'x']
   ```

   这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：

   `Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value` 的类型。

   这时候，泛型就派上用场了：

2. 泛型类

   ```
   class GenericNumber<T> {
       zeroValue: T;
       add: (x: T, y: T) => T;
   }
   
   let myGenericNumber = new GenericNumber<number>();
   myGenericNumber.zeroValue = 0;
   myGenericNumber.add = function(x, y) { return x + y; };
   ```

   

### 声明合并

> [声明合并](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/declaration-merging.md) 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：



1. 函数合并

   ```
   function reverse(x: number): number;
   function reverse(x: string): string;
   ```

   相当于

   ```
   function reverse(x: number | string): number | string {
       if (typeof x === 'number') {
           return Number(x.toString().split('').reverse().join(''));
       } else if (typeof x === 'string') {
           return x.split('').reverse().join('');
       }
   }
   ```

2. 接口合并

   ```
   interface Alarm {
       price: number;
       alert(s: string): string;
   }
   interface Alarm {
       weight: number;
       alert(s: number): number;
   }
   ```

   相当于

   ```
   interface Alarm {
       price: number;
       weight: number;
       alert(s: string): string;
       alert(s: string, n: number): string;
   }
   
   ```

   注意，**合并的属性的类型必须是唯一的**：

   ```
   interface Alarm {
       price: number;
   }
   interface Alarm {
       price: string;  // 类型不一致，会报错
       weight: number;
   }
   
   // index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
   ```

   接口中方法的合并，与函数的合并一样：

3. 类的合并（同接口合并）