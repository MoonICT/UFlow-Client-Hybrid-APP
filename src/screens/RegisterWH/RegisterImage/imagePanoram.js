/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Text, IconButton } from 'react-native-paper';
// Local Imports
import ActionCreator from '@Actions';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from '../style';
class ImagePanoram extends Component {
  constructor(props) {
    super(props);
  }
  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { pnImages, valueTab, handldeProps, isRemove } = this.props;
    return (
      <Fragment>
        {pnImages && pnImages.length === 0 ? (
          <TouchableOpacity
            style={S.bgrRegister}
            onPress={() =>
              // this.handlePicker(valueTab)
              handldeProps && handldeProps()
            }>
            <Image source={ignore3} style={S.ImageStyle} />
            <Text style={S.textBgr}>
              파노라마 사진은 1장만 등록 가능합니다.
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={S.imageContainer}>
            <Image
              style={S.ImageUpload}
              source={{ uri: pnImages && pnImages[0].url }}
              PlaceholderContent={<ActivityIndicator />}
            />
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
        )}
      </Fragment>
    );
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  return {
    pnImages: state.registerWH.pnImages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    uploadImage: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImagePanoram);
