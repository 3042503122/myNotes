# react迭代项目入手

## 步骤

- 启动项目

  看package.json 启动项目





# api

https://reactjs.org/docs/create-a-new-react-app.html

# 安装脚手架

```
 npm install -g create-react-app
```

# 创建react应用

https://github.com/facebook/create-react-app

**npx**

```
npx create-react-app my-app
```

*(npx comes with npm 5.2+ and higher, see instructions for older npm versions)*

**npm**

```
npm init react-app my-app
```

*npm init <initializer> is available in npm 6+*

**Yarn**

```
yarn create react-app my-app
```

*yarn create is available in Yarn 0.25+*



**问题**

1. npx create-react-app my-app时总是卡在[1/4] Resolving packages...，之后my-app文件夹里只有一个package.json文件

   原因：网不好，登录上京东vpn后能正常安装。或者用手机开4G热点给电脑用

   

# 启动react应用

```
npm run start
```



# 小知识

1. 网页title上的logo

   ![](E:\self\mahongluRecord\notes\images\react_1.png)

```
//图片格式必须是.ico 名字一般都叫做favicon.ico
<link rel="shortcut icon" href="./public/favicon.ico" type="image/x-icon">
```



2. 如果浏览器禁止了javascript，前端要做的容错

```
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
  </body>
```



# 工程目录

## public



## src

这个项目所有的源代码

- index.js 项目的入口

  **看到js之中引入了css，这就是react vue angular的一个重要理念“all in js”**

  ```
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  //看到js之中引入了css，这就是react vue angular的一个重要理念“all in js”
  import './index.css';
  import App from './App';
  
  //像app一样，用户只浏览一次，下次再访问断网时依旧能正常显示。除此以外首页(public/index)还要引入manifest.json
  import * as serviceWorker from './serviceWorker';
  
  ReactDOM.render(<App />, document.getElementById('root'));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  
  ```

  

- app.js

  负责页面上显示的内容



# 基础



## TodoList

```
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import TodoList from './TodoList';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TodoList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

```
// src/TodoList.js
import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props) {
      super(props);

      this.state = {
        inputVal: '',
        list: []
      };

      this.handleInput = this.handleInput.bind(this);
      this.handleInsert = this.handleInsert.bind(this);
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  render() {
    return (
      <Fragment>
        <div>
          <input type="text" value={this.state.inputVal} onChange={this.handleInput}/>
          <button onClick={this.handleInsert}>插入</button>
        </div>
        {
          this.getItem()
        }
       
      </Fragment>
    )
  }
  
  getItem() {
    return this.state.list.map((item, idx) => {
      return (<TodoItem delete={this.handleDeleteItem} key={idx} content={item} index={idx}></TodoItem>)
    })
  }

  handleInput(e) {
    let value = e.target.value;
    this.setState(() => ({
      inputVal: value
    }));
  }

  // 数组 - 增
  handleInsert(e) {
    this.setState(() => ({
      inputVal: '',
      list: [...this.state.list, this.state.inputVal]
    }));
  }

 // 数组 - 删
  handleDeleteItem(index) {
    let list = [...this.state.list];
    list.splice(index, 1);
    this.setState(() => ({
      list: list
    }));
  }
}

export default TodoList;
```



```
// src/TodoItem.js
import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <div onClick={this.handleDelete}>. {this.props.content}</div>
    )
  }

  handleDelete(e) {
      this.props.delete(this.props.index);
  }
}

export default TodoItem;
```



## 组件

**定义**：

```
//app.js
import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return (<div>hello</div>)
  }
}

export default App;

```

**引用：**

```
//index.js
import React from 'React';
import ReactDom from 'ReactDom';
import App from './App';

ReactDom.render(<app />, document.getElementById('root'));
```

**单向数据流：**

> 父组件可以向子组件传值，给子组件使用；但是子组件不能更改父组件传递的值

**组件传值：**

> 父组件通过属性传值给子组件，子组件通过{this.props.属性名|方法}来接收父组件传值

> 子组件要调用父组件方法，改变父组件数据；this.props.方法（父）,父组件传递时别忘了.bind(this)

```
// 父组件
// src/TodoList.js

