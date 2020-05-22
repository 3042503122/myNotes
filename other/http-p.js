import router from 'umi/router';
import axios from 'axios';
import { message } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '未登录或登录已过期，请重新登录',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求地址出错： ',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '抱歉，服务器出错了。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
};


// 拦截重复请求(即当前正在进行的相同请求)
const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}


axios.defaults.withCredentials = true; //允许携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.crossDomain = true;

axios.interceptors.request.use(
  config => {
    let data = JSON.stringify(config.data);
    if (config.headers && config.headers['Content-Type']){
      if (/x-www-form-urlencoded/.test(config.headers['Content-Type'])){
        data = config.data;
      }
    }
    config.data = data;
    config.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      ...config.headers,
      'X-Requested-With': 'XMLHttpRequest',
    };

    // 拦截重复请求(即当前正在进行的相同请求)
    let requestData = getRequestIdentify(config, true)
    removePending(requestData, true)
    config.cancelToken = new CancelToken((c) => {
      pending[requestData] = c
    })

    return config;
  },
  error => {
    console.log('request error------->', error);
    return Promise.reject(error);
  }
);

let loading = document.querySelector('#global_loading');

//响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    console.log('response interceptor------>', response);
    if (response.status === false) {
      return Promise.reject({
        message: '对不起，您暂时无权限',
      });
    }

    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  err => {
    console.log('interceptors error------>', err, err.response, err && err.response);

    if (err.message.includes('timeout')) {
      message.error('网络超时');
    }

    if (err && err.response) {
      switch (err.response.status) {
        case 401:
          //未登录
          location.href =
            'https://ssa.jd.com/sso/login?returnUrl=' + encodeURIComponent(location.href);
          err.message = codeMessage['401'];
          break;
        case 403:
          router.push('/v2/exception/403');
          return Promise.reject(codeMessage['403']);
          err.message = codeMessage['403'];
          break;
        case 404:
        case 405:
        case 408:
        case 422:
          router.push('/v2/exception/404');
          err.message = `${codeMessage['404']}${err.response.config.url}`;
          break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          router.push('/v2/exception/500');
          err.message = codeMessage['500'];
          break;
        default:
      }
    }
    return Promise.reject(err);
  }
);

export default function request({ url, body = {}, method = 'GET', options = {} }) {
  const data = method === 'GET' ? { params: body } : { data: body };
  console.log('----request-------->', body, { url, method, data });

  loading.style.display = 'block';
  return axios({ url, method, ...data, ...options })
    .then(res => {
      loading.style.display = 'none';
      console.log('request result--->', res);
      return res.data;
    })
    .catch(err => {
      loading.style.display = 'none';
      console.log('request err--->', err);
      return err;
    });
}
