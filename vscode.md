# 	常用插件

## 参考

- [VS Code 折腾记 - (15) 再来一波大前端适用系列的插件(主打编码体验改善)](https://juejin.im/post/5c356b106fb9a049ef26c368)



## 工具系列





## 编码体验改善系列



### Turbo Console Log

console.log工具

```
// 选中变量
ctrl + alt + L
```



### ★★★★★vscode-icons

vscode树形项目管理中文件的图标



###  ★★★★★ koroFileHeader 

vscode中用于生成文件头部注释和函数注释的插件

**文件头部添加注释**: ctrl + alt + i

**在光标处添加函数注释**: ctrl + alt + t

###  ★★★★★ES7 React/Redux/GraphQL/React-Native snippets

<https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets>



**Basic Methods**

|  Prefix | Method                                              |
| ------: | --------------------------------------------------- |
|  `imp→` | `import moduleName from 'module'`                   |
|  `imn→` | `import 'module'`                                   |
|  `imd→` | `import { destructuredModule } from 'module'`       |
|  `ime→` | `import * as alias from 'module'`                   |
|  `ima→` | `import { originalName as aliasName} from 'module'` |
|  `exp→` | `export default moduleName`                         |
|  `exd→` | `export { destructuredModule } from 'module'`       |
|  `exa→` | `export { originalName as aliasName} from 'module'` |
|  `enf→` | `export const functionName = (params) => { }`       |
|  `edf→` | `export default (params) => { }`                    |
|  `met→` | `methodName = (params) => { }`                      |
|  `fre→` | `arrayName.forEach(element => { }`                  |
|  `fof→` | `for(let itemName of objectName { }`                |
|  `fin→` | `for(let itemName in objectName { }`                |
| `anfn→` | `(params) => { }`                                   |
|  `nfn→` | `const functionName = (params) => { }`              |
|  `dob→` | `const {propName} = objectToDescruct`               |
|  `dar→` | `const [propName] = arrayToDescruct`                |
|  `sti→` | `setInterval(() => { }, intervalTime`               |
|  `sto→` | `setTimeout(() => { }, delayTime`                   |
| `prom→` | `return new Promise((resolve, reject) => { }`       |
| `cmmb→` | `comment block`                                     |
|   `cp→` | `const { } = this.props`                            |
|   `cs→` | `const { } = this.state`                            |

**React**

|      Prefix | Method                                                       |
| ----------: | ------------------------------------------------------------ |
|      `imr→` | `import React from 'react'`                                  |
|     `imrd→` | `import ReactDOM from 'react-dom'`                           |
|     `imrc→` | `import React, { Component } from 'react'`                   |
|    `imrcp→` | `import React, { Component } from 'react' & import PropTypes from 'prop-types'` |
|    `imrpc→` | `import React, { PureComponent } from 'react'`               |
|   `imrpcp→` | `import React, { PureComponent } from 'react' & import PropTypes from 'prop-types'` |
|     `imrm→` | `import React, { memo } from 'react'`                        |
|    `imrmp→` | `import React, { memo } from 'react' & import PropTypes from 'prop-types'` |
|     `impt→` | `import PropTypes from 'prop-types'`                         |
|     `imrr→` | `import { BrowserRouter as Router, Route, Link } from 'react-router-dom'` |
|    `redux→` | `import { connect } from 'react-redux'`                      |
|   `rconst→` | `constructor(props) with this.state`                         |
|    `rconc→` | `constructor(props, context) with this.state`                |
|      `est→` | `this.state = { }`                                           |
|      `cwm→` | `componentWillMount = () => { }` DEPRECATED!!!               |
|      `cdm→` | `componentDidMount = () => { }`                              |
|      `cwr→` | `componentWillReceiveProps = (nextProps) => { }` DEPRECATED!!! |
|      `scu→` | `shouldComponentUpdate = (nextProps, nextState) => { }`      |
|     `cwup→` | `componentWillUpdate = (nextProps, nextState) => { }` DEPRECATED!!! |
|     `cdup→` | `componentDidUpdate = (prevProps, prevState) => { }`         |
|     `cwun→` | `componentWillUnmount = () => { }`                           |
|    `gdsfp→` | `static getDerivedStateFromProps(nextProps, prevState) { }`  |
|     `gsbu→` | `getSnapshotBeforeUpdate = (prevProps, prevState) => { }`    |
|      `ren→` | `render() { return( ) }`                                     |
|      `sst→` | `this.setState({ })`                                         |
|      `ssf→` | `this.setState((state, props) => return { })`                |
|    `props→` | `this.props.propName`                                        |
|    `state→` | `this.state.stateName`                                       |
| `rcontext→` | `const ${1:contextName} = React.createContext()`             |
|     `cref→` | `this.${1:refName}Ref = React.createRef()`                   |
|     `fref→` | `const ref = React.createRef()`                              |
|      `bnd→` | `this.methodName = this.methodName.bind(this)`               |



### ★★★Bracket Pair Colorizer

括号不同颜色匹配，方便看，允许使用颜色标识匹配的括号，当你拥有深层嵌套的对象和函数时，这个插件就会变的非常有用

###  ★★★indent-rainbow

代码缩进方便阅读

![](E:\self\mahongluRecord\notes\images\vscode_1.jpg)



### ★★★★★Chinese (Simplified) Language Pack for Visual Studio Code>

VS Code 的中文（简体）语言包



### ESLint



### ★★★color-highlight

#f00 rgba(0, 0, 0, .5)  rgb(0,0,0) 会显示任何颜色代码的直观表示



## Vue系列

### vetur

写vue代码

[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### Vusion Peek

快速查看自定义组件内容，以及快速跳转组件

[Vusion Peek](https://marketplace.visualstudio.com/items?itemName=lingximu.vusion-peek)



## React系列

### React PropTypes Generate

[React PropTypes Generate](https://link.juejin.im/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dsuming.react-proptypes-generate) : 一键生成`react`的`proptypes` , 不用`ts`的小伙伴必备



## React Native系列

### React Native Tools

代码提示、Debugging、集成RN的命令。



## 协作系列

### VS Live Share Whiteboard

Live Share` 画板支持,这下子不仅代码能协作,思路也能演示了

[VS Live Share Whiteboard](https://link.juejin.im/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dlostintangent.vsls-whiteboard) : `

### VS Live Share

代码协作,会使用上面这个插件的小伙伴,肯定也会用这个插件

[VS Live Share](https://link.juejin.im/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DMS-vsliveshare.vsliveshare) 