import TodoItem from './TodoItem'

//写法1
<ul>
  {
     this.state.list.map((item, index) => {
        return (
                <TodoItem 
                  key={index}
                  content={item} 
                  index={index}
                  deleteItem={this.handleItemDelete.bind(this)}
                />
        )
     })	
  }
</ul>

//优化写法1
<ul>
 {this.getTodoItem()}
</ul>
getTodoItem() {
  return this.state.list.map((item, index) => {
        return (
                <TodoItem  
                  content={item} 
                  index={index}
                  deleteItem={this.handleItemDelete.bind(this)}
                />
        )
     })	
}

handleItemDelete(index) {

}
```

```
// 子组件
// src/TodoItem.js

import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
     super(props);
     this.handleClick = this.handleClick.bind(this);
  }

  render() {
  	 //写法1
  	 //return <div onClick={this.handleClick}>{this.props.content}</div>
  	 
  	 //优化写法1
  	 const { content } = this.props;
  	 return <div onClick={this.handleClick}>{content}</div>
  }
  
  handleClick() {
  	//写法1
    //this.props.deleteItem(this.props.index)
    
    //优化写法1
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }
}
```

```
// src/TodoItem.js
import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <div onClick={this.handleDelete}>. {this.props.content}</div>
    )
  }

  handleDelete(e) {
      this.props.delete(this.props.index);
  }
}

export default TodoItem;
```

### constructor里改变函数this指向

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
<script>
// 函数
function say () {
  console.log(this)
}
say = say.bind({a:1})
say()

// 类
class Person {
  constructor(name) {
    this.name = name

    this.say = this.say.bind({a:1})
  }

  say() {
    console.log(this)
  }
}

new Person('张三').say()
</script>
</html>
```



### 定义参数类型、默认值(类似vue中props)

[api英文]: https://reactjs.org/docs/typechecking-with-proptypes.html
[api中文]: https://react.docschina.org/docs/typechecking-with-proptypes.html

PropTypes 与 DefaultProps

**类型：**

```
// src/TodoItem.js

import React, { Component } from 'react';
// 1
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <div onClick={this.handleDelete}>. {this.props.content}</div>
    )
  }

  handleDelete(e) {
      this.props.delete(this.props.index);
  }
}
// 2
//强校验
TodoItem.propTypes = {
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number
};

export default TodoItem;

```

**必传：**isRequired

```
TodoItem.propTypes = {
	content: PropTypes.string.isRequired
}
```

**默认值：**defaultProps

```
TodoItem.defaultProps = {
	content: 'hello world'
}
```



### 无状态组件

- 使用场景

  当一个普通组件只有render函数时，就可以用无状态组件替换

  当一个普通组件只有render函数时

  ```
  // 当我们组件只有render时，就可以用无状态组件
  import React, { Component } from "react";
  import { Input, Button, List } from "antd";
  
  class TodoListUi extends Component {
    render() {
      return (
        <div className="todolist">
          <div className="todolist__hd">
            <Input
              size="default"
              placeholder="large size"
              value={this.props.inputValue}
              onChange={this.props.changeInput}
            />
            <Button type="primary" onClick={this.props.submitInput}>
              提交
            </Button>
          </div>
          <List
            header={<div>Header</div>}
            bordered
            dataSource={this.props.list}
            renderItem={(item, index) => (
              <List.Item onClick={this.props.handleDeleteItem} data-index={index}>
                {item}
              </List.Item>
            )}
          />
        </div>
      );
    }
  }
  export default TodoListUi;
  ```

  就可以用无状态组件替换

  ```
  // 无状态组件定义
  const TodoListUi = props => {
    return (
      <div className="todolist">
        <div className="todolist__hd">
          <Input
            size="default"
            placeholder="large size"
            value={props.inputValue}
            onChange={props.changeInput}
          />
          <Button type="primary" onClick={props.submitInput}>
            提交
          </Button>
        </div>
        <List
          header={<div>Header</div>}
          bordered
          dataSource={props.list}
          renderItem={(item, index) => (
            <List.Item onClick={props.handleDeleteItem} data-index={index}>
              {item}
            </List.Item>
          )}
        />
      </div>
    );
  };
  export default TodoListUi;
  ```

