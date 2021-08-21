/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
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

class LoginScreen extends Component{


    onLoginBtnClick = () => {
        this.props.navigation.navigate('TabNav')
    }

    render(){
        return (

            <View style={styles.container}>
                <ImageBackground source={require('../images/bg.png') }
                style={styles.ImageBgStyle}
                resizeMode={'cover'} >
                    {/* logo图片 */}
                    <View style = {styles.logoBg}>
                        <Image style = {{width:175, height: 32}} source={require("../images/login_logo.png")}></Image>
                    </View>
                     {/* email */}
                    <View style={styles.inputBg}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={"请输入账号"}
                        maxLength={40}
                        defaultValue="tset"
                    />
    
                    </View>
    
                     {/* password */}
                     <View style={styles.inputBg}>
                    <TextInput
                        placeholder={"请输入密码"}
                        secureTextEntry={true}
                        style={styles.inputStyle}
                        maxLength={40}
                    />
    
                    </View>
    
                     {/* Login Btn */}
                     <TouchableOpacity activeOpacity={0.5} onPress={this.onLoginBtnClick}>
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

export default LoginScreen;
