# 搭建项目

## 快速开始(umi2)

### 创建项目

```
// 安装脚手架
$ npm install create-umi -g
// 创建项目
$ create-umi
// 安装依赖
cnpm install
```

如何选择gitbash里对应的项？选择第一项 键入1 + 回车

![](E:\self\记录\myNotes\images\umi2_1.png)

![](E:\self\记录\myNotes\images\umi2_2.png)

*Do you need all the blocks or a simple scaffold?* 

[all the blocks]所有的ant.pro页面(即官网上https://preview.pro.ant.design/dashboard所有的)，可以进行学习

[simple]简单的的登录页，这里可以进行antd版本配置 ,即老项目都使用的这个

### 启动项目

```
npm run start
```



## 快速开始(umi3)

[官网](https://umijs.org/zh-CN/docs/getting-started)

### 创建项目

 node 版本是 10.13 或以上

先找个地方建个空目录，在该目录下执行下命令

```
// 创建项目
yarn create @umijs/umi-app
// 安装依赖
yarn
```

### 启动项目

```
yarn start
```

### 修改配置

如果项目的配置不复杂，推荐在 `.umirc.ts` 中写配置； 如果项目的配置比较复杂，可以将配置写在 `config/config.ts` 中，并把配置的一部分拆分出去，比如路由配置可以拆分成单独的 `routes.ts`

// 编辑 `.umirc.ts` 配置 `layout: {}`

```
import { defineConfig } from 'umi';
export default defineConfig({
+ layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
```



## 个性化项目

### package.json

### 配置（config/config.js）

[官网](https://umijs.org/zh-CN/config)

### 路由

->config/config.js routes

[页面跳转2种方式：声明式、命令式|编程式-通过全局、命令式|编程式-通过属性](https://umijs.org/zh-CN/docs/navigate-between-pages)

### 主题

[ 官网 ](https://v2-pro.ant.design/index-cn)

![](E:\self\记录\myNotes\rn\react_4.png)

![](E:\self\记录\myNotes\rn\react_5.png)

<img src="E:\self\记录\myNotes\rn\react_6.png" style="zoom: 67%;" />



### 样式

[官网](https://pro.ant.design/docs/style-cn)

- 全局样式

  src / global.less

- 页面级别 - css module

  ```
  export default class AddPurchaseDialog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        loading: false, // 提交时loading
      };
    }
  
  
    render() {
      const { loading } = this.state;
      const {
        form: { getFieldDecorator, getFieldValue },
        popShops,
      } = this.props;
  
      return (
        <div className={styles.bottomSubmit}>
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.onOK}
                  style={styles.btnMargin}
                >
                  确认
                </Button>
                <Button onClick={this.onClose}>取消</Button>
              </div>
      );
    }
  }
  import styles from './index.less';
  
  ```

  ```
  // index.less
  .bottomSubmit{
  	display: flex;
  	justify-content: flex-start;
  }
  .btnMargin{
  	margin-right: 10px;
  }
  ```

  样式文件默认使用 [CSS Modules](https://www.ruanyifeng.com/blog/2016/06/css_modules.html)，如果需要，你可以在样式文件的头部引入 [antd 样式变量文件](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)：

  ```css
  @import '~antd/lib/style/themes/default.less';
  ```

  这样可以很方便地获取 antd 样式变量并在你的文件里使用，有利于保持页面的一致性，也方便实现定制主题。

  有时候希望在页面样式里使用全局样式，这样引入该less的文件以及文件内引入的子组件、孙组件......能不需要引入该less就能使用该className

  ```
  .title {
    color: @heading-color;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  /* 定义多个全局样式 */
  :global {
    .footer {
      color: #ccc;
    }
    .sider {
      background: #ebebeb;
    }
  }
  ```

  

- 页面级别 - 行内

   ```
     export default class AddPurchaseDialog extends Component {
       constructor(props) {
         super(props);
       this.state = {
           visible: false,
         loading: false, // 提交时loading
         };
     }
     
     
       render() {
       const { loading } = this.state;
         const {
           form: { getFieldDecorator, getFieldValue },
           popShops,
         } = this.props;
     
         return (
           <div style={styles.bottomSubmit}>
                   <Button
                     key="submit"
                     type="primary"
                     loading={loading}
                     onClick={this.onOK}
                     style={styles.btnMargin}
                   >
                     确认
                   </Button>
                   <Button onClick={this.onClose}>取消</Button>
                 </div>
         );
       }
     }
     const styles = {
       bottomSubmit: {
         display: 'flex',
         justifyContent: 'flex-end',
         margin: '24px -24px -14px',
         borderTop: '1px solid #e8e8e8',
         paddingTop: '10px',
         paddingRight: '24px',
       },
       btnMargin: {
         marginRight: '10px',
       },
       inlineFormItem: { display: 'inline-block', width: 'calc(50% - 12px)' },
       breakLine: { display: 'inline-block', width: '24px', textAlign: 'center', marginLeft: '-10px' },
     };
     
   ```

     

### 请求 

1. 安装axios，此应该在 -> 项目搭建 > 个性化项目 > package.json中安装了

2. src / utils / http-p.js : 封装axios

   copy myNotes / other / http-p.js

3. src / service / x.js: 按模块集合

   ```
   import request from '@/utils/http-p';
   
   // get请求
   export async function getPlans(params) {
     return request({
       url: '/cshopmission/planList',
       body: params
     });
   }
   
   // post请求
   export async function calcEndTime(params) {
     return request({
       url: '/cshopmission/calcMissionEndTime',
       method: 'POST',
       body: params,
       options: {
         responseType: 'json',
         headers: {
           'Content-Type': 'application/json;charset=UTF-8',
         },
       },
     });
   }
   ```

4. src / models / x.js: 引入service/x.js并使用  



### mock数据



## 最佳实践新增页面

### 路由

- step1: src/pages/xxx.jsx

  ![](E:\self\记录\myNotes\rn\react_7.png)

  文件夹结构pages

  ├── 404.js
  ├── ActivityManage
  ├── Authorized.js
  ├── Category
  ├── document.ejs
  ├── Exception
  ├── LaunchManage
  ├── MaterialManage
  ├── PlanManage
  ├── Report
  └── ShopManage

  Report文件夹

  ├── DailyDetail
  |  ├── components
  |  |  ├── DailyDetailDialog.js
  |  |  ├── DailyDetailSearchFilter.js
  |  |  └── DailyDetailTable.js
  |  └── index.js
  ├── DailySummary
  |  ├── components
  |  |  ├── DailySummarySearchFilter.js
  |  |  └── DailySummaryTable.js
  |  └── index.js
  ├── index.less
  ├── Purchase
  |  ├── components
  |  |  ├── AddPurchaseDialog.js
  |  |  ├── PurchaseSearchFilter.js
  |  |  └── PurchaseTable.js
  |  ├── index.js
  |  └── index_cp.js
  ├── Transport
  |  ├── components
  |  |  ├── AddTransportDialog.js
  |  |  ├── TransportSearchFilter.js
  |  |  └── TransportTable.js
  |  └── index.js
  └── Verification
     ├── components
     |  ├── AddVerficationDialog.js
     |  ├── VerficationSearchFilter.js
     |  └── VerficationTable.js
     └── index.js

  

- step2: config/config.js 或者是 router.config.js中新增路由

  **左侧导航顺序 ，由此项决定**

- step3: src/locales/zh-CN.js -> menu.js 中 新增

  ```
  'menu.testadd': '测试新增页面'
  ```





# umi(脚手架)

## FAQ

- `yarn create umi `command failed

这个问题基本上都是因为没有添加 yarn global module 的路径到 PATH 环境变量引起的。

先执行 `yarn global bin` 拿到路径，然后添加到 PATH 环境变量里。

```
$ yarn global bin
/usr/local/bin
```

你也可以尝试用 npm，

```
$ npm create umi
```

或者手动安装 create-umi，并执行他，

```
$ npm install create-umi -g
$ create-umi
```

## config/config.js

`plugins` ：配置

`routes` : 配置

- `path`

- `name`

- `component`

- `icon`

- `redirect`

- `routes`

  [path ](https://v2-pro.ant.design/docs/layout-cn#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-ant-design-pro-%E5%B8%83%E5%B1%80)

   [path | name | icon | component | redirect | routes | hideInMenu |hideChildrenInMenu | authority](https://v2-pro.ant.design/docs/router-and-nav-cn#%E5%9C%A8%E8%8F%9C%E5%8D%95%E4%B8%AD%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9A%84-icon)

  [path | name | icon | component | redirect | routes | hideInMenu |hideChildrenInMenu | authority](https://v2-pro.ant.design/docs/router-and-nav-cn#%E8%B7%AF%E7%94%B1)

```
export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // 跳转外边链接
      {
        path: url + '/community/shop/manage',
        name: 'shopManager', //店长管理
        icon: 'team',
      },
       // 一级页面，无嵌套
      {
        path: '/v2/shop_manage',
        name: 'shopManage', //店铺组管理
        component: './ShopManage',
        icon: 'bank',
      },
      
      // 有二级菜单
      {
        path: '/v2/report',
        name: 'report',
        icon: 'bar-chart',
        routes: [
          {
            path: '/v2/report/daily_sales_summary',
            name: 'dailySalesSummary', //每日销售汇总
            component: './Report/DailySummary',
            icon: 'file-text',
          },
          {
            path: '/v2/report/daily_sales_detail',
            name: 'dailySalesDetail', //每日销售明细
            component: './Report/DailyDetail',
            icon: 'file-text',
          },
        ],
      },
      // 一级页面（无二级类目），单都是主页面点击嵌套页面
      {
        path: '/v2/plan_manage',
        redirect: '/v2/plan_manage/list',
      },
      {
        path: '/v2/plan_manage',
        name: 'planToday', //今日团购计划配置
        icon: 'tags',
        routes: [
          {
            path: '/v2/plan_manage/list',
            name: 'list', //计划列表
            component: './PlanManage/list',
            hideInMenu: true,
          },
          {
            path: '/v2/plan_manage/category/:id',
            name: 'category', //类目展示
            component: './PlanManage/categoryFloor',
            hideInMenu: true,
          }
          
        ],
      },
      {
        path: '/v2/exception/403',
        component: './Exception/403',
      },
      {
        path: '/v2/exception/500',
        component: './Exception/500',
      },
      {
        component: '404',
      },
    ],
  },
];

```

`treeShare` : true

`publicPath` : 配置

`disableRedirectHoist` : true

`hash` : false

`targets ` ：配置

`chainWebpack`：umi模板自动生成

`treeShaking ` : true

`theme`：配置

`define`：umi模板自动生成

`proxy`：配置。[配置参数说明](https://segmentfault.com/a/1190000016199721) [为什么proxy能解决跨域问题](https://www.jianshu.com/p/c978b29a8d88)

```
// 代理请求到其他服务器。访问 /api/users` 就能访问到 http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users) 的数据

// 写法1
proxy: [
    {
      context: [
        '/community',
        '/statistics',
        '/fresh',
        '/common',
        '/category',
        '/recommend',
        '/shop',
        '/resourceInfo',
        '/activePage',
        '/sku',
      ],
      target: 'http://beta-chunxiao.jd.com',
      changeOrigin: true,
    },
  ],
  
// 写法2
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}

"proxy": {
   '/api': {
       target: 'http://newbeta-fire-operate-soa.jd.com',
       changeOrigin: true,
    },
    '/packapi': {
       target: 'http://beta-cbuild.jd.com',
       changeOrigin: true,
    }
}
```

`mainfest`: umi模板自动生成



# ant-design-pro

[ api ](https://v2-pro.ant.design/index-cn)

## 定义

Ant Design Pro 是一套基于 React 技术栈的单页面应用



# dva

[api](https://dvajs.com/guide/introduce-class.html#目前最流行的数据流方案)



# 盲点

## 表单隐藏域

```
  .hiddenFormItem{
    padding: 0;
    margin: 0;
  }
  .hiddenFormItem .ant-form-item-children{
    display: none;
  }
```

```
        <FormItem className="hiddenFormItem">
          {getFieldDecorator('couponKeyList', {
            initialValue: couponList.reduce((o, el) => {
              o = o + ',' + el.key;
              return o;
            }, '').slice(1),
            rules: [
              {
                required: true,
                message: '请添加优惠券',
              },
            ],
          })(<Input />)}
```



## 起项目、打包发布项目

- 启动预发：使用预发接口 - `yarn start:no-mock` 使用mock`yarn start`
- 启动线上：`yarn start`
- 打包预发：`yarn build-beta `
- 打包线上：`yarn build`

## 获取带参数的路由中参数

在路由组件中，可以通过`this.props.match.params` 来获得路由参数。

- ```
  // 页面
  <Child params="{this.props.match.params}}"></Child>
  ```

  ```
  // 子组件：Child
  内部可以直接使用 this.props.params
  ```


## Table一个单元格中展示纵向多个字段

```
{
        title: '用户信息',
        dataIndex: 'pin',
        width: 200,
        render: (text, item) => {
          return (
            <Fragment>
              <div>PIN: {item.pin}</div>
              <div>unionId: {item.unionId}</div>
              <div>店铺名称: {getAttr(item.shopName)}</div>
              <div>手机号: {item.mobile}</div>
              <div>姓名: {item.accountName}</div>
              <div>微信名: {getWxName(item.wxUserInfo)}</div>
            </Fragment>
          )
        }
}
```

## 请求接口json错误返回(loading)html

疑惑：预发机器正常返回json，但是本地起的服务器返回(loading)html。例如`'/community/shop/list'`

解决：

```
// config\config.js 增加'/community',
proxy: [
    {
      context: [
        '/community',
        '/statistics',
        '/fresh',
        '/common',
        '/category',
        '/recommend',
        '/shop',
        '/resourceInfo',
        '/activePage',
        '/sku',
      ],
      target: 'http://beta-chunxiao.jd.com',
      changeOrigin: true,
    },
  ]
```



## 获取DatePicker值

```
if (values.startDate) {
	values.startDate = moment(values.startDate).format(formatDate);
}
```

## 测试账号导出

[功能项目](http://beta-chunxiao.jd.com/v2/shopowner_manage/index)



## onClick中传参，自动指向组件this

```
<Button type="link" onClick={() => this.handleOpenQualifications(record.id)}>查看资质</Button>
```

## antd中Modal.confirm js调用法

问题：

```
okButtonProps: {
  disabled: status == 1 && resetReasonChecked.length == 0
},
```

resetReasonChecked.length改变弹出disabled状态并没有更新

结局



## connect 和 @connect

[react dva 的 connect 与 @connect](https://www.jianshu.com/p/21224080326e)

[官网](https://dvajs.com/guide/introduce-class.html#connect-方法)

```
import { connect } from 'dva';

function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
```

写法1：

```
export default class BasicLayout extends React.PureComponent { // ...
}

export default connect(({ user, login, global = {}, loading }) => ({
    currentUser: user.currentUser,
    collapsed: global.collapsed,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices
}))(BasicLayout);
```

写法2：

```
@connect(({ user, login, global = {}, loading }) => ({
    currentUser: user.currentUser,
    collapsed: global.collapsed,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
    menuData: login.menuData,
    redirectData: login.redirectData,
}))

export default class BasicLayout extends React.PureComponent { // ...
}
```



## Table里面嵌套Popover

当Table里面嵌套的Popover的列是 fixed时， Popover不能手动控制(visible | onVisibleChange) 。

可以选择Popconfirm





## 组件通信

### 父  ->(调用) 子 方法

​       -> searc() {}

```
// 父组件
<Child refresh={getList => { this.getList=getList } } ></Child>

// 子组件
class Child extends PureComponent {
    constructor(props) {
       super(props);
       
       this.props.refresh(this.search);
    }
    
	search() {
		
	}
}
```



## 表单专题

### 知识概要

- 经过 `Form.create` 包装的组件将会自带 `this.props.form` 属性，`this.props.form` 提供的 API 如下： 

  注意：使用 `getFieldsValue` `getFieldValue` `setFieldsValue` 等时，应确保对应的 field 已经用 `getFieldDecorator` 注册过了。 

  ```
  class CustomizedForm extends React.Component {
  	render() {
  		this.props.form
  	}
  }
  
  CustomizedForm = Form.create({})(CustomizedForm);
  ```

  

  #### getFieldDecorator 

  经过 `getFieldDecorator` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

  1. 你**不再需要也不应该**用 `onChange` 来做同步，但还是可以继续监听 `onChange` 等事件。
  2. 你不能用控件的 `value` `defaultValue` 等属性来设置表单域的值，默认值可以用 `getFieldDecorator` 里的 `initialValue`。
  3. 你不应该用 `setState`，可以使用 `this.props.form.setFieldsValue` 来动态改变表单值。

  -  options.initialValue 

  - options.validateTrigger

    校验子节点值的时机

  -  options.rules 

    - 【错误提示】message 
  - 【是否必填】required: true | false
    - 【类型校验】type
    - `email`: Must be of type `email`.
      - `string`: Must be of type `string`. `This is the default type.`
      - `number`: Must be of type `number`.
      - `boolean`: Must be of type `boolean`.
      - `method`: Must be of type `function`.
      - `regexp`: Must be an instance of `RegExp` or a string that does not generate an exception when creating a new `RegExp`.
      - `integer`: Must be of type `number` and an integer.
      - `float`: Must be of type `number` and a floating point number.
      - `array`: Must be an array as determined by `Array.isArray`.
      - `object`: Must be of type `object` and not `Array.isArray`.
    - `enum`: Value must exist in the `enum`.
      - `date`: Value must be valid as determined by `Date`
      - `url`: Must be of type `url`.
      - `hex`: Must be of type `hex`.
    - 【正则表达式校验】pattern
    
  
  ​          手机号：` /^1[3-9][0-9]{9}$/`
  
    ​          数字：`/^[1-9][0-9]*$/`
  
    ​	       自然数：`/^0|([1-9][0-9]*)$/`0,1，..
  
    ​          skuId: `/^-?([1-9][0-9]*)(\.[0-9]*)?$/`
  
    ​          渠道号：`/^(\d|[a-z]|-|_)+$/` 不超过50个字符,必须为数字、英文、_、-的组合
  
    ​         APP名称: `/^[a-zA-Z0-9\u4e00-\u9fa5]+$/` 汉字、数字、英文字母
  
    ​          价格：正整数或浮点数小数点后最多保留2位`/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/`
  
    ​          不能包含特殊字符：`/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/`
  
    ​           [其他](https://juejin.im/post/5dccdd24f265da0c09156fb3?utm_source=gold_browser_extension)
  
    ​                                         
  
    - 【自定义规则】validator:  function(rule, value, callback) {  callback() }
    
      自定义校验（注意，[callback 必须被调用](https://github.com/ant-design/ant-design/issues/5155)） 
    
      // 请求校验
    
      ```
      {
      validator: (rule, value, callback)=>{
      	if (this.props.type != 'new'){
      		callback();
      		return null;
      	}
      	if (!value){
      		callback();
      	} else {
      		this.props.dispatch({
      			type: 'planManage/validPlanName',
      			param: {
      				planName: value
      			},
      			callback: res => {
      				if (res.code == 200){
      					callback();
      				} else {
      					callback(res.msg);
      				}
      			}
      		});
      	}
        }
      }
      ```
    
      // 和表单里的其他项比较
  
    ```
      {
      validator: (rule, value, callback) => {
        console.log('开始时间选择', moment(value).format(formatDate));
        if (!value) {
          callback();
        } else {
          if (value.isBefore(moment()) || value.isSame(moment())) {
            let endTime = getFieldValue('tmTimeEnd');
            if (!endTime) {
              callback();
            } else {
              console.log(
                '开始时间2222----',
                moment(value).format(formatDate),
                moment().format(formatDate)
              );
              if (endTime.isBefore(value)) {
                callback('开始时间不能大于结束时间');
              } else if (Math.abs(moment(value).diff(moment(endTime), 'days')) > MAX_DAYS_DISTANCE) {
              callback(`不可超过${MAX_DAYS_DISTANCE}天`);
              } else {
                callback();
              }
            }
          callback();
          } else {
          callback('不能大于当前时间');
          }
        }
      callback();
    },
    ```
  
      // 不能重复
        
      ```
    validator: (rule, value, callback) =>{
        if (!value) {
          callback();
          return null;
        }
        let repeat = false;
        for (let el of this.props.list) {
          if (el.categoryName == value) {
            repeat = true;
            break;
          }
        }
        if (repeat) {
          callback('类目名称不允许重名');
        } else {
          callback();
        }
      }
      ```
  
    - 【字符串长度】len
    
    - 【字符串最小长度】min
    
    - 【字符串最大长度】max
  
    ​          
  
    ​          
  
  ```
  <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                // 必填
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
                // email
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                
              ],
            })(<Input />)}
  </Form.Item>
  ```
  
  ```
    
    
  ```
  
  #### getFieldsValue 
  
  ```
  this.props.form.getFieldsValue(["code", "planName", "activeName", "regionId", "status"])
  ```
  
  
  
  #### resetFields 
  
  #### getFieldsError
  
  ```
  <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
  Log in
  </Button>
  
  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  ```



### 开发中理解

#### 为什么需求FormItem

- 因为校验结果红色提示文字位置：FormItem-wrapper -》FormItem - wrapper - 校验状态wrapper 下面包括


1)  表单元素 2）红色提示文字

- 一个提示FormItem里面 只允许一个getFieldDecorator，下例子允许

  ```
  <FormItem>
  	{
  		getFieldDecorator
  	}
  	<FormItem>
  		{
  		getFieldDecorator
          }
  	</FormItem>
  </FormItem>
  ```

  






### 一个formItem显示2项

```
             <Col {...colLayout}>
              <FormItem className="shopGroup" label="条件" {...formItemLayout}>
                <FormItem className="shopGroupSelect">
                  {getFieldDecorator('source', {
                    initialValue: Object.keys(sourceOptions)[0],
                  })(
                    <Select placeholder="请选择">
                      {Object.entries(sourceOptions).map(el => {
                        return (
                          <Option value={el[0]} key={el[0]}>
                            {el[1]}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </FormItem>
                <FormItem className="shopGroupInput">
                  {getFieldDecorator('pin', {
                    initialValue: this.props.pin || '',
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </FormItem>
            </Col>
      
      .shopGroup{
        .ant-form-item-children{
          display:flex;
          align-items: center;
        }
        .shopGroupSelect{
          margin-right: 10px;
        }
        .shopGroupInput{
          flex: 1;
        }
      }
```



### 团购时间：开始时间-结束时间(且只能选15天时间间隔)

> 难点：布局
>
> 难点：只能选15天时间间隔

```
import React, { Fragment } from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';
import { disabledCurrentDay } from '@/utils/utils';

const { Item: FormItem } = Form;

const formatDate = 'YYYY-MM-DD HH:mm:ss';

// 时间选择最大可选择时间范围
const MAX_DAYS_DISTANCE = 15;

export default ({ form: { getFieldDecorator, getFieldValue } }) => (
  <Fragment>
    <FormItem label="团购实际结束时间">
      <FormItem style={styles.inlineFormItem}>
        {getFieldDecorator('tmTimeStart', {
          rules: [
            {
              required: true,
              message: '请选择时间',
            },
            {
              validator: (rule, value, callback) => {
                console.log('开始时间选择', moment(value).format(formatDate));
                if (!value) {
                  callback();
                } else {
                  if (value.isBefore(moment()) || value.isSame(moment())) {
                    let endTime = getFieldValue('tmTimeEnd');
                    if (!endTime) {
                      callback();
                    } else {
                      console.log(
                        '开始时间2222----',
                        moment(value).format(formatDate),
                        moment().format(formatDate)
                      );
                      if (endTime.isBefore(value)) {
                        callback('开始时间不能大于结束时间');
                      } else if (Math.abs(moment(value).diff(moment(endTime), 'days')) > MAX_DAYS_DISTANCE) {
                        callback(`不可超过${MAX_DAYS_DISTANCE}天`);
                      } else {
                        callback();
                      }
                    }
                    callback();
                  } else {
                    callback('不能大于当前时间');
                  }
                }
                callback();
              },
            },
          ],
        })(<DatePicker placeholder="开始日期" format="YYYY-MM-DD HH:mm:ss" showTime />)}
      </FormItem>
      <span style={styles.breakLine}>～</span>
      <FormItem style={styles.inlineFormItem}>
        {getFieldDecorator('tmTimeEnd', {
          rules: [
            {
              required: true,
              message: '请选择时间',
            },
            {
              validator: (rule, value, callback) => {
                console.log('结束时间选择', moment(value).format(formatDate));
                if (!value) {
                  callback();
                } else {
                  console.log(
                    '结束时间2222----',
                    moment(value).format(formatDate),
                    moment().format(formatDate)
                  );
                  if (value.isBefore(moment()) || value.isSame(moment())) {
                    let beginTime = getFieldValue('tmTimeStart');
                    if (!beginTime) {
                      callback();
                    } else {
                      if (beginTime.isAfter(value)) {
                        callback('结束时间不能小于开始时间');
                      } else if (Math.abs(moment(value).diff(moment(beginTime), 'days')) > MAX_DAYS_DISTANCE) {
                        callback(`不可超过${MAX_DAYS_DISTANCE}天`);
                      } else {
                        callback();
                      }
                    }
                    callback();
                  } else {
                    callback('不能大于当前时间');
                  }
                }
              },
            },
          ],
        })(<DatePicker placeholder="结束日期" format="YYYY-MM-DD HH:mm:ss" showTime />)}
      </FormItem>
    </FormItem>
  </Fragment>
);

const styles = {
  inlineFormItem: { display: 'inline-block', width: 'calc(50% - 12px)' },
  breakLine: { display: 'inline-block', width: '24px', textAlign: 'center', marginLeft: '-10px' },
};

```



### 文件上传 : 二进制流 -> 京东云  京东云返回图片所在云上地址url  -> 后端接口

#### 图片



#### 文件

```
// 上传到
action=
// 上传非图片
"https://dlupload.jd.com/upload"

// 上传图片
"https://dlupload.jd.com/uploadimg"
```

```
// 表单取值
  getValue = () => {
    // if (this.props.config.couponList.length == 0) {
    //   reject('添加优惠券');
    // }
    return new Promise((resolve, reject) => {
      this.props.form.validateFields(['propagateUrl'], (error, values) => {
          let param = {};
          para.propagateUrl = `http://img11.360buyimg.com/dl/${
            JSON.parse(values.propagateUrl.pop().response.data).pop().msg
          }`
          resolve(para);
        } else {
          reject(error);
        }
      });
    });
  };
// dom项
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
<FormItem label="图片">
  {getFieldDecorator('propagateUrl', {
    valuePropName: 'fileList',
    getValueFromEvent: this.normFile,
    rules: [
      {
        required: true,
        message: '请上传',
      },
    ],
  })(
    <Upload.Dragger
      accept=".png,.PNG,.jpg,.JPG,.jpeg,.JPEG"
      listType="picture-card"
      action="https://dlupload.jd.com/uploadimg"
      showUploadList={false}
      beforeUpload={file => {
        if (file.type != 'image/png' && file.type != 'image/jpeg') {
          message.warn('请上传jpg或png格式文件');
          return false;
        }
        if (file.size > 200 * 1024) {
          message.warn('请上传小于200KB的图片文件');
          return false;
        }
        return true;
      }}
      onChange={info => {
        if (info.file.status === 'uploading') {
          this.setState({ propagateUrlLoading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.setState({
            propagateUrl: `http://img11.360buyimg.com/dl/${
              JSON.parse(info.file.response.data).pop().msg
            }`,
            propagateUrlLoading: false,
          });
        }
      }}
    >
      {propagateUrl ? (
        <img src={propagateUrl} alt="avatar" style={{ width: '80%' }} />
      ) : (
        <div>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">上传图片(支持拖拽)</p>
          <p className="ant-upload-hint">请上传jpg或png格式文件，大小不超过200KB。</p>
        </div>
      )}
    </Upload.Dragger>
  )}
</FormItem>  
  
```

```
// 编辑时回显

```



### 文件上传： 二进制流 -> 后端接口 后端接口返回线上地址

// 手动上传案例

// 易错点：content-type应该配置 application/x-www-form-urlencoded。当配置成multipart/form-data 时，请求入参无参数、content-type无boundary，且服务端报500

// 请求入参key名确定是后端接收的key名

![](E:\self\记录\myNotes\images\umi_1.png)

![](E:\self\记录\myNotes\images\umi_2.png)



```
  <Upload
              accept=".csv,.CSV"
              withCredentials={true}
              fileList={this.state.fileList}
              beforeUpload={file => {
                this.setState({
                  fileList: [file]
                })
                return false;
              }}
            >
              <Button type="primary" size="small">
                上传文件
              </Button>
              <span className="UploadTip">
                请上传.csv格式文件。
              </span>
            </Upload>
            // 上传
            <Button onClick={ () => this.handleOkAddByFileModal()}></Button>
            
  handleOkAddByFileModal() {
    const { fileList } = this.state;
    console.log("TCL: SkuInfoManage -> handleOkAddByFileModal -> fileList", fileList)
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });
    this.props.dispatch({
      type: 'skuInfoManage/updateLinePriceByFile',
      data: formData,
      callback: res=>{
        if (res.code == 200){
          this.setState({
            showAddByFileModal: false,
            showInfoModal: true
          })
        }
      }
    });
  }            
```

### 文件上传最佳实践

同一个弹窗组件record，即可以新增、也可以编辑（回显），

目前该组件问题：编辑首次打开，【上传】应该是【重新上传】，不知道为什么getFieldValue('uploadFile')获取不到第一次打开回显值

代码运行：`src\pages\packaging\components\record.jsx`

copy代码：`\myNotes\other\record.jsx`

<img src="E:\self\记录\myNotes\images\umi_3.png" style="zoom:80%;" />

## content-type

get请求不存在设置`content-type`。只有post和put用到`content-type`，常用的post方式，所以这里着重说post。
 post的content-type三种类型：

- Content-Type: application/json
   对于axios，post的时候`axios.post(url,{a:1,b:2})`，第二个参数是对象的时候，默认是这个类型

- Content-Type: application/x-www-form-urlencoded
   对于axios，post的时候`let data = {a:1,b:2}; axios.post(url,qs.stringify({ data }))`，第二个参数是字符串的时候，默认是这个类型

  **文件上传二进制流是此类型**

   - Content-Type: multipart/form-data
      对于axios，post的时候`let data = new FormData(); data.append('a',1'); data.append('b',2); axios.post(url,data)`，参数是formData类型的时候，默认是这个类型，如果用form自带的action提交，默认是这个类型

以上三种方式，服务器会以不同的方式解析，这点尤其注意！！！！！

- Content-Type:text/html

- Content-Type:text/plain

- Content-Type:text/css

- Content-Type:text/javascript

- Content-Type:application/xml

### post:  application/json 

- PC

  ![](E:\self\记录\myNotes\images\contentType_2.png)

- 小程序

![](E:\self\记录\myNotes\images\post_1.png)



### post: application/x-www-form-urlencoded

- PC

  ![](E:\self\记录\myNotes\images\contentType_1.png)

-   小程序

![](E:\self\记录\myNotes\images\post_2.png)



### get

无content-type

参数：Query String parameters

![](E:\self\记录\myNotes\images\get.png)



## static

- 旧写法

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

- 新写法

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

  

## state实例属性的新写法

[参考链接](http://es6.ruanyifeng.com/#docs/class#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7%E7%9A%84%E6%96%B0%E5%86%99%E6%B3%95)

 实例属性除了定义在`constructor()`方法里面的`this`上面，也可以定义在类的最顶层 

- 旧写法

  ```
  class IncreasingCounter {
    constructor() {
      this.state = {
         count:0
      };
    }
  }
  
  ```

  

- 新写法

  ```
  class IncreasingCounter {
    state = {
    	count: 0
    }
  }
  ```

   这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。 



```
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
```

 上面的代码，一眼就能看出，`foo`类有两个实例属性，一目了然。另外，写起来也比较简洁。 

外部添加实例属性

```
class foo {
  constructor() {
    // ...
  }
}

foo.prototype.bar = 'hello';
foo.prototype.baz = 'world';
```





## @：装饰器

api: 【es6 - > Decorator 装饰器】

[参考链接](http://es6.ruanyifeng.com/#docs/decorator)

- 旧写法

  ```
  import React, { Component, Fragment } from 'react';
  import { connect } from 'dva';
  
  class AddTransportDialog extends Component {
  }
  function mapStateToProps(state) {
    return {
      list: state.activityManage.skuDraftList,
      loading: state.activityManage.skuListLoading,
      updateLoading: state.activityManage.updateLoading,
      switchLoading: state.activityManage.switchLoading,
      switchId: state.activityManage.switchId,
      categoryList: state.activityManage.categoryList,
      saveLoading: state.activityManage.saveLoading,
      batchSaveData: state.activityManage.batchSaveData,
      updateRecommendLabelLoading: state.activityManage.updateRecommendLabelLoading,
      recommendSwitchId: state.activityManage.recommendSwitchId,
      skuInfo: state.activityManage.skuInfo
    };
  }
  export default connect(mapStateToProps)(Form.create()(AddTransportDialog))
  ```

- 新写法

  ```
  import React, { Component, Fragment } from 'react';
  import { connect } from 'dva';
  
  
  @connect(({ sales }) => ({
    sales,
  }))
  @Form.create()
  
  export default class AddTransportDialog extends Component {
  }
  ```



## React Context

[参考链接](https://www.jianshu.com/p/eba2b76b290b)



## 超过出…悬浮出tooltip



- Tooltip

  ```
  return text.length >= 10 ? (
              <Tooltip placement="top" title={text}>
                {text.slice(0, 12)}...
              </Tooltip>
            ) : (
              text
            );
  ```

- Popover

  ```
  let limitCount = 8;
              if (text.length > limitCount) {
                return (
                  <Popover content={text}>
                    <span style={{ cursor: 'pointer' }}>{text.substring(0, limitCount)}...</span>
                  </Popover>
                );
              } else {
                return text;
              }
  ```

  

## table  Popover编辑

```
render: (text, record)=>{
  return (<span>
    ¥{text}
    <Popover
      trigger="click"
      visible={this.state[`lineprice_${record.skuId}`]}
      overlayClassName="TablePopover"
      title="修改划线价"
      content={<div>
            <FormItem>
              {getFieldDecorator(`edit_lineprice_${record.skuId}`, {
                initialValue: text || '',
                rules: [{
                  required: true,
                  message: '请输入'
                }],
              })(
                <InputNumber className="skuInfoManage__inpNumber" size="small" min={0} placeholder="请输入"></InputNumber >
              )}
            </FormItem>
            <div className="PopoverBtnBlock">
              <Button loading={this.props.updateLoading} size="small" type="primary" onClick={() => this.updateLinePrice(record.skuId)}>确定</Button>
            </div>
          </div>}
      onVisibleChange={visible =>
        this.handleVisibleChange(`lineprice_${record.skuId}`, visible)
      }
    >
      <Icon className="TableIcon" type="edit" />
    </Popover>
  </span>)
}

  handleVisibleChange(type, visible) {
    this.setState({
      [type]: visible,
    });
  }
  
  updateLinePrice(skuId) {
  let key = `edit_lineprice_${skuId}`;
  this.props.form.validateFields([key], (error, values)=>{
    if (!error){
      let linePrice = values[key]
      
      this.props.dispatch({
        type: 'skuInfoManage/updateLinePrice',
        data:{
          linePrice,
          skuId
        },
        callback: res=>{
          if (res.code == 200){
            this.handleVisibleChange(`lineprice_${skuId}`, false);
            this.search(this.props.list.pageNo);
          }
        }
      });

      
    }
  })
}
```




# FAQ

## 无法提交代码

报错：

解决：

项目中.git文件夹中：如果没有说明是隐藏文件，设置显示隐藏文件

删除`\.git\hooks\pre-commit`