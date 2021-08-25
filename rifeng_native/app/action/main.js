import Axios from '../util/axios/Axios';
import Toast from '../component/toast';

/**
 * 获取app列表
 * @param params
 * @returns {Promise<any | never>}
 */
const getAppList = params => {

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
    getAppList,
};
