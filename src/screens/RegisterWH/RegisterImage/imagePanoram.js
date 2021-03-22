/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Image as Image2 } from 'react-native-elements';
import { connect } from 'react-redux';
import { Text, IconButton } from 'react-native-paper';
// Local Imports
import ActionCreator from '@Actions';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from '../style';
import Progress from '@Components/organisms/Progress';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class ImagePanoram extends Component {
  constructor (props) {
    super(props);
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  render () {
    const { pnImages, valueTab, handldeProps, isRemove } = this.props;
    return (
      <Fragment>
        <TouchableOpacity onPress={() =>
          // this.handlePicker(valueTab)
          handldeProps && handldeProps()
        }>
          {pnImages && pnImages.length === 0 ? (
            <View style={S.bgrRegister}>
              <Image source={ignore3} style={S.ImageStyle} />
              <Text style={S.textBgr}>
                {getMsg(this.props.lang, 'ML0492', '파노라마 사진은 1장만 등록 가능합니다.')}
              </Text>
            </View>
          ) : (
            <View style={S.ImagePanaUpload}>
              <Image2
                style={S.ImageDetail}
                source={{ uri: pnImages && pnImages[0].url }}
                PlaceholderContent={<View style={[S.bgrRegister, {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 238,
                }]}>
                  <View style={{height: 40}}><Progress /></View>
                </View>}
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
        </TouchableOpacity>
      </Fragment>
    );
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  return {
    pnImages: state.registerWH.pnImages,
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImagePanoram);
