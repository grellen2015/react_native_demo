/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Text,
    View,
} from '../component/Themed';
import {Button} from 'react-native';
import reload from '../component/reload';
 
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
                // alert(msg);
              });
          }} />

 
          <Button title={"详情页面传参测试"} onPress={()=>{
              navigation.navigate('DetailScreen',{
                  screenName: '自定义标题',
                  url: 'http://www.baidu.com',
              });
          }} />
      </View>
  );
};
 
export default ContactScreen;