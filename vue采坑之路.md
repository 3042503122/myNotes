# Vue中使用debounce遇到的坑

[Vue中使用debounce遇到的坑](https://www.jianshu.com/p/d5de1c077105)

```
// 正确示例

//  加载到vue原型链上的lodash在method函数后的定义的地方取不到，重新引了一遍
import _ from 'lodash'
export default {
    methods: {  
      // 加载到原型链上的lodash，在getRemote后取不到
       // 注意，这里debounce中的第一个参数，不能写成箭头函数，否则，取不到this
      getRemote: _.debounce(function () {
        console.log('此处向后台发起请求:', this.searchText)
      }, 1000),
      search () {
        this.getRemote()
      }
    }
}
```

