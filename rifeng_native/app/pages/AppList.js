/* eslint-disable prettier/prettier */
import React,{ Component, useState, useEffect, useRef } from 'react';
import {Button,TextInput, Image,ImageBackground,StyleSheet, StatusBar,Alert, TouchableOpacity} from 'react-native';
  import px2dp from '../util/DisplayUtil';
import { useSelector, useDispatch } from 'react-redux';
import appListAction from "../action/main";
import { ListView } from '@ant-design/react-native';
import AppListItem  from '../component/AppListItem';
import {
  USER_TOKEN,
  USER_INFO,
  USER_INSTALL_APP_LIST,
} from '../redux/action/userActionTypes';

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

        // function getInstallAppList(){

            
        //     const contextParam = {
        //         InvOrgId: "8010",
        //         Ticket: userToken === null ? "" : userToken
        //     };
        //     const parameters = [{
        //         "Value": loginId,
        //     }, {
        //         "Value": password,
        //     }];
           
        //     const params = {
        //         ApiType: "AppSecurtiyController",
        //         Context: contextParam,
        //         Method:"Login",
        //         Parameters: parameters
    
        //     };
        //     appListAction.getAppList(params).then(resp => {
    
        //     });
        // };

   let sleep = (time: any) =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  let onFetch = async (
    page = 1,
    startFetch,
    abortFetch
  ) => {
    console.log("=======>>>>");
    try {
      let pageLimit = 30;
     

      const skip = (page - 1) * pageLimit;


      const contextParam = {
        InvOrgId: "8010",
        Ticket: userToken === null ? "" : userToken
    };
    const parameters = [{
        "Value": "3.0",
    }, {
        "Value": "1.0",
    }];
   
    const params = {
        ApiType: "AppsMenuController",
        Context: contextParam,
        Method:"GetAppsByCategoryId",
        Parameters: parameters

    };
    console.log(params);
    let rowData = [];
   await appListAction.getAppList(params).then(resp => {
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
        <AppListItem item = {item} itemClick={()=>{clickEvent(item)}} />
    );
  };

  function clickEvent(item){
   
    installList.push(item);
    dispatch({
      type: USER_INSTALL_APP_LIST,
      installList: installList,
      });
  }

    return (
    <ListView
        onFetch={onFetch}
        keyExtractor={(item, index) =>
          `${index}`
        }
        renderItem={renderItem}
        numColumns={1}
      />
        );
}

