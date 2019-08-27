# 背景

微信小程序   =>   taro  =>  react native 

# react native 样式书写

![1548296147654](C:\Users\mahonglu\AppData\Roaming\Typora\typora-user-images\1548296147654.png)

- 样式选择器仅支持**类选择器** ,且不支持 **组合器**

- 必须采用 Flex 布局

  

  # react native支持的样式

  > 参考：https://nervjs.github.io/taro/docs/before-dev-remind.html

  

  # 转taro时报错，修改的样式

  > box-shadow不支持

  > transform

  ```
  [{perspective: number}, {rotate: string}, {rotateX: string}, {rotateY: string}, {rotateZ: string}, {scale: number}, {scaleX: number}, {scaleY: number}, {translateX: number}, {translateY: number}, {skewX: string}, {skewY: string}]
  ```

  最常用的：不定宽（定宽）元素水平居中解决方案不能使用，由于{translateX: number}

  ```
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
  ```

  

  

  > border、border-left、border-right、border-top、border-bottom不支持

  原因：border-style不支持单边框，只能borderStyle方式设置

  解决： 

  ```
  border: 1px solid #ccc; 
  改为
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  
  ```

  ```
  border-left: 1px solide #ccc; 
  改为
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: #ccc;
  ```

  > border-style 仅支持 solid`, `dotted`, `dashed

  > line-height:  只支持<number>

  > background不支持，仅支持background-color: <color>

  > border-radius：<number>、padding: <number>、margin: <number>

  > font-family不支持自定义字体，所以iconfont不支持

  > box-sizing不支持

  > vertical-align:  `auto`, `top`, `bottom`, `center`(原middle)

  > overflow: `visible`, `hidden`, `scroll`，不支持overflow-x、overflow-y

  > white-space 不支持

  > word-break 不支持

  > text-indent 不支持

  > font-weight 仅支持 `normal`, `bold``100~900`，但阉割了 `bolder, lighter` 取值

  > animation 不支持

  > float 不支持

  > transition 不支持