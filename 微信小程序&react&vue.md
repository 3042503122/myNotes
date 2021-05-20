# 	视图层

## 微信小程序

```
<text class="ordergroup__name">{{computed.getTeamType(content.teamType)}}</text>
<wxs module="computed">
    module.exports = {
        getTeamType: function(type) {
            //团类型，2 今日团购 0秒杀团
            var team = '';
            switch (type) {
                case 0:
                    team = '秒杀团';
                    break;
                case 2:
                    team = '今日团购';
                    break;
                default:
                    team = '';
                    break;
            } 
            return team;
        }
    }
</wxs>
```

### 包装元素(不会在页面中做任何渲染)

```
<block></block>
```



##  vue

### 声明、条件、循环

{{}}或者属性值里是data、computed、props、methods里值，其他不行

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
      <img v-if="isImg(todo.name)" :src="m.url" alt="" preview>
      {{ todo.text }}
    </li>
 </ol>
 
  methods: {
    isImg: function(name) {
      return isImg(name);
    },
  }
```

### Class 与 Style

### 表单(数据双向绑定)

### 事件处理



### 插槽slot

### 包装元素(不会在页面中做任何渲染)

```
<template v-if="ok"></template>
```



## antdpro(react)

### 声明、条件、循环

{}里只要是变量、函数都可以。this.state.*  this.props.* 或者其他任何导入的函数

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

### 包装元素(不会在页面中做任何渲染)

```
<></>
```



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
import { router } from 'umi';
// 跳转页面-命令式 1）router.config.js里边的path 2）相对路径
const id = 123;
// 方1：
history.push(`./edit/${id}`);
// 方2: 
router.push(`/management/session/dataDetail`)
// 获取路由参数
this.props.match.params
```



# 组件

## vue

### props

### 自定义事件(父子组件相互调用方法)

#### 子组件调用父组件

```
//  父组件
<template>
<blog-post
  ...
  v-on:enlarge-text="doSomething"
></blog-post>
</template>
<script>
export default {
    data(){
        return{
          postFontSize: 10
        }
    },
    methods: {
      doSomething(step) {
        this.postFontSize += step
      }
    }
}
</script>
<style lang="scss" scoped>
</style>

```

```
// 子组件
<template>
<button v-on:click="">
  Enlarge text
</button>
</template>
<script>
export default {
    data(){
        return{}
    },
    methods: {
      enlarge() {
        this.$emit('enlarge-text',1)
      }
    }
}
</script>
<style lang="scss" scoped>
</style>
```



### 插槽slot

### 

## antdpro(react)

### props

### 自定义事件(父子组件相互调用方法)

#### 子组件调用父组件

```
//  父组件

```

```
//  子组件
```

 hook

```
//父组件
let Father=()=>{
    let getInfo=()=>{
        
    }
    return ()=>{
        <div>
            <Children 
                getInfo={getInfo}
            />
        </div>
    }
}
//子组件
let Children=(param)=>{
    return ()=>{
        <div>
            <span onClick={param.getInfo}>调用父组件函数</span>
        </div>
    }
}
```



#### 父组件调用子组件

```
// 父组件

// 子组件
(typeof getValue === 'function') && getValue(submit);

```

hook

```
//父组件
//需要引入useRef
import {useRef} from 'react'
let Father=()=>{
    const childRef=useRef();
    let onClick=()=>{
        childRef.current.getInfo();
    }
    return ()=>{
        <div>
            <Children 
                ref={childRef}
            />
            <span onClick={onClick}>调用子组件函数</span>
        </div>
    }
}
//子组件 
//需要引入useImperativeHandle,forwardRef
import {useImperativeHandle,forwardRef} from 'react'
let Children=(ref)=>{
    useImperativeHandle(ref, () => ({
        getInfo:()=>{
            //需要处理的数据
        }
    }))
    return ()=>{
        <div></div>
    }
}
Children = forwardRef(Children);
```



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

