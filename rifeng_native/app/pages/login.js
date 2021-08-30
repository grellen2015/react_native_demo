/* eslint-disable prettier/prettier */
import React,{ Component, useState, useEffect, useRef } from 'react';
import {Button,TextInput, Image,ImageBackground,StyleSheet, StatusBar,Alert, TouchableOpacity} from 'react-native';
import {
    Text,
    View,
} from '../component/Themed';
import {
    setActiveBundle,
    registerBundle,
    unregisterBundle,
    reloadBundle,
  } from 'react-native-dynamic-bundle';
  import px2dp from '../util/DisplayUtil';
import { Input } from 'react-native-elements';
import { useSelector, useDispatch } from "react-redux";
import Toast from "../component/toast";
import I18n from "../common/languages";
import md5 from "md5";
import userAction from "../action/user";
import { USER_TOKEN, USER_INFO } from "../redux/action/userActionTypes";

export default function LoginScreen(props){
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
     const dispatch = useDispatch();

     const {userToken, userInfo} = useSelector(state => ({
         userToken : state.UserReducer.userToken,
         userInfo:  state.UserReducer.userInfo
        }));
    useEffect(() => {
        // 判断 redux-persist 缓存中是否有数据，有则取出直接登录
        if (userToken && userInfo) {
            global.jwtToken = userToken;
            global.userInfo = userInfo;
            props.navigation.replace("MainPage");
        }
        // Global navigation for not in router pages
        global.navigation = props.navigation;
        }, []);


        function getLongToken(){

            const contextParam = {
                InvOrgId: "8010",
                Ticket: userToken === null ? "" : userToken
            };
            const parameters = [{
                "Value": userToken,
            }];
           
            const params = {
                ApiType: "AppSecurtiyController",
                Context: contextParam,
                Method:"GenerateLongToken",
                Parameters: parameters
    
            };
            userAction.getLongToken(params).then(resp => {
    
                // props.navigation.replace("TabNav");
                // Toast.showToast(resp.Context.Ticket);
                // const token = `Bearer ${resp.token}`;
                dispatch({
                type: USER_TOKEN,
                userToken: resp.Result,
                });
                props.navigation.replace("TabNav");
            });

        }

    function login() {
        if (!loginId || !password) {
            Toast.showToast(I18n.t("Login.loginTips"));
            return;
        }
       

        const contextParam = {
            InvOrgId: "8010",
		    Ticket: userToken === null ? "" : userToken
        };
        const parameters = [{
            "Value": loginId,
        }, {
            "Value": password,
        }];
       
        const params = {
            ApiType: "AppSecurtiyController",
            Context: contextParam,
            Method:"Login",
            Parameters: parameters

        };
        userAction.userLogin(params).then(resp => {

            // props.navigation.replace("TabNav");
            // Toast.showToast(resp.Context.Ticket);
            // const token = `Bearer ${resp.token}`;
            dispatch({
            type: USER_TOKEN,
            userToken: resp.Context.Ticket,
            });
            dispatch({
            type: USER_INFO,
            userInfo: resp.Result,
            });
            global.jwtToken = resp.Context.Ticket;
            global.userInfo = resp.result;
            // props.navigation.replace("TabNav");

            getLongToken();
        });
        }

        return (

            <View style={styles.container}>
                <ImageBackground source={require('../resource/images/bg.png') }
                style={styles.ImageBgStyle}
                resizeMode={'cover'} >
                    {/* logo图片 */}
                    <View style = {styles.logoBg}>
                        <Image style = {{width:175, height: 32}} source={require("../resource/images/login_logo.png")}></Image>
                    </View>
                     {/* email */}
                    <View style={styles.inputBg}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={I18n.t("Login.userName")}
                        placeholderTextColor={"#B1B1B2"}
                        onChangeText={text => setLoginId(text)}
                        vauel={loginId}
                        maxLength={40}
                        defaultValue=""
                    />
    
                    </View>
    
                     {/* password */}
                     <View style={styles.inputBg}>
                    <TextInput
                        placeholder={I18n.t("Login.password")}
                        secureTextEntry={true}
                        style={styles.inputStyle}
                        maxLength={40}
                        onChangeText={text => setPassword(text)}
                        keyboardType={"default"}
                    />
    
                    </View>
    
                     {/* Login Btn */}
                     <TouchableOpacity activeOpacity={0.5} onPress={() => login()}>
                     <View style={styles.loginBtnBgStyle}>
                            <Text style = {{color:"#ffffff"}}>Login</Text>
    
                    </View>
    
                    </TouchableOpacity>
    
                <View  style = {styles.registBtnStyle}>
                <Text style = {{color:"#0081cc"}}>Regist</Text>
                </View>
                 
                  
    
                </ImageBackground>
               {/* <StatusBar backgroundColor="transparent" translucent={true}/> */}
    
            </View>
    
        );
}

const styles = StyleSheet.create({

    container:{
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageBgStyle:{
        width: "100%",
        height:"100%",
        justifyContent:'flex-start',
        alignItems:'center'
        
    },
    logoBg:{
        height: px2dp(50),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop:px2dp(130)
    },

    inputBg:{
        width:px2dp(250),
        marginTop:px2dp(20),
        height: px2dp(50),
        marginLeft:px2dp(51),
        marginRight:px2dp(51),
        borderColor:'#999',
        borderWidth:px2dp(1),
        borderRadius:px2dp(25),
    },
    inputStyle:{
        marginLeft:px2dp(10),
        height: px2dp(50), 
        padding: 0
    },
    loginBtnBgStyle:{
        flexDirection:'column',
        marginTop:px2dp(50),
        marginLeft:px2dp(50),
        marginRight:px2dp(50),
        height: px2dp(50),
        width:px2dp(250),
        backgroundColor:"#0081cc",
        borderRadius: px2dp(25),
        alignItems: 'center',
        justifyContent: 'center'
        // 'space-between' | 'space-around' | 'space-evenly'

    },
    loginBtnStyle:{
        flex: 1,
        padding:0,
        margin:0
    },
    registBtnStyle:{
    
        height: px2dp(50),
        width:px2dp(250),
        borderColor:'#0081cc',
        borderWidth:px2dp(1),
        borderRadius:px2dp(25),
        backgroundColor:"white",
        position:'absolute',
        bottom: 20,
        justifyContent:"center",
        alignItems:"center"

    }

});
