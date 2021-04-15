# 请求

## has been blocked by CORS policy

### 跨域：Access-Control-Allow-Origin

![](E:\self\记录\myNotes\images\cors_1.png)

后端解决：

方法1：ngix服务器配置

```
if ($request_method = 'OPTIONS') {
add_header 'Access-Control-Allow-Origin' "http://test.imqianduan.com"; 
add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS'; 
add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'; 
add_header 'Access-Control-Allow-Credentials' true;
add_header 'Access-Control-Max-Age' 86400;
return 200; 
}
```

方法2：后端代码解决 to 锁锁

```
package com.jd.brand.approve.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author caojianqi
 * @date 2019/01/29 11:31
 */
@Configuration
public class SpringMVCConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("跨域注册成功。。。。。。。");
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
                .maxAge(3600)
                .allowCredentials(true);
    }

}
```

### 跨域：Access-Control-Allow-Methods

原因：预请求OPTIONS后端没有做处理

上述后端代码加上同样解决这个问题。

![](E:\self\记录\myNotes\images\cors_2.png)



# content-type

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

- 小程序

![](E:\self\记录\myNotes\images\post_2.png)



### get

无content-type

参数：Query String parameters

![](E:\self\记录\myNotes\images\get.png)





# 最佳实践

## multipart/form-data

其实没有必要传headers / content-type ，因为axios是根据body传值类型来自动设置headers / content-type

```
	let bodyFormData = new FormData();
	for (let [key, value] of Object.entries(data)) {
		if (value != undefined && value != '') {
			bodyFormData.set(key, value);
		}
	}
request({
    url,
    method: 'POST',
    body: formData
  });
```

## application/x-www-form-urlencoded

安装qs

```
npm install --save qs;
```



```
import qs from 'qs';
request({
    url: `${url}?${qs.stringify(params)}`,
    method: 'POST'
  });
```

# 导出excel

## get + Query Parameters String =》 文件流

**a标签link或者当成link**

****

```
let params = {id: 123};
window.open(`${winDomain}/jdmanager/fusion/approve/downloadList?${qs.stringify(params)}`);
```

![](E:\self\记录\myNotes\images\downloadexcel_1.png)

## 

## post + x-www-form-urlencoded(请求实体) =》文件流

**表单提交方式**

```
downLoadExcel({
        url: `${rtaDomain}/rta/rtaAdvertSeat/downloadList`,
        method: 'post',
        data: {id: 123}
});

export function downLoadExcel(options, selfOpen = false){
  var config = Object.assign({ method: 'post' }, options);

  var iframeDom = document.createElement('iframe');
  iframeDom.id = 'down-file-iframe';

  var formDom = document.createElement('form');
  formDom.target = 'down-file-iframe';
  formDom.method = config.method;
  formDom.action = config.url;

  for (var key in config.data) {
    var inputDom = document.createElement('input');
    inputDom.type = 'hidden';
    inputDom.name = key;
    inputDom.value = config.data[key];
    inputDom.type = 'hidden';
    formDom.appendChild(inputDom);
  }
  debugger
  iframeDom.appendChild(formDom);

  document.body.appendChild(iframeDom);

  formDom.submit();

  iframeDom.remove();
}
```

![](E:\self\记录\myNotes\images\downloadexcel_2.png)

## post + application/json(请求实体) =》京东云url

```
        const result = await this.props.dispatch({
            type: 'overview/downloadOneDayTableDetail',
            params
        })
        if (result && result.code == 200) {
            window.open(result.data);
        } else {
            message.error((result && result.retMessage) || 'T+1下载接口异常！')
        }
```

```
        *downloadOneDayTableDetail({ params }, { call }) {
            const response = yield call(downloadOneDayTableDetail, params);
            return response;
        },
```

```
// T+1列表明细下载接口
export async function downloadOneDayTableDetail(params) {
    return request('/api/history/downloadHistoryList', {
        method: 'post',
        data: params
    });
}
```

![](E:\self\记录\myNotes\images\downloadexcel_3.png)