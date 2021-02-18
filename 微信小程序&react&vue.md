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

```
// 跳转页面-命令式
this.$router.push({
        name: "verifyDetail",
        params: { applicantNumber, taskType, status},
        query: { applicantNumber, taskType, status}
});
// 获取路由参数
this.$route.query
```



## antdpro(react)

### state

### 生命周期

### 路由

```
// router.config.js
{
  path: '/v2/session_manage/session/edit/:id',
  name: 'edit', // 修改任务
  component: './SessionManage/Session/edit',
}
```



```
import { history } from 'umi';
// 跳转页面-命令式
const id = 123;
history.push(`./edit/${id}`);
// 获取路由参数
this.props.match.params
```



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

### stores

#### actions

#### modules

```
// verify.js
import {
  getListData
} from '../../api/verify';

export default {
  namespaced: true,
  
  state: {
    WorkTaskKey: {},
  },
  getters,
  actions: {
    [ActionTypes.GET_SHOW_WORK_TASK]: async (context, params) => {
    let res = await getShowWorkTask(params);
    if (res.status === 200 && res.data) {
      context.commit(ActionTypes.GET_SHOW_WORK_TASK, {
        info: res.data.FlowForm,
        ...params
      });
      context.commit(ActionTypes.SET_DATA_DETAIL, params);
    }
    },
  },
  mutations:{
      [ActionTypes.SET_DATA_DETAIL]: (state, data) => {
        debugger;
        state.WorkTaskKey = data;
      },
  }
}
```

### view

```
// verify.vue
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("verify");

export default {
  data() {
    return {
      ProcessID: null
    };
  },
  computed: {
    ...mapState({
      otherAttachmentList: state => state.showWorkTask.otherAttachmentList,
    }),
    ...mapGetters(["workListCount", "finishListCount"]),
  },
  methods: {
    ...mapActions({
      getShowWorkTask: 'GET_SHOW_WORK_TASK'
    }),
    ...mapMutations({
      emptySearchUserList: ActionTypes.EMPTY_USER_SEARCH_LIST
    }),
  },
  mounted () {
    this.emptySearchUserList();
    this.getShowWorkTask();
  }, 
}
</script>
```



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

