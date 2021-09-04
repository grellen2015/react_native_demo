/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Text,
    View,
} from '../component/Themed';
import {Button} from 'react-native';
import reload from '../component/reload';
import {
  setActiveBundle,
  registerBundle,
  reloadBundle,
  getActiveBundle,
  getBundles,
  unregisterBundle,
} from 'react-native-dynamic-bundle';
import RNFS from 'react-native-fs';
import { EasyLoading, Loading } from '../component/EsayLoading';
import { check } from 'react-native-permissions';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';

import RNRestart from 'react-native-restart'; // Import package from node modules


 
const ContactScreen = ({navigation})=> {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>设置</Text>
          <Button title={"回到登录页"} onPress={()=>{
              navigation.navigate('LoginScreen');
          }} />
        <Button title={"扫描页"} onPress={()=>{
              navigation.navigate('scanScreen');
            // reload.reloadModule();
          }} />
  <Button title={"reload"} onPress={()=>{
            //   navigation.navigate('scanScreen');
            reload.reloadModule((msg) => {
                alert(msg);
              });
          }} />

          <Button title={"downloadBundle"} onPress={()=>{

                checkBundleDir();
              
          }} />
          <Button title={"详情页面传参测试"} onPress={()=>{
              navigation.navigate('DetailScreen',{
                  screenName: '自定义标题',
                  url: 'http://www.baidu.com',
              });
          }} />

        <Loading />
      </View>
  );

  function checkBundleDir(){

    EasyLoading.show();

    let dirName = RNFS.DocumentDirectoryPath + '/mainbundle';

    RNFS.exists(dirName).then(exists => {
      if (exists) {
        RNFS.unlink(dirName);
      }

      const options = {
        NSURLIsExcludedFromBackupKey: true, // iOS only
      };
      console.log('mkdir:' + dirName);
      RNFS.mkdir(dirName, options);

      downloadBundle();
    });
    
  }


  function downloadBundle(){

   
    

    const { promise } = RNFS.downloadFile({
      fromUrl: "http://192.168.2.44:8888/android_bundle.zip",
      toFile: RNFS.DocumentDirectoryPath + "/mainbundle/bundle.zip",
    });
    //const result = await promise;

    try {

      promise
        .then(res => {

          console.log('success', res);
          // alert("download success");
          //解压
          unzipH5File(RNFS.DocumentDirectoryPath + "/mainbundle", "bundle.zip");
          // EasyLoading.dismiss();//关闭
        })
        .catch(err => {
          console.log('err:', err);
          // alert('err' + err);
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
       
        

        unregisterBundle('index');
        registerBundle('index', 'mainbundle/index.bundle');
        setActiveBundle('index');
        // alert("setActiveBundle");
        
        const bundles =  getBundles();
        const activeBundle =  getActiveBundle();

        console.log(bundles);
    
        reloadBundle();
        RNFS.unlink(sourcePath);
        EasyLoading.dismiss();//关闭

        reload.reloadModule((msg) => {
          alert(msg);
        });

        // Immediately reload the React Native Bundle
        // RNRestart.Restart();
      })
      .catch((error) => {
        console.error(error);
        EasyLoading.dismiss();//关闭
      });
  }


};
 
export default ContactScreen;