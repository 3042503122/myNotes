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

