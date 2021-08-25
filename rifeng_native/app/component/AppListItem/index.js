import React from 'react';
import {StyleSheet, Text, View,Image, TouchableHighlight} from 'react-native';
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {Rating, AirbnbRating} from 'react-native-elements';
export default class AppListItem extends React.Component {
  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }
  AppListItem(props) {
    this.props = props;
  }

  onPress = () => {
    console.log("安装");
    this.props.itemClick(this.props.item);
  };

  render() {

    var baseImg='data:image/png;base64,' + this.props.item.appLogo;
    return (
      <View style={{paddingTop: 10}}>
        <WingBlank size="lg">
          <Card>
            {/* <Card.Header
              title="This is title"
              thumbStyle={{width: 30, height: 30}}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra="this is extra"
            /> */}
            <Card.Body>
              <View style={styles.container}>
                 <Image
                 style={styles.logo}
                  source={{uri: baseImg}}
                /> 
                <Text style={styles.nameText}>{this.props.item.appName}</Text>
                <TouchableHighlight onPress={this.onPress} style = {styles.button}>
                <View >
                  <Text>安装</Text>
                </View>
              </TouchableHighlight>
              </View>
            </Card.Body>
            {/* <Card.Footer
              content="footer content"
              extra="footer extra content"
            /> */}
          </Card>
        </WingBlank>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    justifyContent: 'flex-start',
    height: 40,
  },
  logo:{
    width: 30,
    height: 30
  },
  nameText:{
    flex: 1,
    marginLeft: 12
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginRight: 12,
    width: 60
  },
});
