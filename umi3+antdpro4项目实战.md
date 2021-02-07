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

### 主题

[ 官网 ](https://v2-pro.ant.design/index-cn)

![](E:\self\记录\myNotes\rn\react_4.png)

![](E:\self\记录\myNotes\rn\react_5.png)

<img src="E:\self\记录\myNotes\rn\react_6.png" style="zoom: 67%;" />



### router.config.js

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

```

# 🐱添加业务界面

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

