/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Text,
    View,
} from '../component/Themed';
import Button from '@ant-design/react-native/lib/button';
 
const DetailScreen = ({route})=> {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>详情页面</Text>
        <Text>标题是：{route.params.screenName}</Text>
        <Text>参数Url是：{route.params.url}</Text>
        <Button>Start</Button>
      </View>
  );
};
 
export default DetailScreen;