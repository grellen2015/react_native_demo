/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from "axios"

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

axios.get("http://localhost:8081/data/test.json").then(console.log);
AppRegistry.registerComponent(appName, () => App);
