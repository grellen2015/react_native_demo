import axios from 'axios';
import {BASE_URL, TIMEOUT} from './config';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

//请求拦截处理
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

//返回拦截处理
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.log('请求错误');
          break;
        default:
          break;
      }
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default instance;

// export const Net = async (api, params) => {
//   return new Promise((resolve, reject) => {
//     instance
//       .post(api, params)
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };
//使用方法
// import {Net} from '../../common/request';

// componentDidMount() {
    // Net('user/editUser', { userId: '123456', name: 'basil' })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
//   }

// const axios = require('axios');

// // 请求具有给定ID的用户
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// // 可选的，上面的请求也可以这样写
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// // 使用异步方法
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