- 优点

  1）性能比较高。因为他就是一个函数。

  





## jsx

React中最基础的JSX语法，在js中写的html语法叫JSX（不需要字符串拼接）；

JSX语法中，**如果我们要使用自己创建的组件，开头必须是大写**

```
//1 处
import App from './App';
//2 处
ReactDom.render(<app />, document.getElementById('root'));
```



**如何在JSX的语法里编写注释**：注释只为了方便开发，在浏览器中不会显示在任何地方

```
render() {
   return (
      <Fragment>
         <div>
           {/*多行注释：下面是一个input框*/}
           <input />
           {
             //单行注释：下面是一个button
           }
           <button />
         </div>
      </Fragment>
   
   )
}
```



**如何在JSX的语法中使用样式：**用className替换class

```
// src/style.css
.input{
  border: 1px solid red;
}
```

```
// src/TodoList.js

import React, { Component, Fragment } from 'react';
import './style.css';

render() {
   return (
      <Fragment>
         <div>
           <input className="input" />
           <button />
         </div>
      </Fragment>
   
   )
}
```



**JSX中<label for="userName"></label>**

由于for和react中的for 循环同一意思，所以for要避免歧义改为

<label htmlFor="userName"></label>



**不占位包裹标签**：1.由于vue和react定义组件的时候，必须是包裹标签2. for循环时使用

| React      | import React, {Component, Fragment} from 'react';   <Fragment></Fragment> |
| ---------- | ------------------------------------------------------------ |
| Vue        | <template></template>                                        |
| 微信小程序 | <block></block>                                              |

> **当组件的state或者 props发生改变的时候，render函数就会重新执行**



## 模板语法

1. state 负责存储组件里的数据

2. JSX里想要用组件里的数据用{}对表达式进行包裹  value={this.state.inputValue}

3. 大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `dangerouslySetInnerHTML={{__html: item}}` 

4. 事件绑定的时候用bind(this)，对this进行变更，否则是undefined；

   onChange={this.handleInputChange.bind(this)}

4. 如果你想改变组件里的数据，不能直接去改；要通过setState去改；

   this.setState({inputValue: e.target.value})
   



## 条件渲染

> 元素变量

```
render() {
	let show = this.state.show;
	let txt = '';
	if (show) {
		txt = <div>A计划</div>
	} else {
		txt = <div>B计划</div>
	}
	
	return (
		<div>
			<h1>标题</h1>
			{txt}
		</div>
	)
	
}
```



> 与运算符&& 

```

```



## 列表

https://react.docschina.org/docs/lists-and-keys.html



## 更新数据

如果你想改变组件里的数据，不能直接去改；要通过setState去改；

### 基本数据类型

```
//写法1
this.setState({inputValue: e.target.value})

//react推荐写法1
this.setState(() => {
	return {
	  inputValue: e.target.value
	}
})

//react推荐写法1简写
const value = e.target.value;
this.setState((prevState) => （{
	  inputValue: value
  })
)
```

### 数组

- 增加

  ```
  constructor(props) {
  	state: {
  	  list: ['hi', 'hello']
  	}
  } 
  
  addArr() {
  	this.setState({
  	  list: [...this.state.list, 'world']
  	})
  }
  
  deleteArrByIndex(index) {
    const list = [...this.state.list];
    list.splice(index, 1);
    
    this.setState({
       list
    })
  }
  ```

  不能下面的这种写法：直接操作数据

  ```
  this.state.list.splice(index, 1);
  ```

  也不能下面这种写法：先操作完了再设置一遍

  ```
  this.state.list.splice(index, 1);
  
  this.setState({
     list:  this.state.list
  });
  ```

