// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { styles as S } from '../style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const appBarHeight = 130;

class ViewPanoramaImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calcPanoImageWidth: 500,
    };
    this.navigation = props.navigation;
  }

  render() {
    const { image } = this.props.route.params;
    return (
      <SafeAreaView style={[S.container]}>
        {/* <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="파노라마 이미지 보기"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars> */}

        <HistoryBackActionBar
          title={'파노라마 이미지 보기'}
          navigation={this.navigation}
        />
        <View
          style={[S.panoOverlayWrap, { height: windowHeight - appBarHeight }]}>
          <View
            style={[
              S.panoOverlayInner,
              { height: windowHeight - appBarHeight },
            ]}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Image
                resizeMode={'contain'}
                onLoad={data => {
                  console.log('image on load : ', data);
                  try {
                    let oriW = data.nativeEvent.source.width;
                    let oriH = data.nativeEvent.source.height;
                    let resultW = (oriW * (windowHeight - appBarHeight)) / oriH;
                    this.setState({ calcPanoImageWidth: resultW });
                    console.log(resultW);
                    console.log('image width:' + data.nativeEvent.source.width);
                    console.log(
                      'image height:' + data.nativeEvent.source.height,
                    );
                  } catch (e) {
                    //error
                  }
                }}
                style={{
                  width: this.state.calcPanoImageWidth,
                  height: windowHeight - appBarHeight,
                }}
                source={{ uri: image ? image : '' }}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  componentDidMount() {}
}

export default ViewPanoramaImage;
