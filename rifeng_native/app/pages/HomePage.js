/* eslint-disable prettier/prettier */
import React,{ Component, useState, useEffect, useRef } from 'react';
import { Dimensions,StyleSheet , Image,TouchableHighlight, ScrollView,View, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import Tool from '../util/Tool';
import { useSelector, useDispatch } from 'react-redux';
import {
  USER_TOKEN,
  USER_INFO,
  USER_INSTALL_APP_LIST,
} from '../redux/action/userActionTypes';


const HomeScreen = (props)=> {

   const dispatch = useDispatch();

   const {userToken, userInfo, installList} = useSelector(state => ({
    userToken : state.UserReducer.userToken,
    userInfo:  state.UserReducer.userInfo,
    installList : state.UserReducer.installList,
    }));
useEffect(() => {
    // Global navigation for not in router pages
    global.navigation = props.navigation;
    }, []);


   function didClickItem(index){

    console.log("didclick item" + index);



   }

   var boxs =installList.map(function(elem, index) {
    var baseImg='data:image/png;base64,' + elem.appLogo;
    return (
      <TouchableHighlight key={elem.key} style={[styles.touchBox, index % 3 === 2 ? styles.touchBox2 : styles.touchBox1]} underlayColor="#eee" onPress={()=> didClickItem(index)}>
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>{elem.appName}</Text>
          <Image
                 style={styles.boxIcon}
                  source={{uri: baseImg}}
                /> 

          {/* {elem.isFA ? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]} /> :
            <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]} />} */}
        </View>
      </TouchableHighlight>
    );
  });


    return (
      <ScrollView style={styles.mainView} title={props.title}>
            <Swiper height={180} showsButtons={false} autoplay={true}
              activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
              >
              <TouchableHighlight onPress={()=> didClickItem(0)}>
                <View style={styles.slide}>
                  <Image style={styles.image}  source={{uri:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Faliyunzixunbucket.oss-cn-beijing.aliyuncs.com%2Fjpg%2Fe667b1e4574cd8c86fedac6adb18c930.jpg%3Fx-oss-process%3Dimage%2Fresize%2Cp_100%2Fauto-orient%2C1%2Fquality%2Cq_90%2Fformat%2Cjpg%2Fwatermark%2Cimage_eXVuY2VzaGk%3D%2Ct_100&refer=http%3A%2F%2Faliyunzixunbucket.oss-cn-beijing.aliyuncs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628215082&t=f9f3f2e187d98fe2550a81badddbd1de'}} />
                  {/* <Text style={styles.slideText}>Day1: Timer</Text> */}
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=> didClickItem(1)}>
                <View style={styles.slide}>
                  <Image style={styles.image} source={{uri:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pxcodes.com%2Fd%2Ffile%2F6d4bbc07f8b07e288b5d6549932d85d5.jpg&refer=http%3A%2F%2Fwww.pxcodes.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628215083&t=d452498e9a332e82b9b9d1bb57c584df'}} />
                  {/* <Text style={styles.slideText}>Day2: Weather</Text> */}
                </View>
              </TouchableHighlight>
            </Swiper>
            <View style={styles.touchBoxContainer}>
              {boxs}
            </View>
          </ScrollView>
    );
};

const styles = StyleSheet.create({
  container:{
      flexGrow:1,
    },
    mainView: {
      marginTop: 0,
    },
    touchBoxContainer:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: Tool.size.width,
      borderWidth: Tool.pixel,
      borderColor: '#CCC',
      // borderTopWidth: Tool.pixel,
      // borderTopColor: '#CCC',
      // borderLeftWidth: Tool.pixel,
      // borderLeftColor:'#ccc',
      // borderRightWidth: Tool.pixel,
      // borderRightColor:'#ccc',
    },
    touchBox:{
        width: Tool.size.width / 3 - 0.3334,
        height: Tool.size.width / 3 - 0.3334,
        backgroundColor: '#fff',
        borderWidth: Tool.pixel,
        borderColor:'#ccc',
    },
    touchBox1:{
      borderWidth: Tool.pixel,
      borderColor:'#ccc',
      // borderBottomWidth: Tool.pixel,
      // borderBottomColor:'#ccc',
      // borderLeftWidth: Tool.pixel,
      // borderLeftColor:'#ccc',
      // borderRightWidth: Tool.pixel,
      // borderRightColor:'#ccc',
      // borderTopWidth: Tool.pixel,
      // borderTopColor:'#ccc',

    },
    touchBox2:{
      borderWidth: Tool.pixel,
      borderColor:'#ccc',
      // borderBottomWidth: Tool.pixel,
      // borderBottomColor:'#ccc',
      // borderLeftWidth: Tool.pixel,
      // borderLeftColor:'#ccc',
      // borderRightWidth: Tool.pixel,
      // borderRightColor:'#ccc',
      // borderTopWidth: Tool.pixel,
      // borderTopColor:'#ccc',
    },
    boxContainer:{
      alignItems:'center',
      justifyContent:'center',
      width: Tool.size.width / 3 -  1,
      height:Tool.size.width / 3 - 1,
    },
    boxIcon:{
      position:'relative',
      top:-10,
      width: 50,
      height: 50,
    },
    boxText:{
      position:'absolute',
      bottom:15,
      width:Tool.size.width / 3 - 1,
      textAlign:'center',
      left: 0,
      backgroundColor:'transparent',
    },
    slide: {
      flexGrow: 1,
      height: 180,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slideText:{
      position:'absolute',
      bottom: 0,
      paddingTop:5,
      paddingBottom:5,
      backgroundColor:'rgba(255,255,255,0.5)',
      width: Tool.size.width,
      textAlign:'center',
      fontSize: 12,
    },
    image:{
      width: Tool.size.width,
      flexGrow: 1,
      alignSelf: 'stretch',
    },
});




 export default HomeScreen;