**总结：**react中有一个概念immutable：state 不允许我们做任何的改变，可以操作副本之后设置



## 列表渲染

用.map

```
<ul>
  {
     this.state.list.map((item, index) => {
        return <li>{item}</li>
     })	
  }
</ul>
```

### 维护状态

你需要为每项提供一个唯一 `key` 属性

```
//写法1
<ul>
  {
     this.state.list.map((item, index) => {
        return <li key={index}>{item}</li>
     })	
  }
</ul>

//优化写法1
```



### 



## Props,State与render函数

当Props，State一旦发生变化，render函数就执行。可验证



## 虚拟DOM

> 如果没有react 怎么实现数据变化页面变化

1. state 数据
2. JSX模板
3. 数据 + 模板 结合，生成真实DOM，来显示
4. state 发生改变
5. 数据 + 模板结合，生成真实DOM，替换原始DOM

缺陷：

	1. 第一次生成了一个完整的DOM片段
 	2. 第二次生成了一个完整DOM片段
 	3. 第二次替换第一次DOM，非常耗性能

改进：

1. state 数据
2. JSX模板
3. 数据 + 模板 结合，生成真实DOM，来显示
4. state 发生改变
5. 数据 + 模板 结合，生成真实DOM，并不直接替换原始DOM
6. 新的DOM  （DocumentFragment）和 原始DOM 做比对，找差异
7. 找出新的DOM(发生变化的DOM)元素，替换掉老的DOM中的元素



## setState

是异步的



# 高级

## 1. ref

