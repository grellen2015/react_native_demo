import Axios from '../util/axios/Axios';
import Toast from '../component/toast';

/**
 * 用户登录
 * @param params {loginId, passWord}
 * @returns {Promise<any | never>}
 */
const userLogin = params => {

  console.log(params);
  return Axios.POST('/Server.svc/api/invoke', params)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};
module.exports = {
  userLogin,
};
