import React, {Component} from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
const {width} = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
  },

  wrapper: {
    
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  image: {
    width,
    flex: 1,
  },
};

export default class extends Component {

    
  render() {
    return (
      <View style={styles.container}>
        <Swiper dotStyle={{backgroundColor:'rgba(255,255,255,1)', width: 6, height: 6}}
            activeDotStyle={{backgroundColor:'rgba(255,0,0,1)', width: 6, height: 6}}
             style={styles.wrapper} horizontal={true} autoplay>
          <View style={styles.slide1}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{uri:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Faliyunzixunbucket.oss-cn-beijing.aliyuncs.com%2Fjpg%2Fe667b1e4574cd8c86fedac6adb18c930.jpg%3Fx-oss-process%3Dimage%2Fresize%2Cp_100%2Fauto-orient%2C1%2Fquality%2Cq_90%2Fformat%2Cjpg%2Fwatermark%2Cimage_eXVuY2VzaGk%3D%2Ct_100&refer=http%3A%2F%2Faliyunzixunbucket.oss-cn-beijing.aliyuncs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628215082&t=f9f3f2e187d98fe2550a81badddbd1de'}}
            />
          </View>
          <View style={styles.slide2}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{uri:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pxcodes.com%2Fd%2Ffile%2F6d4bbc07f8b07e288b5d6549932d85d5.jpg&refer=http%3A%2F%2Fwww.pxcodes.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628215083&t=d452498e9a332e82b9b9d1bb57c584df'}}
            />
          </View>
          <View style={styles.slide3}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('./img/3.jpg')}
            />
          </View>
        </Swiper>

       
      </View>
    );
  }
}
