/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect, useRef } from 'react';
import { FlatList, RefreshControl, SafeAreaView, ActivityIndicator, StyleSheet, Text, Alert, TouchableOpacity, View , Platform} from 'react-native';
import px2dp from '../util/DisplayUtil';
import { useSelector, useDispatch } from 'react-redux';
import appListAction from '../action/main';
import { ListView } from '@ant-design/react-native';
import AppListItem from '../component/AppListItem';
import Constants from '../constant/constants';
import { EasyLoading, Loading } from '../component/EsayLoading';
import {
  USER_TOKEN,
  USER_INFO,
  USER_INSTALL_APP_LIST,
} from '../redux/action/userActionTypes';
import RNFS from 'react-native-fs';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';

export default function AppList(props) {

  const dispatch = useDispatch();
  const [appList, setAppList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [refreshing, setRefreshing] = useState(true);


  const { userToken, userInfo, installList } = useSelector(state => ({
    userToken: state.UserReducer.userToken,
    userInfo: state.UserReducer.userInfo,
    installList: state.UserReducer.installList,
  }));
  useEffect(() => {
    // Global navigation for not in router pages
    global.navigation = props.navigation;
    onStartRefresh();
  }, []);


  function onStartRefresh() {
    try {
      setRefreshing(true);
      const contextParam = {
        InvOrgId: '8010',
        Ticket: userToken === null ? '' : userToken,
      };
      const parameters = [{
        'Value': '3.0',
      }, {
        'Value': '1.0',
      }];

      const params = {
        ApiType: 'AppsMenuController',
        Context: contextParam,
        Method: 'GetAppsByCategoryId',
        Parameters: parameters,

      };
      console.log(params);
      appListAction.getAppList(params).then(resp => {
        console.log(resp);
        setAppList(resp.Result);
        resp.Result.forEach((item, index, self) => {
          
          resp.Result[index].install = false;
          installList.forEach((installItem, retindex, retself) => {
            if(installItem.appId === item.appId){
              resp.Result[index].install = true;
             
            }
          });
        });

        setAppList(resp.Result);
       
        setRefreshing(false);


      });
    } catch (err) {
      //abortFetch(); //manually stop the refresh or pagination if it encounters network error
      setRefreshing(false);
    }
  }

  let renderItem = ({ item }) => (
    <AppListItem item={item} itemClick={() => { clickEvent(item); }} />
  );





  function downloadH5File(srcPath, destPath, fileName) {

    EasyLoading.show();
    console.log("srcPath:" + srcPath);
    console.log("destPath:" + destPath);
    const options = {
      fromUrl: srcPath,
      toFile: destPath + "/" + fileName,
      background: true,
      begin: res => {
        console.log('begin', res);
        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
      },
      progress: res => {
        //let pro = res.bytesWritten / res.contentLength;

        // this.setState({
        //   progressNum: pro,
        // });
      },
    };
    try {

      const ret = RNFS.downloadFile(options);
      ret.promise
        .then(res => {

          console.log('success', res);

          unzipH5File(destPath, fileName);
          console.log('file://' + destPath);
          // EasyLoading.dismiss();//关闭
        })
        .catch(err => {
          console.log('err:', err);
          alert('err' + err);
          EasyLoading.dismiss();//关闭
        });
    } catch (e) {
      console.log(error);
      EasyLoading.dismiss();//关闭
    }
  }

  function unzipH5File(path, zipFile) {
    const sourcePath = path + "/" + zipFile;
    const targetPath = path;
    const charset = 'UTF-8';
    // charset possible values: UTF-8, GBK, US-ASCII and so on. If none was passed, default value is UTF-8


    unzip(sourcePath, targetPath, charset)
      .then((path) => {
        console.log(`unzip completed at ${path}`);
        RNFS.unlink(sourcePath);
        EasyLoading.dismiss();//关闭
      })
      .catch((error) => {
        console.error(error);
        EasyLoading.dismiss();//关闭
      });
  }


  /**
   * 
var RNFS = require('react-native-fs');
//   undefined
console.log('MainBundlePath',RNFS.MainBundlePath)
//   /data/data/com.rn_test_demo/cache
console.log('CachesDirectoryPath',RNFS.CachesDirectoryPath)
//   /data/data/com.rn_test_demo/files
console.log('DocumentDirectoryPath',RNFS.DocumentDirectoryPath)
//   /data/data/com.rn_test_demo/cache
console.log('TemporaryDirectoryPath',RNFS.TemporaryDirectoryPath)
//   undefined
console.log('LibraryDirectoryPath',RNFS.LibraryDirectoryPath)
//   /storage/emulated/0/Android/data/com.rn_test_demo/files
console.log('ExternalDirectoryPath',RNFS.ExternalDirectoryPath)
//  /storage/emulated/0
console.log('ExternalStorageDirectoryPath',RNFS.ExternalStorageDirectoryPath)

   */


  function clickEvent(item) {
    if (item.install == true){
      navigation.navigate("showH5Page");
    }else{
//点击安装，先判断是否存在，存在就打开，不存在就下载
let pathName = Constants.documentPath + '/' + item.appId + '/' + item.appHisId;
let filePathName =  Constants.documentPath + '/' + item.appId;
RNFS.exists(pathName).then(exists => {
  if (exists) {
    
  } else {
    //删除文件
    RNFS.exists(filePathName).then(exists => {
      if (exists) {
        //RNFS.unlink(filePathName);
      }

      const options = {
        NSURLIsExcludedFromBackupKey: true, // iOS only
      };
      console.log('mkdir:' + filePathName);
      RNFS.mkdir(filePathName, options);
    });
    const options = {
      NSURLIsExcludedFromBackupKey: true, // iOS only
    };
    console.log('mkdir:' + filePathName);
    RNFS.mkdir(filePathName, options);

    //下载文件
    downloadH5File(Constants.downUrl + "/RF_Attachment/" + item.appFilePath.replace('\\', '/'), filePathName, item.appHisId + ".zip");
    addItemToInstall(item);

  }
});



}



function addItemToInstall(item) {
installList.push(item);
let ret = [];
installList.forEach((item, index, self) => {
  let compare = [];
  ret.forEach((retitem, retindex, retself) => {
    compare.push(retitem.appId);
  });
  if (compare.indexOf(item.appId) === -1) {
    ret.push(item);
  }
});

appList.forEach((appItem, index, self) => {
   if (item.appId === appItem.appId){
    appList[index].install = true;
   }
});

dispatch({
  type: USER_INSTALL_APP_LIST,
  installList: ret,
});
    }

    
  }

  //上拉加载更多数据
  function loadMoreData() {
    //模拟网络请求
    setTimeout(() => {

      try {
        setRefreshing(true);
        const contextParam = {
          InvOrgId: '8010',
          Ticket: userToken === null ? '' : userToken,
        };
        const parameters = [{
          'Value': '3.0',
        }, {
          'Value': '1.0',
        }];

        const params = {
          ApiType: 'AppsMenuController',
          Context: contextParam,
          Method: 'GetAppsByCategoryId',
          Parameters: parameters,

        };
        console.log(params);
        appListAction.getAppList(params).then(resp => {
          console.log(resp);
          let rowData = appList.concat(resp.Result);
          setAppList(rowData);
          console.log(appList);
          setRefreshing(false);


        });
      } catch (err) {
        //abortFetch(); //manually stop the refresh or pagination if it encounters network error
        setRefreshing(false);
      }

    }, 2000);
  }

    function //上拉加载布局
      renderLoadMoreView() {
      return <View style={styles.loadMore}>
        <ActivityIndicator
          style={styles.indicator}
          size={"large"}
          color={"red"}
          animating={true}
        />
        <Text>正在加载更多</Text>
      </View>
    }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={appList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          //下拉刷新
          refreshing={refreshing}
          onRefresh={() => {
            onStartRefresh();
          }}
          //设置上拉加载
          // ListFooterComponent={() => renderLoadMoreView()}
          // onEndReached={() => loadMoreData()}
        />
        <Loading />
      </SafeAreaView>


    );
  }




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-around',
    },
    loadMore: {
      alignItems: "center"
    },
    indicator: {
      color: "red",
      margin: 10
    }
  });