[ref](https://react.docschina.org/docs/refs-and-the-dom.html)

```
render() {
	return (
		<div class="title" ref={(div)=>{this.title = div}}>hello</div>
	)
}

handleClick() {
	let dom = this.title
}
```



## 2. 生命周期

### 定义

指在某一时刻组件会自动调用的函数。

### 注意

所有的生命周期函数都可以没有，唯独render生命周期函数必须要有；

为什么？

原因：因为组件是继承自Component, react 的Component内置了其他所有的生命周期，唯独没有render



### 介绍

![](E:\self\记录\myNotes\rn\react_2.png)

#### Mounting(挂载即组件第一次被放到页面)

##### 1 componentWillMount()

- 执行场景
  - 在组件即将被挂载到页面的时刻，自动执行（还没挂载）
  - 在`render()`方法之前
- 解释
  - 1 因为componentWillMount是在render之前执行，所以在这个方法中`setState`不会发生重新渲染(re-render);
  - 2 这是服务端渲染(`server render`)中唯一调用的钩子(hook);
  - 3 通常情况下，推荐用`constructor()`方法代替;

##### 2 render()

- 执行场景
  - 1 在`componentWillMount()`方法之后
  - 2 在`componentWillReceive(nextProps, nextState)`方法之后
- 解释
  - ==

##### 3 componentDidMount()

- 执行场景
  - 在组件被挂载到页面之后，自动被执行
  - 在`render()`方法之后
- 解释
  - 1 这个方法会在render()之后立即执行；
  - 2 这里可以对DOM进行操作，这个函数之后ref变成实际的DOM(@TODO 表述可能不清晰);
  - 3 这里可以加载服务器数据，并且如果使用了redux之类的数据服务，这里可以出发加载服务器数据的action;
  - 4 这里可以使用`setState()`方法触发`重新渲染(re-render)`;



#### Updation(更新)

##### 4 `componentWillReceiveProps(nextProps)`

- 执行场景
  - 执行条件：1）从父组件接收参数 2）只要父组件的render函数被**重新**执行了，子组件的这个生命周期函数就会被执行；如果这个组件第一次存在于父组件中，不会执行；如果这个组件之前已经存在于父组件中，才会执行
  - 在已经挂在的组件(mounted component)接收到新props时触发;
  - 简单的说是在除了第一次生命周期(componentWillMount -> render -> componentDidMount)之后的生命周期中出发;
- 解释
  - 1 如果你需要在`props`发生变化(或者说新传入的props)来更新`state`，你可能需要比较`this.props`和`nextProps`, 然后使用`this.setState()`方法来改变`this.state`;
- 注意
  - 1 React可能会在porps传入时即使没有发生改变的时候也发生重新渲染, 所以如果你想自己处理改变，请确保比较props当前值和下一次值; 这可能造成组件重新渲染;
  - 2 如果你只是调用`this.setState()`而不是从外部传入`props`, 那么不会触发`componentWillReceiveProps(nextProps)`函数；这就意味着: `this.setState()`方法不会触发`componentWillReceiveProps()`, `props`的改变或者`props`没有改变才会触发这个方法;

##### 5 `shouldComponentUpdate(nextProps, nextState)`

- 执行场景

  - 在组件被更新之前
  - 在接收到新`props`或`state`时，或者说在`componentWillReceiveProps(nextProps)`后触发

- 解释

  - 在接收新的`props`或`state`时确定是否发生重新渲染，默认情况返回`true`，表示会发生重新渲染

- 注意

  - 1 这个方法在首次渲染时或者`forceUpdate()`时不会触发;

  - 2 这个方法如果返回`false`, 那么`props`或`state`发生改变的时候会阻止子组件发生重新渲染;

  - 3 目前，如果`shouldComponentUpdate(nextProps, nextState)`返回`false`, 那么`componentWillUpdate(nextProps, nextState)`, `render()`, `componentDidUpdate()`都不会被触发;

  - 4 `Take care`: 在未来，React可能把`shouldComponentUpdate()`当做一个小提示(hint)而不是一个指令(strict directive)，并且它返回`false`仍然可能触发组件重新渲染(re-render);

    ```
    shouldComponentUpdate() {
    	return true
    }
    ```

    

- Good Idea

  - 在React 15.3以后, `React.PureComponent`已经支持使用，个人推荐，它代替了(或者说合并了)`pure-render-mixin`，实现了`shallowCompare()`。[扩展阅读](http://www.zcfy.cc/article/why-and-how-to-use-purecomponent-in-react-js-60devs-2344.html)

##### 6 `componentWillUpdate(nextProps, nextState)`

- 执行场景
  - 组件被更新之前，它会自动执行，但是他在shouldComponentUpdate之后被执行；如果shouldComponentUpdate返回false，这个函数就不会执行
  - 在`props`或`state`发生改变或者`shouldComponentUpdate(nextProps, nextState)`触发后, 在`render()`之前
- 解释
  - 1 这个方法在组件初始化时不会被调用;
- 注意
  - 1 **千万不要在这个函数中调用this.setState()方法.**;
  - 2 如果确实需要响应`props`的改变，那么你可以在`componentWillReceiveProps(nextProps)`中做响应操作;
  - 3 如果`shouldComponentUpdate(nextProps, nextState)`返回`false`，那么`componentWillUpdate()`不会被触发;

##### 7 `componentDidUpdate(prevProps, prevState)`

- 执行场景

  - 组件更新完成之后，自动执行
  - 在发生更新或`componentWillUpdate(nextProps, nextState)`后

- 解释

  - 1 该方法不会再组件初始化时触发;
  - 2 使用这个方法可以对组件中的DOM进行操作;
  - 3 只要你比较了`this.props`和`nextProps`，你想要发出网络请求(nextwork requests)时就可以发出, 当然你也可以不发出网络请求;

- 注意

  - 如果`shouldComponentUpdate(nextProps, nextState)`返回`false`, 那么`componentDidUpdate(prevProps, prevState)`不会被触发;

    

#### unMounting

##### 8 `componentWillUnmount()`

- 执行场景
  - 在组件卸载(unmounted)或销毁(destroyed)之前
- 解释
  - 这个方法可以让你处理一些必要的清理操作，比如无效的timers、interval，或者取消网络请求，或者清理任何在`componentDidMount()`中创建的DOM元素(elements);



### 调用

#### 1 组件初始化

- 原因
  - `组件第一次建立`
- 触发
  - componentWillMount -> render -> componentDidMount

#### 2 组件更新 – props change

- 原因
  - `props`发生改变
- 触发
  - componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> componentDidUpdate

#### 3 组件更新 – state change

- 原因
  - `this.setState()`使`state`发生改变
- 触发
  - shoudlComponentUpdate -> componentWillUpdate -> componentDidUpdate

#### 4 组件卸载或销毁

- 原因
  - `组件卸载或销毁`
- 触发
  - componentWillUnmount



### 使用场景

#### 1. 优化：父组件重新执行render, 子组件的(props无论是否改变)也重新执行了render

优化：props发生变化时，子组件重新执行；反之，不执行

```
shouldComponentUpdate(nextProps, nextState) {
    // content是传递给子组件的属性
	if (nexProps.content !== this.props.content) {
		return true;
	} else {
	    return false;
	}
}
```

#### 2. 使用：react中发ajax请求

```
componentDidMount () {
	this.ajax().then((res) => {
		result = res;
	})
}
```



## 3. 动画

- css实现过渡动画

- animation动画

- 第三方插件动画 [react-transition-group](https://github.com/reactjs/react-transition-group) [文档](https://reactcommunity.org/react-transition-group/)

  [代码](https://codesandbox.io/s/react-jpv5f)

```
// 安装
npm install react-transition-group --save
```



# react高阶组件

# react-dnd

[react-dnd 用法详解](https://juejin.im/post/5c92e7fc6fb9a070e5529322)

[官方案例翻译](https://juejin.im/post/5aebbdedf265da0ba469a56f)

# 开发中其他第三方模块

## ajax请求

axios

```
// 安装
yarn add axios
// 代码使用
import axios from 'axios';
// react生命周期中使用
componentDidMount() {
    axios.get('/api/todulist')
    	 .then((res) => {
    	 	alert('succ')
    	 })
    	 .catch(() => {
    	 	alert('error')
    	 })
}
```



# redux

redux = reducer + flux(过时)



## 安装

```
npm install --save react-redux
yarn add react-redux
```



## 基本流程

![](E:\self\myNotes\rn\redux_1.png)

> action creators

```
store.dispatch
store.getState
sotre.subscribe
```



> store

图书馆管理员

```
createStore(reducers)
```



> reducers

记录本



## 设计原则

- store是惟一的
- 只有store能改变自己的内容
- reducer必须是纯函数（纯函数：给定固定的输入【state、action值固定】，就一定会有固定的输出【返回的值肯定是state、action里的值 不会有其他值】，而且不会有任何副作用【不会修改state、action】）



[代码：todolist](https://codesandbox.io/s/react-jpv5f?fontsize=14)

[api](https://github.com/reduxjs/redux)



## redux中间件

【redux中间件】一定是A 和B的中间件，A是什么，B是什么

### 1. redux-thunk

#### 安装

```
npm install --save redux-thunk
yarn add redux-thunk
```

#### 使用

```
// 引入 applyMiddleware
import { createStore, applyMiddleware } from 'redux';
// 引入 redux
import thunk from 'redux-thunk';
```

[api](https://github.com/reduxjs/redux-thunk)

### 



### 2. redux-logger

[api](https://github.com/LogRocket/redux-logger)

### 3. redux-saga

可以完全替代redux-thunk

[api](https://github.com/superRaytin/redux-saga-in-chinese)





# dva

基于 [redux](https://github.com/reactjs/redux)、[redux-saga](https://github.com/redux-saga/redux-saga) 和 [react-router](https://github.com/ReactTraining/react-router) 的轻量级前端框架。







## mock

[ api ](https://umijs.org/zh/guide/app-structure.html#mock)



# 调试工具

- chrome浏览器react developer tools


- chrome浏览器Redux DevTools

  [配置](https://github.com/zalmoxisus/redux-devtools-extension#installation)



# 参考

《React16.4开发简书项目 从零基础入门到实战》



# 项目

## mock数据

fiddler模拟ajax数据

![](E:\self\mahongluRecord\notes\rn\react_3.png)