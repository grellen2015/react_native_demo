/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import Request from '../util/Request';
import axios from 'axios';
import { data } from 'browserslist';

import { Text, View } from 'react-native';
import { ListView } from '@ant-design/react-native';
import AppListItem  from '../component/AppListItem';
export default class BasicListExample extends React.Component {
  state = {
    layout: 'list',
    resultJson: null,
  };
  sleep = (time: any) =>
    new Promise(resolve => setTimeout(() => resolve(), time));
  onFetch = async (
    page = 1,
    startFetch,
    abortFetch
  ) => {
    try {
      let pageLimit = 30;
      if (this.state.layout === 'grid') {
        pageLimit = 60;
      }

      const skip = (page - 1) * pageLimit;

      //Generate dummy data
      let rowData = Array.from(
        { length: pageLimit },
        (_, index) => `item xxx-> ${index + skip}`
      );

      //Simulate the end of the list if there is no more data returned from the server
      if (page === 3) {
        rowData = [];
      }

      //Simulate the network loading in ES7 syntax (async/await)
      await this.sleep(2000);
      startFetch(rowData, pageLimit);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  renderItem = (item) => {
    return (
        <AppListItem></AppListItem>
    );
  };

  render() {
    return (
      <ListView
        onFetch={this.onFetch}
        keyExtractor={(item, index) =>
          `${this.state.layout} - ${item} - ${index}`
        }
        renderItem={this.renderItem}
        numColumns={this.state.layout === 'list' ? 1 : 3}
      />
    );
  }

  componentDidMount(){
    Request.get("/data/test.json",{
        params:{}
    }).then(res=>{
        //alert(res.msg)
        this.setState({
            resultJson: res,
        });
    });

}
}
