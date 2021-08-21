import React from 'react';
import {Text, View} from 'react-native';
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {Rating, AirbnbRating} from 'react-native-elements';
export default class AppListItem extends React.Component {
  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  render() {
    return (
      <View style={{paddingTop: 10}}>
        <WingBlank size="lg">
          <Card>
            <Card.Header
              title="This is title"
              thumbStyle={{width: 30, height: 30}}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra="this is extra"
            />
            <Card.Body>
              <View style={{height: 52}}>
                <Text style={{marginLeft: 16}}>Card Content</Text>
                <Rating
                  tintColor="#ffffff"
                  ratingColor="#ff0000"
                  ratingBackgroundColor="#00ff00"
                  type="custom"
                  ratingCount={5}
                  imageSize={20}
                  startingValue={4}
                  onFinishRating={this.ratingCompleted}
                  style={{
                    paddingVertical: 10,
                    marginLeft: 16,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                />
              </View>
            </Card.Body>
            <Card.Footer
              content="footer content"
              extra="footer extra content"
            />
          </Card>
        </WingBlank>
      </View>
    );
  }
}
