# 视图层

##  vue

### 声明、条件、循环

```
// 声明
<div id="app">
  {{ message }}
</div>

// 条件
<p v-if="seen">现在你看到我了</p>

// 循环
<ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
 </ol>
```

### Class 与 Style

### 表单(数据双向绑定)

### 事件处理



## antdpro(react)

### 声明、条件、循环

```
// 声明
<div id="app">
  { message }
</div>

// 条件，单行：下面；多行:是 seen && ()
{seen && <p>现在你看到我了</p>}

// 循环
<ol>
    {
    todos.map(todo => (
    <li>
      {{ todo.text }}
    </li>
    ))
    
    }
 </ol>
```

Classname 与 Style

### 表单(数据双向绑定)

### 事件处理

### 插槽slot



# 组件实例

## vue

### data

```
// 定义
data() {
    return {
      processID: ''
    };
},

// get-js
this.processID
// get-html
{{processID}}

// set
this.processID = '123'
```

### 生命周期

### 路由

## antdpro(react)

### state

### 生命周期

### 路由



# 组件

## vue

### props

### 插槽slot

### 

## antdpro(react)

### props

### 插槽slot



# 状态管理

## vue

### api

```
// verify.js
import axios from 'axios';
axios.defaults.withCredentials = true;

export const getShowWorkTask = (params) => {
  return axios.get(`${verifyApi}/approve/apply/detail`, {
    params
  })
}
```

### models

## antdpro(react)

### services

```
// session.js
import request from '@/utils/http-p';

import {
  serializeObject
} from '@/utils/utils';

// 任务列表
export async function getList(params) {
  return request({
    url: '/cshopmission/listMission',
    method: 'GET',
    body: params
  });
}
```

### models

```
// session.js
import { 
	getList
} from '../services/session.js';
import { message } from 'antd';

export default {
  namespace: 'session',

  state: {
    // 任务列表
    listLoading: false,
    list: {
			pageNo: 1,
			pageSize: 10,
			result: [],
			total: 0,
		}
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
					data: response.data
				});
			} else {
				message.error(response.message);
				yield put({
					type: 'getListFailure',
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
  }
}
```

## pages

```
// session.js
@connect(({session}) => ({
  loading: session.listLoading,
  list: session.list
}))
export default class SessionList extends PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'session/getList',
      data: param,
    });
  }
  
  render() {
     // this.props.loading
     // this.props.list
  }
}
```

