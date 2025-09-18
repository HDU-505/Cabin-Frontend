	 // http.js封装axios的请求方式(get请求、post请求) 
	 // 封装axios超时请求时间
	 // token设置
	
	
     import axios from 'axios' // 引用axios
     import config from '@/api/config'
     
     var _baseUrl = 'http://localhost:8888'
     const apiUrl = _baseUrl
     // axios 配置
     axios.defaults.timeout = 120000 // 设置接口响应时间
    //  axios.defaults.baseURL = '/api' // 这是调用数据接口,公共接口url+调用接口名
    axios.defaults.baseURL = apiUrl
     
     
     
     // 封装get请求
     export function get (url, params = {}, hearder = {}) {
       return new Promise((resolve, reject) => {
         axios
           .get(url, {
             params: params,
             hearder: hearder
           })
           .then(response => {
             resolve(response)
           })
           .catch(err => {
             reject(err)
           })
       })
     }
     // 封装post请求
     export function post (url, data = {}, hearder = {}) {
       return new Promise((resolve, reject) => {
         axios.post(url, data, hearder).then(
           response => {
             // console.log(response.data.code)
             resolve(response.data)
           },
           err => {
             reject(err)
           }
         )
       })
     }
 