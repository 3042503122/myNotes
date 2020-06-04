# 参考资源

- [阮一峰e6](https://es6.ruanyifeng.com/#docs/object)

# 属性名表达式

```
let index =1;
let obj = {
    [`ecLegend[${index}].active`]: true,
    ['a'+'bc']: 123
};
```



# promise | setTimeout

代码：<https://codesandbox.io/s/x92bz>



```
setTimeout(() => {
  console.log(1);
}, 0);
const p = new Promise(resolve => {
  console.log(2);
  resolve();
});
p.then(() => {
  console.log(3);
});
console.log(4);
```

解释1：<https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/>

解释2：<https://www.cnblogs.com/wangfupeng1988/p/4001284.html>

解释3： 博客园面试



# super

## 参考

[Class中的super](https://blog.csdn.net/q857277886/article/details/79146270)

## super方法

用途：而super方法就是用来创建父类this对象的。 

注意：如果子类没有定义constructor方法，constructor方法会被默认创建，并默认调用super函数

```
class Student extends Person {
}

// 等同于上方
class Student extends Person {
	constructor(...args) {
		super(...args);
	}
}
```



##  super属性

当做属性使用时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。



# proxy

[Proxy 的巧用](https://juejin.im/post/5d2e657ae51d4510b71da69d)



# generator / yield

[ES6-Generator 函数 和 async 函数](https://juejin.im/post/5b1751d551882513756f0bdc)



# 静态属性| 静态方法

静态属性、静态方法不能被实例继承，可以被子类继承。直接通过类调用

//  父类的静态方法，可以被子类继承。 

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

上面代码中，父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。

静态方法也是可以从`super`对象上调用的。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```



## 静态属性

-  <静态属性>: 指的是 Class 本身的属性，即`Class.propName`，而不是定义在实例对象 

  ```
  // 写法一：老写法
  class Foo {
    // ...
  }
  Foo.prop = 1;
  
  // 写法二：新写法
  class Foo {
    static prop = 1;
  }
  ```

   上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。 

  应用：

  // 老写法

  ```
  import PropTypes from 'prop-types';
  
  class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }
  
  Greeting.propTypes = {
    name: PropTypes.string
  };
  
  // 指定 props 的默认值：
  Greeting.defaultProps = {
    name: 'Stranger'
  };
  ```

  // 新写法

  ```
  import PropTypes from 'prop-types';
  
  class Greeting extends React.Component {
    static propTypes = {
        name: PropTypes.string
    }
    
    static defaultProps = {
        name: 'Stranger'
    }
  
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }
  ```

  

##       静态方法

-  < 静态方法>: 指的是 Class 本身的方法，即`Class.propMethod`，而不是定义在实例对象。 **注意，如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例**。 

  ```
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  Foo.classMethod() // 'hello'
  
  var foo = new Foo();
  foo.classMethod()
  // TypeError: foo.classMethod is not a function
  ```

  ```
  class Foo {
    static bar() {
      this.baz();
    }
    static baz() {
      console.log('hello');
    }
    baz() {
      console.log('world');
    }
  }
  
  Foo.bar() // hello
  ```

  

  

#  Decorator 装饰器

[参考链接](http://es6.ruanyifeng.com/#docs/decorator)

 【装饰器（Decorator）】是一种与类（class）相关的语法，用来注释或修改类和类方法 。 装饰器是一种函数，写成`@ + 函数名`。它可以放在类和类方法的定义前面 。

 注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。 



## 装饰类



```javascript
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```

 上面代码中，`@testable`就是一个装饰器。它修改了`MyTestableClass`这个类的行为，为它加上了静态属性`isTestable`。`testable`函数的参数`target`是`MyTestableClass`类本身。 





上面代码中，`testable`函数的参数`target`，就是会被装饰的类。

如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。

```
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```





应用

```
// 老写法
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);

// 新写法
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```



## 装饰方法

