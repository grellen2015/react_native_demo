/* eslint-disable prettier/prettier */
import React,{ Component, useState, useEffect, useRef } from 'react';
import {Button,TextInput, Image,ImageBackground,StyleSheet, StatusBar,Alert, TouchableOpacity,View} from 'react-native';
  import px2dp from '../util/DisplayUtil';
import { useSelector, useDispatch } from 'react-redux';
import appListAction from '../action/main';
import { ListView } from '@ant-design/react-native';
import AppListItem  from '../component/AppListItem';
import Constants from '../constant/constants';
import { EasyLoading, Loading } from '../component/EsayLoading';
import {
  USER_TOKEN,
  USER_INFO,
  USER_INSTALL_APP_LIST,
} from '../redux/action/userActionTypes';
import RNFS from 'react-native-fs';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';

export default function AppList(props){

     const dispatch = useDispatch();
     const [appList, setAppList] = useState([]);


     const {userToken, userInfo, installList} = useSelector(state => ({
        userToken : state.UserReducer.userToken,
        userInfo:  state.UserReducer.userInfo,
        installList : state.UserReducer.installList,
        }));
    useEffect(() => {
        // Global navigation for not in router pages
        global.navigation = props.navigation;
        }, []);

   let sleep = (time: any) =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  let onFetch = async (
    page = 1,
    startFetch,
    abortFetch
  ) => {
    console.log('=======>>>>');
    try {
      let pageLimit = 30;


      const skip = (page - 1) * pageLimit;


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
        Method:'GetAppsByCategoryId',
        Parameters: parameters,

    };
    console.log(params);
    let rowData = [];
    appListAction.getAppList(params).then(resp => {
        console.log(resp);
        setAppList(resp.Result );
        console.log(appList);
        if (page === 2) {
            setAppList([] );
          }

          startFetch(appList, pageLimit);

    });


    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  let renderItem = (item) => {
    return (
        <AppListItem item = {item} itemClick={()=>{clickEvent(item);}} />
    );
  };

  function downloadH5File(srcPath, destPath,fileName) {

    EasyLoading.show();
    console.log("srcPath:" + srcPath);
    console.log("destPath:" + destPath);
    const options = {
      fromUrl:  srcPath,
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

  function unzipH5File(path, zipFile){
    const sourcePath = path + "/"  + zipFile;
    const targetPath = path;
    const charset = 'UTF-8';
    // charset possible values: UTF-8, GBK, US-ASCII and so on. If none was passed, default value is UTF-8


    unzip(sourcePath, targetPath, charset)
    .then((path) => {
        console.log(`unzip completed at ${path}`);
        RNFS.unlink(sourcePath );
        EasyLoading.dismiss();//关闭
    })
    .catch((error) => {
         console.error(error);
         EasyLoading.dismiss();//关闭
    });
  }


  function clickEvent(item){

    //点击安装，先判断是否存在，存在就打开，不存在就下载
    let pathName = RNFS.DocumentDirectoryPath + '/' + item.appId + '/' + item.appHisId;
    let filePathName = RNFS.DocumentDirectoryPath + '/' + item.appId;
    RNFS.exists(pathName).then(exists => {
      if (exists) {
        // navigation.navigate(routeName);
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
          RNFS.mkdir(filePathName,options);
        });
        const options = {
          NSURLIsExcludedFromBackupKey: true, // iOS only
          };
          console.log('mkdir:' + filePathName);
        RNFS.mkdir(filePathName,options);
        
        //下载文件
        downloadH5File(Constants.downUrl +"/RF_Attachment/" + item.appFilePath.replace('\\', '/'), filePathName , item.appHisId + ".zip");
        addItemToInstall(item);

      }
    });


  
  }

  function addItemToInstall(item){
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
    dispatch({
      type: USER_INSTALL_APP_LIST,
      installList: ret,
      });
  }

    return (
      <View style = {styles.container}>
    <ListView
        onFetch={onFetch}
        keyExtractor={(item, index) =>
          `${index}`
        }
        renderItem={renderItem}
        numColumns={1}
      />
      <Loading/>
      </View>
        );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

