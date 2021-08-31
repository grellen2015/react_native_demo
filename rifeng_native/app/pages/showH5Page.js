import React from 'react';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';
import {useEffect, useState, useRef} from 'react';
import {InteractionManager, View, Text,window} from 'react-native';
// import Loading from '../common/loading';
import { useSelector, useDispatch } from "react-redux";
import Constants from '../constant/constants';

export default function showH5Page(item) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Loading.show();
    InteractionManager.runAfterInteractions(() => {
      setShow(true);
      //   Loading.hide();
    }, []);
  });

  const {userToken, userInfo} = useSelector(state => ({
    userToken : state.UserReducer.userToken,
    userInfo:  state.UserReducer.userInfo
   }));
  
  //
  var targetPath =  Constants.documentPath + '/220/index.html';
  // var targetPath =  "http://www.baidu.com";
  // alert(targetPath)

  const webJsonObj = "{url: '/api/invoke',userName: '" + userInfo.UserName + "',userId: '" + userInfo.UserId +"',orgId: '" + userInfo.InvOrg+ "',ticket: '" + userToken + "'}";
  // alert (webJsonObj);
  const jsString = "initDataFromApp && initDataFromApp("+ webJsonObj +");";

  let webview;
  return (
    
    show && (
      <View style={{flex: 1}}>
        <WebView
          ref={(browser)=>{webview=browser}}
          style={{flex: 1}}
          originWhitelist={['file://']}
          // injectedJavaScript={"initDataFromApp && initDataFromApp('text');"}
          source={{uri: targetPath}}
          style={{marginTop: 0}}
          javaScriptEnabled={true}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccess={true}
          useWebKit = {true}
          messagingEnabled={true}

          domStorageEnabled={true}
          renderError={() => {
            alert("onLoadError")
          }}
          onLoadEnd={() => {
            webview.injectJavaScript(jsString);
          }}
          // onLoad={updateSource}
        />
      </View>
    )
  );
}
