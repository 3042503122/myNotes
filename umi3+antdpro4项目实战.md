[表情选择](https://www.process.st/emoji-in-business-documents/)

# 前言

使用umi2和antd pro4从零实现后台管理系统

<img src="E:\self\记录\myWork\images\umi_2.png" style="zoom: 50%;" />

# ✨技术栈

**前端： TS 、 React、React Hooks、 umi3、antd-pro5**

**后端: express、mongodb、jwt** **

# 🔗 链接

[umi首页](https://umijs.org/zh-CN/docs/getting-started)

[图标](https://juejin.cn/post/6844903857244340231)

# 🔨搭建项目

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

## 个性化项目

### 精简项目

无

### 区分环境

- publicPath

- 定义全局变量 - 接口地址

- 定义全局变量 - 最近更新时间

- 定义全局变量 - 点击header-logo跳转首页

背景：package.json => scripts

栗子👁️‍🗨️：区区购（前端和后端部署到）

<img src="E:\self\记录\myNotes\images\umi_4.png"  />

栗子👁️‍🗨️：火眼渠道端

<img src="E:\self\记录\myNotes\images\umi_6.png"  />

栗子👁️‍🗨️：火眼运营端

<img src="E:\self\记录\myNotes\images\umi_7.png"  />

### 线上彩蛋方便定位问题

![](E:\self\记录\myNotes\images\umi_5.png)

```
UPDATE_TIME: moment().format('YYYY-MM-DD HH:mm:ss')
<h1><Popover placement="bottom" content={<div style={{fontSize: 12}}>最后更新：{UPDATE_TIME}</div>}>{title}</Popover></h1>
```



### 路由router.config.js

#### 普通路由

config.js

```
import routes from './router.config';
export default {
...
routes,
...
}
```

```
// router.config.js
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



#### 权限路由

##### 原理

- 官方栗子：点击登录=>dispatch`login/login` =>`fakeAccountLogin:返回用户角色admin|user` <= `login/login 中触发reduers中 setAuthority(payload.currentAuthority)`

  注意：除了返回用户角色字符串"admin" 也可以返回菜单权限数组[1, 2, 3]

  ![](E:\self\记录\myNotes\images\umi_8.png)

  ![](E:\self\记录\myNotes\images\umi_9.png)

  



### 登录

#### 内网访问

```
// http-p.js
case 401:
          //未登录
          location.href =
            'https://ssa.jd.com/sso/login?returnUrl=' + encodeURIComponent(location.href);
          err.message = codeMessage['401'];
          break;
```

#### 外网访问

```
// http-p.js
case 401:
          //未登录
          location.href = '//passport.jd.com/new/login.aspx?ReturnUrl=' + encodeURIComponent(location.href);
          err.message = codeMessage['401'];
          break;
```

### 主题

[ 官网 ](https://v2-pro.ant.design/index-cn)

![](E:\self\记录\myNotes\rn\react_4.png)

![](E:\self\记录\myNotes\rn\react_5.png)

<img src="E:\self\记录\myNotes\rn\react_6.png" style="zoom: 67%;" />



# 🐱第1次添加业务界面

有无欢迎页面：(即输入win.jd.com 回车=>自动跳转win.jd.com/welcome)

## 有欢迎页面

欢迎页

- 未登录时，欢迎页面里的接口不要被封装的公共请求拦截（拦截到会自动跳转到登录页）

## 无欢迎页面

# 🐱第2,...次添加业务界面

## 新建路由

router.config.js

```
      {
        path: '/v2/session_manage',
        redirect: '/v2/session_manage/settle/list',
      },
      {
        path: '/v2/session_manage/settle',
        redirect: '/v2/session_manage/settle/list',
      },
      {
        path: '/v2/session_manage',
        name: 'sessionManage', //任务中心
        icon: 'thunderbolt',
        routes: [
          {
            path: '/v2/session_manage/settle',
            name: 'settle', //结算记录
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/v2/session_manage/settle/list',
                name: 'list', // 结算记录
                component: './SessionManage/Settle/list',
              },
              {
                path: '/v2/session_manage/settle/detail/:id',
                name: 'detail', // 结算详情
                component: './SessionManage/Settle/detail',
              },
            ],
          },
        ],
      }
```

## 菜单设置

src/locales/zh-CN\menu.js

```
  'menu.shopownerManage.settle': '佣金结算记录',
  'menu.shopownerManage.settle.list': '列表',
  'menu.shopownerManage.settle.detail': '结算详情',
```

## 新建页面

src/pages/settle

## 新建services

src/models/settle.js

```
import request from '@/utils/http-p';
import qs from 'qs';

//结算列表
export async function getList(data) {
  return request({
    url: '/missionSettle/missionSettlementList',
    method: 'POST',
    body: data,
  });
}

//详情
export async function getDetailRecord(data) {
  return request({
    url: '/missionSettle/missionSettlementDetail',
    body: data
  });
}

//详情列表
export async function getDetailList(data) {
  return request({
    url: '/missionSettle/missionSettlementDetailRecord',
    body: data
  });
}
```



## 新建models

src/services/settle.js

```
import { 
	getList,
	getDetailList,
	getDetailRecord,
} from '@/services/settle.js';
import { message } from 'antd';

export default {
  namespace: 'settle',

  state: {
        // 结算列表
		code: '',
		regionId: '',
		list: {
			pageNo: 1,
			pageSize: 10,
			result: [],
			total: 0,
		},
		listLoading: false,

		// 结算详情
		detailList: [],
		detailListLoading: false,
		detailRecord: [],
		detailRecordLoading: {}
  },

  effects: {
    * getList({
			data
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showListLoading',
			});
			const response = yield call(getList, data);
			if (response.code === 200) {
				yield put({
					type: 'getListSuccess',
					data: response.data,
					filter: data,
				});
			} else {
				message.error(response.message);
				yield put({
					type: 'getListFailure',
				});
			}
		},
		* getDetailRecord({
			data
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showDetailRecordLoading',
			});
			const response = yield call(getDetailRecord, data);
			if (response.code === 200) {
				yield put({
					type: 'detailRecordSuccess',
					data: response.data.result,
					filter: data,
				});
			} else {
				message.error(response.message);
				yield put({
					type: 'detailRecordFailure',
				});
			}
		},
		* getDetailList({
			data
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showDetailListLoading',
			});
			const response = yield call(getDetailList, data);
			if (response.code === 200) {
				yield put({
					type: 'detailListSuccess',
					data: response.data.result,
					filter: data,
				});
			} else {
				message.error(response.message);
				yield put({
					type: 'detailListFailure',
				});
			}
		},
  },

  reducers: {
		showListLoading(state, action) {
			return {
				...state,
				listLoading: true,
			};
		},
		getListSuccess(state, action) {
			return {
				...state,
				listLoading: false,
				list: action.data
			};
		},
		getListFailure(state, action) {
			return {
				...state,
				listLoading: false,
				list: {},
			};
		},
		showDetailListLoading(state, action) {
			return {
				...state,
				detailListLoading: true,
			};
		},
		detailListSuccess(state, action) {
			return {
				...state,
				detailListLoading: false,
				detailList: action.data
			};
		},
		detailListFailure(state, action) {
			return {
				...state,
				detailListLoading: false,
				detailList: [],
			};
		},
		showDetailRecordLoading(state, action) {
			return {
				...state,
				detailRecordLoading: true,
			};
		},
		detailRecordSuccess(state, action) {
			return {
				...state,
				detailRecordLoading: false,
				detailRecord: action.data
			};
		},
		detailRecordFailure(state, action) {
			return {
				...state,
				detailRecordLoading: false,
				detailRecord: [],
			};
		},
  }
}
```



# 🌚 FAQ

# 🚀代码片段

## 带后端校验的Input

```
{getFieldDecorator('planName', {
							initialValue: this.props.type != 'new' ? this.props.record.planName : undefined,
							validateTrigger: 'onBlur',
							rules: [{
								required: true,
								message: '请输入'
							}, {
								max: 20,
								message: '最多支持输入20个字'
							}, {
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
							}]
						})(
							<Input placeholder="最多支持输入20个字" disabled={edit || view} />
						)}
```

