/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text, IconButton } from 'react-native-paper';
// Local Imports
import ActionCreator from '@Actions';
import ignore3 from '@Assets/images/ignore3x.png';
import DefaultStyle from '@Styles/default';
import { styles as S } from '../style';

class UpImage extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {};
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  /**
   * 메인이미지 변경.
   **/
  changeMainImage = (index) => {
    let originArr = this.props.whImageStore;
    let targetItem = originArr.splice(index, 1);

    console.log('ori1', originArr)
    console.log('ori2', targetItem)
    console.log('result', targetItem.concat(originArr));
    this.props.setWHImages(targetItem.concat(originArr));
  };

  render () {
    const { whImageStore, handldeProps, isRemove, valueTab } = this.props;
    const listImg =
      whImageStore &&
      whImageStore.map((item, index) => {
        // console.log('index', index);
        if (index !== 0) {
          return (
            <View key={index}>
              <TouchableOpacity onPress={() => this.changeMainImage(index)}>
                <Image style={S.itemImage} source={{ uri: item.url }} />
              </TouchableOpacity>
              {isRemove === true ? (
                <IconButton
                  style={S.btnRemove}
                  icon="close-circle"
                  onPress={() =>
                    this.props.removeAction({ value: valueTab, id: index })
                  }
                />
              ) : null}
            </View>
          );
        }
      });
    return (
      <Fragment>
        {whImageStore && whImageStore.length === 0 ? (
          <TouchableOpacity
            style={S.bgrRegister}
            onPress={() =>
              // this.handlePicker(valueTab)
              handldeProps && handldeProps()
            }
          >
            <Image source={ignore3} style={S.ImageStyle} />
            <Text style={S.textBgr}>최소 3장 이상 등록하세요.</Text>
          </TouchableOpacity>
        ) : (
          <View style={S.imageContainer}>
            <View style={S.ImageUpload}>
              <Image
                style={S.ImageDetail}
                source={{ uri: whImageStore && whImageStore[0].url }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={[DefaultStyle._titleWH, S.textRepresentative]}>
                대표이미지
              </Text>
              {isRemove === true ? (
                <IconButton
                  style={S.btnRemove}
                  icon="close-circle"
                  onPress={() =>
                    this.props.removeAction({ value: valueTab, id: 0 })
                  }
                />
              ) : null}
            </View>

            <View
              style={[
                S.listImage,
                (whImageStore && whImageStore.length - 1) % 3 === 0
                  ? S.threeImage
                  : null,
              ]}>
              {listImg}
            </View>
          </View>
        )}
      </Fragment>
    );
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  return {
    whImageStore: state.registerWH.whImages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    uploadImage: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
    setWHImages: action => {
      dispatch(ActionCreator.setWHImages(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpImage);
