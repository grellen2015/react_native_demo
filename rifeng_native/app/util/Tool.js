import {PixelRatio} from 'react-native';
import {Dimensions} from 'react-native';

const Tool = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
};
export default Tool;
