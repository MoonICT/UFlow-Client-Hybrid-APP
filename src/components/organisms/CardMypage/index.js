/**
 * 견적 계약 썸네일 카드
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import cardBG from '@Assets/images/card-img.png';
import PropTypes from 'prop-types';

// Local Imports
import TableInfo from '@Components/atoms/TableInfo';
import DefaultStyle from '@Styles/default';
import { styles as S } from './style';

class CardMypage extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.navigation = props.navigation;
  }

  render() {
    const {
      data,
      styleLeft,
      styleRight,
      borderRow,
      bgrImage,
      headerTitle,
      headerComponent,
      rightHeader,
      onPressHeader,
      footer,
      style,
      borderBottom,
    } = this.props;
    // item && item.highlight === true ? DefaultStyle._highlightInfoTable : null;

    return (
      <View style={DefaultStyle._card}>

        <TouchableOpacity
          style={DefaultStyle._headerCard}
          onPress={onPressHeader}>
          {headerComponent ? (
            headerComponent
          ) : (
              <Text style={DefaultStyle._headerCardTitle}>{headerTitle}</Text>
            )}

          <View style={DefaultStyle.rightTitleHeader}>
            {rightHeader ? (
              rightHeader
            ) : (
                <Icon
                  name="arrow-forward-ios"
                  size={12}
                  color="rgba(0, 0, 0, 0.87)"
                />
              )}
          </View>
        </TouchableOpacity>
        <View style={[DefaultStyle._bodyCard, style]}>
          {bgrImage &&
          <Card.Cover
            source={bgrImage ? {
              uri: bgrImage.uri ? bgrImage.uri.replace(/\\/g, '') : ''
            } : ''}
            style={S.imgAva}
          />}
          <View style={S.info}>
            <TableInfo
              data={data && data}
              styleLeft={styleLeft}
              styleRight={styleRight}
              borderRow={borderRow}
              borderBottom={borderBottom}
            />
          </View>

          {footer}
        </View>
      </View>
    );
  }
}

// Check Props Type.
TableInfo.protoType = {
  data: PropTypes.array,
  borderRow: PropTypes.bool,
  style: PropTypes.object,
  styleRight: PropTypes.object,
  styleLeft: PropTypes.object,
  label: PropTypes.string,
  bgrImage: PropTypes.any,
  headerTitle: PropTypes.string,
  onPressHeader: PropTypes.func,
  footer: PropTypes.any,
  borderBottom: PropTypes.bool,
};
export default CardMypage;
