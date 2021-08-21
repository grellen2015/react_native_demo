/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions,StyleSheet , Image,TouchableHighlight} from 'react-native';
import Swiper from 'react-native-swiper';
import Tool from '../util/Tool';
import { Button ,ThemeProvider } from 'react-native-elements';

const RaisedButton = (props) => <Button raised {...props} />;


const theme = {
  Button: {
    raised: true,
  },
};

const HomeScreen = ()=> {
    return (
      <ThemeProvider theme={theme}>
      <Button title="My Button" />
      <Button title="My 2nd Button" />
    </ThemeProvider>
    );
};


 export default HomeScreen;